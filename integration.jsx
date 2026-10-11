// ============================================
// SANTOS EGAS MONIZ - SUPABASE INTEGRATION
// V11 -> V12 com leads + depoimentos dinâmicos
// ============================================

import { createClient } from '@supabase/supabase-js'

// 1. CLIENT (usa .env)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. SANITIZAÇÃO - OBRIGATÓRIO (anti-XSS)
function sanitizeInput(str) {
  if (!str) return ''
  return str
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }[m]))
    .trim()
    .slice(0, 1000)
}

function sanitizeName(str) {
  return sanitizeInput(str).replace(/[^a-zA-ZÀ-ÿ\s']/g, '').slice(0, 100)
}

// 3. FORMULÁRIO 2 ETAPAS COM SUPABASE
export async function submitLead({ nome, email, instituicao, mensagem, origem = 'form' }) {
  // Validação
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!nome || nome.length < 2) throw new Error('Nome inválido')
  if (!emailRegex.test(email)) throw new Error('Email inválido')
  if (!mensagem || mensagem.length < 10) throw new Error('Mensagem muito curta')

  // Sanitiza
  const cleanData = {
    nome: sanitizeName(nome),
    email: sanitizeInput(email).toLowerCase(),
    instituicao: sanitizeInput(instituicao).slice(0, 100),
    mensagem: sanitizeInput(mensagem),
    origem: origem // 'form', 'whatsapp', 'livro'
  }

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      fullName: cleanData.nome,
      email: cleanData.email,
      institution: cleanData.instituicao,
      message: cleanData.mensagem,
      origem: cleanData.origem,
    }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || 'Não foi possível enviar o pedido.')
  return result
}

// 4. BUSCAR DEPOIMENTOS PARA CARROSSEL (320x180px)
export async function getDepoimentos() {
  const { data, error } = await supabase
    .from('depoimentos')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true })
  
  if (error) throw error
  return data
}

// 5. BUSCAR MÉTRICAS PARA COUNT-UP
export async function getMetricas() {
  const { data, error } = await supabase
    .from('metricas')
    .select('*')
    .order('ordem')
  
  if (error) throw error
  return data
}

// ============================================
// EXEMPLO DE USO NO COMPONENTE CONTACTO V11
// ============================================
/*
import { useState } from 'react'
import { submitLead } from './supabase_integration'

function FormularioContacto() {
  const [etapa, setEtapa] = useState(1)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  const handleEtapa1 = (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (nome.length < 2) { setErro('Nome deve ter pelo menos 2 letras'); return }
    if (!emailRegex.test(email)) { setErro('Email inválido'); return }
    setErro('')
    setEtapa(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErro('')
    try {
      await submitLead({ nome, email, instituicao, mensagem, origem: 'form' })
      setSucesso(true)
      // Confete dourado
      // confetti({ particleCount: 100, colors: ['#C2A878', '#0F243E'] })
    } catch (err) {
      setErro(err.message || 'Erro ao enviar. Tente WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  if (sucesso) {
    return (
      <div className="bg-[#1A365D] border border-[#C2A878] rounded-[12px] p-6">
        <p className="text-white">Recebido. Resposta em até 4h úteis.</p>
        <p className="text-[#A0AEC0] text-sm mt-2">Obrigado, {sanitizeName(nome)}!</p>
      </div>
    )
  }

  return (
    <form onSubmit={etapa === 1 ? handleEtapa1 : handleSubmit} className="space-y-4">
      {etapa === 1 ? (
        <>
          <input value={nome} onChange={e => setNome(e.target.value)} maxLength={100} placeholder="Nome completo" required className="w-full bg-[#1A365D] border border-[#2D4A6B] rounded-[8px] p-4 text-white focus:ring-2 focus:ring-[#C2A878] outline-none" autoComplete="name" />
          <input value={email} onChange={e => setEmail(e.target.value)} maxLength={254} type="email" placeholder="Email profissional" required className="w-full bg-[#1A365D] border border-[#2D4A6B] rounded-[8px] p-4 text-white focus:ring-2 focus:ring-[#C2A878] outline-none" autoComplete="email" />
          {erro && <p className="text-red-400 text-sm" role="alert">{erro}</p>}
          <button type="submit" className="w-full bg-[#C2A878] text-[#0F243E] rounded-[8px] py-4 font-medium hover:opacity-90 transition">Continuar →</button>
        </>
      ) : (
        <>
          <input value={instituicao} onChange={e => setInstituicao(e.target.value)} maxLength={100} placeholder="Instituição (SONANGOL, ARSEG...)" className="w-full bg-[#1A365D] border border-[#2D4A6B] rounded-[8px] p-4 text-white focus:ring-2 focus:ring-[#C2A878] outline-none" autoComplete="organization" />
          <textarea value={mensagem} onChange={e => setMensagem(e.target.value)} maxLength={1000} placeholder="Como posso ajudar a sua equipa?" required rows={4} className="w-full bg-[#1A365D] border border-[#2D4A6B] rounded-[8px] p-4 text-white focus:ring-2 focus:ring-[#C2A878] outline-none resize-none" />
          {erro && <p className="text-red-400 text-sm" role="alert">{erro}</p>}
          <button type="submit" disabled={loading} className="w-full bg-[#C2A878] text-[#0F243E] rounded-[8px] py-4 font-medium disabled:opacity-50">{loading ? 'A enviar...' : 'Enviar Solicitação'}</button>
          <button type="button" onClick={() => setEtapa(1)} className="w-full text-[#A0AEC0] text-sm mt-2">← Voltar</button>
        </>
      )}
    </form>
  )
}
*/

// ============================================
// .ENV (Vercel / Netlify)
// ============================================
/*
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
*/
