const buckets = new Map()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function getClientIp(request) {
  return (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').split(',')[0].trim()
}

function clean(value, max) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, max)
}

function json(body, status) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } })
}

export default async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Método não permitido.' }, 405)
  const ip = getClientIp(request)
  const now = Date.now()
  const bucket = buckets.get(ip) || { count: 0, reset: now + WINDOW_MS }
  if (now > bucket.reset) { bucket.count = 0; bucket.reset = now + WINDOW_MS }
  bucket.count += 1
  buckets.set(ip, bucket)
  if (bucket.count > MAX_REQUESTS) return json({ error: 'Muitas tentativas. Tente novamente mais tarde.' }, 429)

  let body
  try { body = await request.json() } catch { return json({ error: 'Pedido inválido.' }, 400) }
  if (clean(body.website, 100)) return json({ ok: true }, 202)

  const fullName = clean(body.fullName, 100)
  const email = clean(body.email, 254).toLowerCase()
  const institution = clean(body.institution, 120)
  const message = clean(body.message, 2000)
  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || institution.length < 2 || message.length < 10) {
    return json({ error: 'Verifique os dados preenchidos.' }, 400)
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY
  if (!supabaseUrl || !serviceKey) return json({ error: 'Serviço temporariamente indisponível.' }, 503)

  const response = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: 'POST',
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'content-type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ full_name: fullName, email, institution, message, ip_hash: ip.slice(0, 128), user_agent: clean(request.headers.get('user-agent'), 500) })
  })
  if (!response.ok) return json({ error: 'Não foi possível enviar o pedido.' }, 502)
  return json({ ok: true }, 201)
}
