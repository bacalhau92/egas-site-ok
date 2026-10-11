-- ============================================
-- SANTOS EGAS MONIZ - SUPABASE SCHEMA V1
-- Grátis: 500MB BD + 1GB storage
-- ============================================

-- 1. TABELA LEADS (a mais importante)
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) <= 100),
  email text not null check (char_length(email) <= 254),
  instituicao text check (char_length(instituicao) <= 100),
  mensagem text not null check (char_length(mensagem) <= 1000),
  origem text not null default 'form' check (origem in ('form', 'whatsapp', 'livro', 'brochura')),
  status text not null default 'novo' check (status in ('novo', 'contactado', 'fechado', 'arquivado')),
  created_at timestamptz not null default now()
);

-- Índices para performance
create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);

-- 2. TABELA DEPOIMENTOS / PARECERES
create table public.depoimentos (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(nome) <= 100),
  cargo text not null,
  instituicao text not null,
  texto text not null check (char_length(texto) <= 500),
  avatar_url text,
  estrelas int not null default 5 check (estrelas between 1 and 5),
  ordem int not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);
create index depoimentos_ordem_idx on public.depoimentos (ordem asc) where ativo = true;

-- 3. TABELA GALERIA (opcional - começa hardcoded)
create table public.galeria (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text not null check (categoria in ('SONANGOL','Textos Oficiais','PIC-Angola','ENAPP','Comunicacao','Mentoria','Prime Academy')),
  imagem_url text not null,
  descricao text,
  ordem int not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- 4. TABELA OBRAS / LIVROS
create table public.obras (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  subtitulo text,
  descricao text not null,
  capa_url text not null,
  link_compra text,
  ordem int not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- 5. TABELA MÉTRICAS
create table public.metricas (
  chave text primary key,
  valor int not null,
  label text not null,
  sufixo text not null default '+',
  ordem int not null default 0
);

-- Dados iniciais métricas
insert into public.metricas (chave, valor, label, sufixo, ordem) values
('profissionais_alta', 3000, 'Profissionais Alta Direção', '+', 1),
('funcionarios_publicos', 8000, 'Funcionários Públicos', '+', 2),
('textos_oficiais', 2500, 'Textos Oficiais', '+', 3),
('anos_pic', 8, 'Anos PIC-Angola', '+', 4);

-- Dados iniciais depoimentos (os 2 da V11)
insert into public.depoimentos (nome, cargo, instituicao, texto, estrelas, ordem) values
('Directora RH', 'Directora de Recursos Humanos', 'SONANGOL', 'Formação transformou completamente a nossa equipa de secretariado executivo. Metodologia prática e aplicável.', 5, 1),
('Oficial Superior', 'Oficial Superior', 'Casa Militar PR', 'Rigor, disciplina e excelência. Conteúdo alinhado com exigências de órgãos de Defesa e Segurança do Estado.', 5, 2);

-- ============================================
-- RLS - SEGURANÇA (obrigatório ativar)
-- ============================================
alter table public.leads enable row level security;
alter table public.depoimentos enable row level security;
alter table public.galeria enable row level security;
alter table public.obras enable row level security;
alter table public.metricas enable row level security;

-- LEADS: anon pode INSERIR, só authenticated pode LER
create policy "anon pode inserir leads" on public.leads
  for insert to anon with check (true);

create policy "authenticated pode ler leads" on public.leads
  for select to authenticated using (true);

create policy "authenticated pode atualizar leads" on public.leads
  for update to authenticated using (true);

-- DEPOIMENTOS: todos podem ler ativos, só authenticated edita
create policy "publico pode ler depoimentos ativos" on public.depoimentos
  for select to anon, authenticated using (ativo = true);

create policy "authenticated pode tudo em depoimentos" on public.depoimentos
  for all to authenticated using (true) with check (true);

-- GALERIA e OBRAS: mesmo padrão
create policy "publico pode ler galeria ativa" on public.galeria
  for select to anon, authenticated using (ativo = true);
create policy "authenticated pode tudo em galeria" on public.galeria
  for all to authenticated using (true) with check (true);

create policy "publico pode ler obras ativas" on public.obras
  for select to anon, authenticated using (ativo = true);
create policy "authenticated pode tudo em obras" on public.obras
  for all to authenticated using (true) with check (true);

create policy "publico pode ler metricas" on public.metricas
  for select to anon, authenticated using (true);
create policy "authenticated pode tudo em metricas" on public.metricas
  for all to authenticated using (true) with check (true);

-- ============================================
-- STORAGE BUCKETS (para imagens)
-- ============================================
-- Cria via Dashboard > Storage: buckets 'galeria' e 'obras' como public
-- Depois aplica esta policy via SQL:
-- insert into storage.buckets (id, name, public) values ('galeria','galeria',true), ('obras','obras',true) on conflict do nothing;
