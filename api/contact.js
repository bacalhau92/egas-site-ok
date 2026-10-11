const buckets = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function json(body, status = 200) {
  return {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  }
}

function clean(value, max) {
  return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max)
}

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown'
  return String(forwarded).split(',')[0].trim().slice(0, 80)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })

  const key = clientKey(req)
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || now - bucket.startedAt > WINDOW_MS) buckets.set(key, { startedAt: now, count: 1 })
  else if (bucket.count >= MAX_REQUESTS) return res.status(429).json({ error: 'Too many requests. Try again later.' })
  else bucket.count += 1

  let payload
  try { payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body } catch { return res.status(400).json({ error: 'Invalid request.' }) }
  if (!payload || payload.website) return res.status(400).json({ error: 'Invalid request.' })

  const nome = clean(payload.nome, 100)
  const email = clean(payload.email, 254).toLowerCase()
  const instituicao = clean(payload.instituicao, 100)
  const mensagem = clean(payload.mensagem, 1000)
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (nome.length < 2 || !emailOk || mensagem.length < 10) return res.status(422).json({ error: 'Fill required fields correctly.' })

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) return res.status(503).json({ error: 'Contact service temporarily unavailable.' })

  const response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/leads`, {
    method: 'POST',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ nome, email, instituicao: instituicao || null, mensagem, origem: 'form' }),
  })
  if (!response.ok) return res.status(502).json({ error: 'Could not register request.' })
  return res.status(201).json({ ok: true })
}

export const config = { api: { bodyParser: { sizeLimit: '20kb' } } }
