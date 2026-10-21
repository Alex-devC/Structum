import React, { useState } from 'react';
import { ShieldCheck, Database, Key, User, Lock, Eye, EyeOff, CreditCard, Network, Monitor, Activity } from 'lucide-react';
import { API_CONFIG, getApiUrl } from '../config/api';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onOpenHealthModal: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onOpenHealthModal }) => {
  const [username, setUsername] = useState('alex.longo@structum.eng.br');
  const [password, setPassword] = useState('structum2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [dbHealth, setDbHealth] = useState<{ configured: boolean; connected: boolean; status: string }>({
    configured: false,
    connected: false,
    status: 'nao_configurado',
  });

  React.useEffect(() => {
    fetch(getApiUrl(API_CONFIG.endpoints.health))
      .then(res => res.json())
      .then(data => {
        if (data?.database) {
          setDbHealth(data.database);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="h-full flex flex-col font-sans text-slate-100 antialiased relative bg-[#0b131f] select-none overflow-hidden">
      {/* BEGIN: DesktopWindowChrome */}
      <header className="h-9 bg-[#0b1320]/95 border-b border-white/10 flex items-center justify-between px-3 text-xs select-none z-50">
        <div className="flex items-center space-x-2.5">
          {/* Ícone vetorial da Aplicação: Treliça e Cubo Estrutural */}
          <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            <line opacity="0.6" strokeDasharray="2 2" x1="12" x2="12" y1="2" y2="22" />
          </svg>
          <span className="font-medium text-slate-300 tracking-wide">
            STRUCTUM — Autenticação de Usuário [v3.4.2]
          </span>
        </div>

        {/* Controles de Janela Típicos Windows + Botão de Diagnóstico de Backend */}
        <div className="flex items-center h-full -mr-3">
          <button
            onClick={onOpenHealthModal}
            className="h-full px-3 text-cyan-400 hover:bg-white/10 transition-colors flex items-center gap-1.5 text-[11px]"
            title="Diagnóstico de Backend (Fastify API)"
            type="button"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span className="hidden sm:inline font-mono">Backend: Online</span>
          </button>
          <button className="h-full px-4 text-slate-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center" title="Minimizar" type="button">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <rect height="1.2" width="14" x="1" y="8" />
            </svg>
          </button>
          <button className="h-full px-4 text-slate-600 cursor-not-allowed flex items-center justify-center" disabled title="Restaurar (Desabilitado)" type="button">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 16 16">
              <rect height="12" rx="1" width="12" x="2" y="2" />
            </svg>
          </button>
          <button className="titlebar-btn-close h-full px-4 text-slate-400 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center" title="Fechar Janela" type="button">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>
      </header>
      {/* END: DesktopWindowChrome */}

      {/* BEGIN: MainContentContainer */}
      <main className="relative flex-1 flex items-center justify-between overflow-hidden">
        {/* Imagem de Fundo Industrial com Overlay Escuro Petrolífero */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Fundo estrutural e arquitetônico industrial"
            className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0UjW_nRdd6Mgnd-EkdClEEfL88M0GCRLEAHhFnTjPkzsRRbxX7OKG-6UoKqrILsGsOjWoi0VtMMtn0c7jJLXxOYSTt7eEdw-peNnfDChRqhox5rCoo6b0hXSjcBeBPD-_FI0-4gyNMZPjJadLjf71Ef_Z18kvAEfgKtwOxepwbmSFf1-A7mz_bNWN7CBpSbMe23z_zKadkpDhp4lM_OBD9oYupYS4nt5gBIVD06LrRkxpIqwP-4Fe3A"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101a]/95 via-[#0e1a2b]/80 to-[#08101a]/85 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#08101a_80%)]" />
        </div>

        {/* Conteúdo em Duas Colunas */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-8 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-10 py-6">
          {/* Painel Esquerdo: Identidade Visual Técnica */}
          <section className="flex-1 max-w-xl text-left hidden md:flex flex-col justify-between h-full py-4">
            <div className="space-y-6 mt-4">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded bg-sky-950/60 border border-sky-500/25 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-mono tracking-wider text-cyan-300 font-semibold uppercase">
                  Módulo de Engenharia e Operações v3.4.2
                </span>
              </div>

              {/* Logotipo com Treliça e Cubo Isométrico Vetorial */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#1e3a5f] to-[#0e1a2b] border border-cyan-400/40 p-2.5 flex items-center justify-center shadow-lg shadow-cyan-950/50">
                  <svg className="w-full h-full text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 64 64">
                    <polygon points="32 6 58 20 58 48 32 62 6 48 6 20" strokeLinejoin="round" strokeWidth="2.5" />
                    <line opacity="0.7" strokeDasharray="1 1" strokeWidth="2" x1="32" x2="32" y1="6" y2="62" />
                    <line opacity="0.6" strokeWidth="1.8" x1="6" x2="58" y1="20" y2="48" />
                    <line opacity="0.6" strokeWidth="1.8" x1="6" x2="58" y1="48" y2="20" />
                    <circle cx="32" cy="34" fill="#38bdf8" r="3" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-white leading-none">STRUCTUM</h1>
                  <p className="text-xs uppercase font-semibold text-cyan-400/90 tracking-widest mt-1">
                    Engenharia, Gestão &amp; Laudos Técnicos
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-300/90 leading-relaxed max-w-lg font-normal">
                Plataforma corporativa integrada para modelagem de projetos, gestão estrutural de ativos fabris, controle de ordens de serviço e emissão de laudos de conformidade técnica industrial.
              </p>

              {/* Badges de Tecnologia e Status */}
              <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
                <div className="p-2.5 rounded bg-slate-900/50 border border-white/5 flex items-center space-x-3">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-200">Segurança TLS 1.3</div>
                    <div className="text-[10px] text-slate-400">Canal Criptografado Ponta a Ponta</div>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-slate-900/50 border border-white/5 flex items-center space-x-3">
                  <Database className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[11px] font-semibold text-slate-200">Módulo de Produção</div>
                    <div className="text-[10px] text-slate-400">Cluster SQL Replicado Ativo</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé técnico */}
            <div className="space-y-1.5 border-t border-white/10 pt-4 mt-6">
              <div className="text-[11px] text-slate-400 font-mono">
                Avalonia Core Engine 3.4.2 • Framework .NET 8.0 Desktop Runtime (x64)
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Desenvolvido por <span className="text-cyan-300 font-semibold">Alex Fabiano Longo</span>
              </div>
            </div>
          </section>

          {/* Painel Direito: Card de Login Flutuante Estilo Mica/Acrylic */}
          <section className="w-full max-w-[420px] acrylic-glass rounded-lg p-7 shadow-2xl relative">
            <header className="mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Acesso ao Sistema</h2>
                  <p className="text-xs text-slate-300 mt-0.5">Informe suas credenciais corporativas</p>
                </div>
                <div className="w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                  <Key className="w-5 h-5" />
                </div>
              </div>

              {/* Indicador de Conexão com Banco de Dados / Servidor */}
              <div
                onClick={onOpenHealthModal}
                className="mt-3.5 bg-slate-950/60 hover:bg-slate-900/80 cursor-pointer rounded px-2.5 py-1.5 border border-white/5 flex items-center justify-between text-[11px] transition-colors"
                title="Clique para inspecionar resposta do endpoint GET /api/health"
              >
                <div className="flex items-center space-x-1.5 text-slate-300 font-mono truncate">
                  <Database className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">
                    {dbHealth.connected ? 'PRODUCAO-SQL01 (192.168.1.10)' : 'PRODUCAO-SQL01 (Modo Dev Sem Banco)'}
                  </span>
                </div>
                {dbHealth.connected ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse" />
                    Conectado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Banco Não Configurado
                  </span>
                )}
              </div>
            </header>

            {/* Formulário de Autenticação */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5 tracking-wide" htmlFor="username">
                  Nome de Usuário / E-mail Corporativo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="avalonia-input w-full pl-9 pr-3 py-2 text-xs rounded text-slate-100 placeholder-slate-500 focus:outline-none"
                    placeholder="ex: alex.longo@structum.eng.br"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-200 tracking-wide" htmlFor="password">
                    Senha de Acesso
                  </label>
                  <a href="#esqueceu" onClick={(e) => e.preventDefault()} className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="avalonia-input w-full pl-9 pr-10 py-2 text-xs rounded text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-sky-500/40"
                  />
                  <span className="text-xs text-slate-300">Salvar credenciais neste terminal</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 rounded font-semibold text-xs text-white bg-gradient-to-r from-[#1e3a5f] via-[#1d4ed8] to-[#0284c7] hover:from-[#1b3353] hover:to-[#0369a1] active:scale-[0.99] border border-cyan-400/30 shadow-lg shadow-blue-950/60 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Entrar no Sistema</span>
                <span className="text-[10px] text-cyan-200/80 font-mono tracking-tighter bg-black/20 px-1.5 py-0.5 rounded border border-white/10 group-hover:bg-black/30">
                  ↵ Enter
                </span>
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-[#0f1828] px-2 text-slate-400 font-mono tracking-wider">
                    ou autenticação avançada
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full py-2 px-3 rounded text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-cyan-500/40 transition-colors flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Acessar com Certificado Digital (A1 / A3 / Nuvem)</span>
              </button>

              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                <a href="#proxy" onClick={(e) => { e.preventDefault(); onOpenHealthModal(); }} className="hover:text-slate-200 transition-colors flex items-center gap-1">
                  <Network className="w-3.5 h-3.5 text-slate-500" />
                  <span>Configurar Proxy / Host</span>
                </a>
                <a href="#terminal" onClick={(e) => e.preventDefault()} className="hover:text-slate-200 transition-colors flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-slate-500" />
                  <span>Alternar Terminal</span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* BEGIN: DesktopFooterStatusStrip */}
      <footer className="h-6 bg-[#080d15] border-t border-white/10 px-3.5 flex items-center justify-between text-[11px] text-slate-400 select-none z-50">
        <div className="flex items-center space-x-4">
          <div
            onClick={onOpenHealthModal}
            className="flex items-center space-x-1.5 cursor-pointer hover:text-cyan-300 transition-colors"
            title="Clique para testar endpoint de saúde GET /api/health"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${dbHealth.connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className="text-slate-300">
              {dbHealth.connected ? 'Serviço de Autenticação Online' : 'Fastify API Online (Modo Sem Banco)'}
            </span>
            <span className="text-slate-500 font-mono">
              ({dbHealth.connected ? 'latência: 14ms' : 'banco: não configurado'})
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="hidden sm:flex items-center space-x-1 font-mono text-[10px] text-slate-400">
            <span>IP do Terminal:</span>
            <span className="text-slate-300">192.168.10.45</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-medium tracking-tight">Segurança: ICP-Brasil Compliance</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="font-mono text-[10px] text-slate-400">
            UTF-8 • pt-BR
          </div>
        </div>
      </footer>
    </div>
  );
};
