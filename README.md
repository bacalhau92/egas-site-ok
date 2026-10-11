# Santos Egas Moniz - Portfolio V13 + Dashboard + Supabase

Pacote pronto para subir na Vercel. Inclui site premium V13 com fundos mesh/noise/blur biblioteca, WhatsApp flutuante, carrossel depoimentos, livro 3D + dashboard admin + SQL com RLS seguro.

## Estrutura
```
/
├── index.html              # SITE principal (V13 com Supabase fetch)
├── admin/index.html         # DASHBOARD admin (leads, depoimentos, métricas)
├── public/
│   ├── book_egas.png       # Capa do manual
│   ├── Autor.png           # Foto hero
│   ├── WhatsApp_Image...   # Foto sobre
│   └── erasebg-transformed.png
├── supabase/
│   ├── schema.sql          # Tabelas + RLS + dados iniciais
│   └── integration.jsx     # Código React seguro com sanitização
├── vercel.json             # Rewrites + headers de segurança
├── .env.example            # Variáveis (copiar para .env.local)
└── package.json
```

## Deploy em 3 minutos na Vercel

### 1. Supabase (obrigatório)
1. Vai em https://supabase.com/dashboard/project/veiguhjsmwoenyycrvue
2. SQL Editor > New Query > cola `supabase/schema.sql` > Run
3. Storage > New Bucket > `galeria` (public) e `obras` (public)
4. Verifica Table Editor: `leads`, `depoimentos`, `metricas` criadas

### 2. Vercel
1. Cria novo projeto em vercel.com > Import Git ou drag-and-drop desta pasta
2. Framework: Other (Static)
3. Environment Variables:
   - `VITE_SUPABASE_URL` = `https://veiguhjsmwoenyycrvue.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGci...` (a tua anon key)
4. Deploy

O site fica em `https://teu-projeto.vercel.app`
Dashboard em `https://teu-projeto.vercel.app/admin`

### 3. Trocar WhatsApp (depois)
No `index.html` procura `wa.me/244923000000` e troca pelo número real:
```js
https://wa.me/244923020100?text=Ol%C3%A1%20Santos%20Egas%20Moniz%2C%20vim%20do%20site
```

### Segurança já aplicada
- RLS: anon só insere em `leads`, authenticated lê
- Sanitização: `sanitizeInput()` remove <script> e escapa &<>"'
- Links externos: `rel="noopener noreferrer"` + `encodeURIComponent`
- Headers: X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy
- Sem `innerHTML` com dados do usuário (só textContent)
- `maxLength` 100/254/1000 nos inputs

### O que fica no Supabase vs hardcoded
- **Supabase (dinâmico):** leads, depoimentos, métricas (count-up), galeria futura, obras
- **Hardcoded (design):** paleta #0F243E/#C2A878, fundos premium mesh/noise/blur, layout 6 secções, selos ARSEG/UAN/ENAPP/PIC-ANGOLA/PRIME ACADEMY

### Próximos passos
- Liga domínio próprio na Vercel > Settings > Domains
- Ativa Email automático: Supabase Edge Function + Resend (100/dia grátis)
- Dashboard real: troca mock por fetch real (código em `supabase/integration.jsx`)

Dúvidas: abre `supabase/integration.jsx` tem exemplo completo do formulário 2 etapas com confete dourado.
