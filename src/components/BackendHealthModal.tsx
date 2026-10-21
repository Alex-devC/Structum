import React, { useState, useEffect } from 'react';
import { Activity, Database, Server, CheckCircle2, AlertTriangle, RefreshCw, X, Copy, Check, Info } from 'lucide-react';

interface HealthData {
  status: string;
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  database: {
    driver: string;
    configured: boolean;
    connected: boolean;
    status: 'conectado' | 'nao_configurado' | 'indisponivel';
    message: string;
  };
}

interface BackendHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackendHealthModal: React.FC<BackendHealthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HealthData | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    const start = performance.now();
    try {
      const res = await fetch('/api/health');
      const time = Math.round(performance.now() - start);
      setLatency(time);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar ao backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDbStatusBadge = () => {
    if (!data) return null;
    const db = data.database;
    if (db.status === 'conectado') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse" />
          Conectado
        </span>
      );
    }
    if (db.status === 'nao_configurado') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Não Configurado (Modo Dev)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-300 bg-red-950/80 px-2 py-0.5 rounded border border-red-500/40">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
        Indisponível / Offline
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-xl bg-[#0e1a2b] border border-cyan-500/40 rounded-lg shadow-2xl overflow-hidden flex flex-col text-slate-100 font-sans">
        {/* Title Bar do Modal */}
        <div className="h-9 bg-[#0b1320] border-b border-white/10 px-3.5 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">
              Diagnóstico de Infraestrutura do Backend — GET /api/health
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo do Diagnóstico */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Header de Status */}
          <div className="flex items-center justify-between p-3 rounded bg-slate-900/80 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${data?.status === 'ok' ? 'bg-emerald-400 shadow-[0_0_10px_#22c55e]' : 'bg-amber-400 animate-pulse'}`} />
              <div>
                <div className="text-xs font-semibold text-white">
                  Serviço Fastify Core: {data?.status === 'ok' ? 'Online & Operacional' : 'Em Verificação'}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Ambiente: {data?.environment || 'development'} • Host: 0.0.0.0
                </div>
              </div>
            </div>

            <button
              onClick={fetchHealth}
              disabled={loading}
              className="px-2.5 py-1.5 rounded bg-cyan-950/70 border border-cyan-500/40 hover:bg-cyan-900/60 text-cyan-300 text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Consultando...' : 'Re-testar'}</span>
            </button>
          </div>

          {/* Grid de Métricas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded bg-slate-900/50 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Server className="w-3.5 h-3.5 text-cyan-400" />
                <span>Latência de Resposta</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                {latency !== null ? `${latency} ms` : '—'}
              </div>
              <div className="text-[10px] text-emerald-400">Despacho de rota em tempo real</div>
            </div>

            <div className="p-3 rounded bg-slate-900/50 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Estado do Banco</span>
                </span>
                {getDbStatusBadge()}
              </div>
              <div className="text-xs font-semibold text-slate-200 pt-1">
                {data?.database.configured ? 'Configurado' : 'Modo Sem Banco Ativo'}
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                {data?.database.message}
              </div>
            </div>
          </div>

          {/* Card Informativo sobre Modo Sem Banco */}
          <div className="p-3 rounded bg-slate-950/80 border border-cyan-500/20 text-xs space-y-2">
            <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Configuração Flexível de Desenvolvimento</span>
            </div>
            <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
              <li>A variável <code className="text-cyan-300 font-mono">DATABASE_URL</code> não é obrigatória em desenvolvimento.</li>
              <li>A API inicia normalmente permitindo testar rotas e frontend sem requerer MySQL local.</li>
              <li>CORS configurado para aceitar a origem real de execução do frontend.</li>
              <li>Em produção, operações dependentes de persistência exigem validação prévia.</li>
            </ul>
          </div>

          {/* Resposta Raw JSON */}
          {data && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Payload retornado por <code className="text-cyan-300 font-mono">GET /api/health</code>:</span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
                </button>
              </div>
              <pre className="p-3 rounded bg-[#070d14] border border-white/10 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="h-10 bg-[#080d15] border-t border-white/10 px-4 flex items-center justify-between text-xs text-slate-400">
          <span>STRUCTUM v3.4.2 • Alex Fabiano Longo</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
