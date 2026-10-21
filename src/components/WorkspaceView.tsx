import React, { useState } from 'react';
import {
  Save, Undo, Redo, RefreshCw, Minimize2, Square, X, User,
  FileText, Edit3, Trash2, Filter, ArrowUpDown, Search,
  Download, Printer, Table, Eye, ShieldCheck, CheckCircle2,
  Calendar, Layers, Sliders, ChevronLeft, ChevronRight, LogOut, Activity
} from 'lucide-react';

interface WorkspaceViewProps {
  onLogout: () => void;
  onOpenHealthModal: () => void;
}

interface LaudoRow {
  id: string;
  code: string;
  date: string;
  client: string;
  doc: string;
  equipment: string;
  engineer: string;
  status: 'Emitido' | 'Em Elaboração' | 'Aguardando Assinatura' | 'Revisão Pendente' | 'Cancelado';
}

const INITIAL_ROWS: LaudoRow[] = [
  {
    id: '1',
    code: 'LAU-2024-0891',
    date: '24/05/2024 14:32',
    client: 'Indústria Metalúrgica Alvorada S.A.',
    doc: '47.829.102/0001-94',
    equipment: 'Transformador Seco 750kVA - Subestação A',
    engineer: 'Eng. Alex Fabiano Longo',
    status: 'Emitido',
  },
  {
    id: '2',
    code: 'LAU-2024-0890',
    date: '24/05/2024 11:15',
    client: 'Condomínio Residencial Solar das Palmeiras',
    doc: '03.119.845/0001-12',
    equipment: 'Sistema SPDA e Malha de Aterramento',
    engineer: 'Téc. Marcos Vinícius Prado',
    status: 'Em Elaboração',
  },
  {
    id: '3',
    code: 'LAU-2024-0889',
    date: '23/05/2024 18:02',
    client: 'Logística Integrada Express do Brasil Ltda.',
    doc: '19.450.812/0003-88',
    equipment: 'Quadro Geral de Baixa Tensão (QGBT-Galpão)',
    engineer: 'Eng. Alex Fabiano Longo',
    status: 'Aguardando Assinatura',
  },
  {
    id: '4',
    code: 'LAU-2024-0888',
    date: '23/05/2024 16:44',
    client: 'Hospital Santa Clara & Unidade Cirúrgica',
    doc: '52.341.009/0001-40',
    equipment: 'Grupo Gerador Diesel 500kVA + No-Break',
    engineer: 'Eng. Roberto Albuquerque',
    status: 'Revisão Pendente',
  },
  {
    id: '5',
    code: 'LAU-2024-0887',
    date: '23/05/2024 10:20',
    client: 'Centro Empresarial Faria Lima Towers',
    doc: '11.902.345/0002-19',
    equipment: 'Banco de Capacitores Automático 150kVAr',
    engineer: 'Eng. Alex Fabiano Longo',
    status: 'Emitido',
  },
  {
    id: '6',
    code: 'LAU-2024-0886',
    date: '22/05/2024 15:10',
    client: 'Supermercados Boa Praça Unidade 04',
    doc: '08.773.201/0004-51',
    equipment: 'Termografia em Painéis e Cargas Críticas',
    engineer: 'Téc. Marcos Vinícius Prado',
    status: 'Emitido',
  },
  {
    id: '7',
    code: 'LAU-2024-0885',
    date: '22/05/2024 09:30',
    client: 'Tecelagem e Fiação Paulista S.A.',
    doc: '61.229.400/0001-77',
    equipment: 'Análise de Qualidade de Energia (NR-10)',
    engineer: 'Eng. Alex Fabiano Longo',
    status: 'Cancelado',
  },
  {
    id: '8',
    code: 'LAU-2024-0884',
    date: '21/05/2024 17:15',
    client: 'Parque Eólico Ventos do Sertão V',
    doc: '29.103.541/0001-02',
    equipment: 'Subestação Elevadora 138kV - Disjuntores',
    engineer: 'Eng. Roberto Albuquerque',
    status: 'Emitido',
  },
  {
    id: '9',
    code: 'LAU-2024-0883',
    date: '21/05/2024 13:50',
    client: 'Condomínio Residencial Grand Parc',
    doc: '07.892.115/0001-30',
    equipment: 'Laudo de Estanqueidade da Rede de Gás GLP',
    engineer: 'Eng. Alex Fabiano Longo',
    status: 'Emitido',
  },
];

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({ onLogout, onOpenHealthModal }) => {
  const [selectedId, setSelectedId] = useState<string>('1');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [activeMenuTab, setActiveMenuTab] = useState<'Início' | 'Laudos' | 'Clientes' | 'Relatórios' | 'Administração' | 'Ajuda'>('Laudos');
  const [dbHealth, setDbHealth] = useState<{ configured: boolean; connected: boolean; status: string }>({
    configured: false,
    connected: false,
    status: 'nao_configurado',
  });

  React.useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data?.database) {
          setDbHealth(data.database);
        }
      })
      .catch(() => {});
  }, []);

  const selectedRow = INITIAL_ROWS.find(r => r.id === selectedId) || INITIAL_ROWS[0];

  const filteredRows = INITIAL_ROWS.filter(row => {
    const matchesSearch = searchFilter === '' ||
      row.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      row.client.toLowerCase().includes(searchFilter.toLowerCase()) ||
      row.equipment.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: LaudoRow['status']) => {
    switch (status) {
      case 'Emitido':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1e3a5f] text-cyan-200">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5" />
            Emitido
          </span>
        );
      case 'Em Elaboração':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500 mr-1.5" />
            Em Elaboração
          </span>
        );
      case 'Aguardando Assinatura':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-1.5" />
            Aguardando Assinatura
          </span>
        );
      case 'Revisão Pendente':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
            Revisão Pendente
          </span>
        );
      case 'Cancelado':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
            Cancelado
          </span>
        );
    }
  };

  return (
    <div className="h-full flex flex-col font-sans text-slate-800 bg-[#e6eeff] select-none overflow-hidden text-xs">
      {/* 1. Windows Native Title Bar (H: 32px) */}
      <header className="h-8 bg-[#d9e3f7] border-b border-[#c4c6cf]/60 flex items-center justify-between px-2 select-none z-50">
        <div className="flex items-center gap-2">
          {/* Logo Icon */}
          <div className="w-5 h-5 rounded bg-[#1e3a5f] p-0.5 flex items-center justify-center text-cyan-400 shadow-xs">
            <svg className="w-3.5 h-3.5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Quick Access Toolbar (QAT) */}
          <div className="flex items-center gap-0.5 border-r border-[#c4c6cf]/80 pr-2">
            <button className="p-1 hover:bg-[#dee9fd] rounded text-slate-700" title="Salvar (Ctrl+S)">
              <Save className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-[#dee9fd] rounded text-slate-700" title="Desfazer (Ctrl+Z)">
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-[#dee9fd] rounded text-slate-700" title="Refazer (Ctrl+Y)">
              <Redo className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-[#dee9fd] rounded text-slate-700" title="Atualizar Registros (F5)">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="font-semibold text-slate-800 text-[11px] truncate">
            STRUCTUM — Sistema de Gestão Empresarial v3.4.2 [Ambiente de Produção]
          </span>
        </div>

        {/* Lado Direito: Perfil + Botão de Diagnóstico de API + Controles de Janela */}
        <div className="flex items-center h-full">
          <button
            onClick={onOpenHealthModal}
            className="h-full px-2.5 flex items-center gap-1 text-[11px] font-semibold text-slate-800 hover:bg-[#dee9fd] transition-colors"
            title="Abrir painel de diagnóstico da API Fastify"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span className="hidden md:inline font-mono text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-300">
              API Fastify: OK
            </span>
          </button>

          <div className="flex items-center gap-2 px-2 border-l border-[#c4c6cf]/60">
            <div className="w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium text-[11px] text-slate-700 hidden lg:inline">Alex Longo</span>
          </div>

          <div className="flex items-center h-full ml-1">
            <button className="w-10 h-8 flex items-center justify-center text-slate-600 hover:bg-[#dee9fd]" title="Minimizar">
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <button className="w-10 h-8 flex items-center justify-center text-slate-600 hover:bg-[#dee9fd]" title="Maximizar">
              <Square className="w-3 h-3" />
            </button>
            <button onClick={onLogout} className="w-10 h-8 flex items-center justify-center text-slate-600 hover:bg-red-600 hover:text-white transition-colors" title="Desconectar / Fechar">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Menu Tabs Bar (H: 26px) */}
      <nav className="h-6.5 bg-[#eff3ff] border-b border-[#c4c6cf]/60 flex items-center px-1 select-none">
        <button className="bg-[#1e3a5f] text-white px-3 h-full flex items-center justify-center hover:bg-[#022448] font-semibold text-[11px] transition-colors">
          Arquivo
        </button>
        <div className="flex items-center h-full">
          {(['Início', 'Laudos', 'Clientes', 'Relatórios', 'Administração', 'Ajuda'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveMenuTab(tab)}
              className={`px-3 h-full flex items-center text-[11px] transition-colors ${
                activeMenuTab === tab
                  ? 'bg-white border-t-2 border-[#1e3a5f] text-[#022448] font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-[#e6eeff]'
              }`}
            >
              {tab === 'Ajuda' ? 'Ajuda / Sobre' : tab}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. Office Fluent Ribbon (H: 94px) */}
      <div className="h-[94px] bg-white border-b border-[#c4c6cf]/60 flex items-stretch px-1 overflow-x-auto divide-x divide-[#c4c6cf]/40 shadow-xs">
        {/* Grupo: Operações */}
        <div className="flex flex-col justify-between px-3 py-1 min-w-[190px]">
          <div className="flex items-center gap-1 flex-1">
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center group cursor-pointer">
              <FileText className="w-7 h-7 text-[#022448] group-hover:scale-105 transition-transform" />
              <span className="text-[10px] text-slate-800 leading-tight font-semibold mt-1">Novo Laudo</span>
            </button>
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center cursor-pointer">
              <Edit3 className="w-6 h-6 text-[#335e9f]" />
              <span className="text-[10px] text-slate-800 leading-tight mt-1">Editar</span>
            </button>
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center cursor-pointer">
              <Trash2 className="w-6 h-6 text-red-600" />
              <span className="text-[10px] text-slate-800 leading-tight mt-1">Excluir</span>
            </button>
          </div>
          <div className="text-center text-[9px] uppercase tracking-wider text-slate-500 border-t border-slate-200 pt-0.5">
            Operações
          </div>
        </div>

        {/* Grupo: Registros */}
        <div className="flex flex-col justify-between px-3 py-1 min-w-[200px]">
          <div className="flex flex-col justify-center gap-1 flex-1">
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <Filter className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Filtrar Registros Ativos</span>
            </button>
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Classificação Avançada</span>
            </button>
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <Search className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Localizar Código (Ctrl+F)</span>
            </button>
          </div>
          <div className="text-center text-[9px] uppercase tracking-wider text-slate-500 border-t border-slate-200 pt-0.5">
            Registros
          </div>
        </div>

        {/* Grupo: Exportação */}
        <div className="flex flex-col justify-between px-3 py-1 min-w-[190px]">
          <div className="flex items-center gap-1 flex-1">
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center cursor-pointer">
              <Download className="w-6 h-6 text-red-600" />
              <span className="text-[10px] text-slate-800 leading-tight mt-1">Gerar PDF</span>
            </button>
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center cursor-pointer">
              <Table className="w-6 h-6 text-emerald-700" />
              <span className="text-[10px] text-slate-800 leading-tight mt-1">Excel / CSV</span>
            </button>
            <button className="flex flex-col items-center justify-center w-14 h-16 rounded hover:bg-[#dee9fd] p-1 text-center cursor-pointer">
              <Printer className="w-6 h-6 text-slate-600" />
              <span className="text-[10px] text-slate-800 leading-tight mt-1">Imprimir</span>
            </button>
          </div>
          <div className="text-center text-[9px] uppercase tracking-wider text-slate-500 border-t border-slate-200 pt-0.5">
            Exportação
          </div>
        </div>

        {/* Grupo: Visualização */}
        <div className="flex flex-col justify-between px-3 py-1 min-w-[180px]">
          <div className="flex flex-col justify-center gap-1 flex-1">
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <Eye className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Painel de Detalhes</span>
            </button>
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <Layers className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Dividir Exibição</span>
            </button>
            <button className="flex items-center gap-2 px-2 h-5 rounded hover:bg-[#dee9fd] text-left text-slate-800">
              <Sliders className="w-3.5 h-3.5 text-[#335e9f]" />
              <span className="text-[11px]">Grade Compacta (100%)</span>
            </button>
          </div>
          <div className="text-center text-[9px] uppercase tracking-wider text-slate-500 border-t border-slate-200 pt-0.5">
            Visualização
          </div>
        </div>
      </div>

      {/* 4. Corpo Central: Splitter (Sidebar + DataGrid + DockPanel) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar: Módulos do Sistema */}
        <aside className="w-60 bg-[#eff3ff] border-r border-[#c4c6cf]/60 flex flex-col justify-between shrink-0 select-none">
          <div className="flex flex-col">
            <div className="h-7 bg-[#d9e3f7] px-3 flex items-center justify-between border-b border-[#c4c6cf]/50 font-bold text-[10px] uppercase tracking-wider text-slate-700">
              <span>Módulos do Sistema</span>
            </div>

            <nav className="p-1 space-y-0.5">
              <div className="text-[9px] uppercase font-bold text-slate-500 px-3 py-1 tracking-wider">
                Operacional
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-slate-700 hover:bg-[#d9e3f7] rounded-none">
                <Layers className="w-4 h-4 text-[#335e9f]" />
                <span>Painel Geral</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-left bg-[#dee9fd] text-[#022448] font-bold border-l-2 border-[#1e3a5f] rounded-none">
                <FileText className="w-4 h-4 text-[#022448]" />
                <span>Laudos Técnicos</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-slate-700 hover:bg-[#d9e3f7] rounded-none">
                <Table className="w-4 h-4 text-[#335e9f]" />
                <span>Cadastro de Clientes</span>
              </button>

              <div className="text-[9px] uppercase font-bold text-slate-500 px-3 py-1 mt-2 tracking-wider">
                Gerencial
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-slate-700 hover:bg-[#d9e3f7] rounded-none">
                <ArrowUpDown className="w-4 h-4 text-[#335e9f]" />
                <span>Relatórios Gerenciais</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-slate-700 hover:bg-[#d9e3f7] rounded-none">
                <Sliders className="w-4 h-4 text-[#335e9f]" />
                <span>Configurações do Sistema</span>
              </button>
            </nav>
          </div>

          {/* Workspace Ativo */}
          <div className="p-2 border-t border-[#c4c6cf]/60 bg-[#e6eeff]">
            <div className="bg-white p-2 border border-[#c4c6cf]/60 rounded text-[11px]">
              <span className="font-bold text-[#022448] block">Workspace Ativo:</span>
              <span className="text-slate-600 font-mono text-[10px]">ENG-PROD-BR01.LOCAL</span>
            </div>
          </div>
        </aside>

        {/* Área Central: Ribbon Rápido + DataGrid + Detalhes */}
        <main className="flex-1 flex flex-col p-2 overflow-hidden gap-2">
          {/* Quick Filter Bar (Desk Bar) */}
          <div className="bg-[#eff3ff] p-1.5 rounded flex flex-wrap items-center justify-between gap-2 border border-[#c4c6cf]/60 shadow-xs">
            <div className="flex items-center gap-1">
              {(['Todos', 'Em Elaboração', 'Aguardando Assinatura', 'Emitidos / Concluídos', 'Cancelados'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab === 'Emitidos / Concluídos' ? 'Emitido' : tab)}
                  className={`px-2.5 h-6 rounded text-[11px] font-medium transition-colors ${
                    (statusFilter === tab || (statusFilter === 'Emitido' && tab === 'Emitidos / Concluídos'))
                      ? 'bg-[#022448] text-white font-semibold'
                      : 'bg-white hover:bg-[#dee9fd] text-slate-700 border border-[#c4c6cf]/40'
                  }`}
                >
                  {tab === 'Todos' ? 'Todos (1.482)' : tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar laudo, cliente..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-white h-6 pl-6 pr-2 rounded border border-[#c4c6cf] text-[11px] w-48 focus:outline-none focus:border-[#335e9f]"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-1.5 top-1.5" />
              </div>

              <div className="flex items-center gap-1 text-slate-600">
                <span>Data:</span>
                <span className="font-mono bg-white px-1 py-0.5 border border-[#c4c6cf] rounded">01/05/2024</span>
                <span>até</span>
                <span className="font-mono bg-white px-1 py-0.5 border border-[#c4c6cf] rounded">24/05/2024</span>
              </div>
            </div>
          </div>

          {/* Grid Principal: DataGrid + DockPanel lateral */}
          <div className="flex-1 grid grid-cols-12 gap-2 overflow-hidden">
            {/* WPF DataGrid */}
            <div className="col-span-12 xl:col-span-8 bg-white border border-[#c4c6cf]/70 rounded shadow-xs flex flex-col overflow-hidden">
              {/* Header do DataGrid */}
              <div className="h-7 bg-[#dee9fd] border-b border-[#c4c6cf] flex items-center font-bold text-slate-700 text-[11px] divide-x divide-[#c4c6cf]/60 select-none">
                <div className="w-7 h-full flex items-center justify-center">
                  <input type="checkbox" className="w-3 h-3" />
                </div>
                <div className="w-6 h-full flex items-center justify-center text-slate-500">▶</div>
                <div className="w-28 px-2 flex items-center justify-between">
                  <span>Nº Laudo</span>
                  <span className="text-[9px]">▲</span>
                </div>
                <div className="w-28 px-2">Data Emissão</div>
                <div className="flex-1 px-2">Cliente / Razão Social</div>
                <div className="w-32 px-2 hidden md:block">CNPJ / CPF</div>
                <div className="w-36 px-2 hidden lg:block">Equipamento</div>
                <div className="w-28 px-2">Status</div>
              </div>

              {/* Linhas do DataGrid */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 font-mono text-[11px]">
                {filteredRows.map(row => {
                  const isSelected = row.id === selectedId;
                  return (
                    <div
                      key={row.id}
                      onClick={() => setSelectedId(row.id)}
                      className={`h-7 flex items-center divide-x divide-slate-200 cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#aac7ff]/40 text-[#022448] font-semibold' : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="w-7 h-full flex items-center justify-center">
                        <input type="checkbox" checked={isSelected} readOnly className="w-3 h-3 text-[#1e3a5f]" />
                      </div>
                      <div className="w-6 h-full flex items-center justify-center text-[#1e3a5f]">
                        {isSelected ? '▶' : ''}
                      </div>
                      <div className="w-28 px-2 font-bold text-[#022448] truncate">{row.code}</div>
                      <div className="w-28 px-2 text-slate-600 truncate">{row.date}</div>
                      <div className="flex-1 px-2 font-sans truncate">{row.client}</div>
                      <div className="w-32 px-2 text-slate-600 hidden md:block truncate">{row.doc}</div>
                      <div className="w-36 px-2 font-sans text-slate-700 hidden lg:block truncate">{row.equipment}</div>
                      <div className="w-28 px-2">{getStatusBadge(row.status)}</div>
                    </div>
                  );
                })}
              </div>

              {/* Rodapé de Paginação */}
              <div className="h-7 bg-[#eff3ff] border-t border-[#c4c6cf]/60 px-3 flex items-center justify-between text-slate-600 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#022448]">
                    Exibindo registros 1 a {filteredRows.length} de 1.482
                  </span>
                  <span>|</span>
                  <span className="text-[#335e9f] font-medium">1 registro selecionado</span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="px-1 py-0.5 rounded bg-white border border-[#c4c6cf] hover:bg-slate-100">|◄</button>
                  <button className="px-1 py-0.5 rounded bg-white border border-[#c4c6cf] hover:bg-slate-100">◄</button>
                  <span>Página</span>
                  <input type="text" readOnly value="1" className="w-6 text-center bg-white border border-[#c4c6cf] rounded" />
                  <span>de 60</span>
                  <button className="px-1 py-0.5 rounded bg-white border border-[#c4c6cf] hover:bg-slate-100">►</button>
                  <button className="px-1 py-0.5 rounded bg-white border border-[#c4c6cf] hover:bg-slate-100">►|</button>
                </div>
              </div>
            </div>

            {/* Painel Lateral: Inspection DockPanel */}
            <div className="col-span-12 xl:col-span-4 bg-white border border-[#c4c6cf]/70 rounded shadow-xs flex flex-col overflow-hidden">
              <div className="h-7 bg-[#1e3a5f] text-white px-3 flex items-center justify-between font-bold text-[11px]">
                <span>Detalhes do Laudo: {selectedRow.code}</span>
                <span className="text-cyan-300 text-[10px]">ART-SP-2024-9981240</span>
              </div>

              {/* Tabs do DockPanel */}
              <div className="h-6 bg-[#eff3ff] border-b border-[#c4c6cf]/50 flex items-center px-1 gap-1 text-[10px]">
                <button className="px-2 h-full bg-white text-[#022448] font-bold border-t-2 border-[#1e3a5f]">
                  Resumo Geral
                </button>
                <button className="px-2 h-full text-slate-600 hover:bg-slate-100">Equipamentos (3)</button>
                <button className="px-2 h-full text-slate-600 hover:bg-slate-100">Parecer Técnico</button>
                <button className="px-2 h-full text-slate-600 hover:bg-slate-100">Histórico (5)</button>
              </div>

              {/* Conteúdo Inspecionado */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-[11px]">
                {/* Status Box */}
                <div className="p-2 rounded bg-[#eff3ff] border border-[#c4c6cf]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-500 font-bold block">Protocolo</span>
                    <span className="font-mono font-bold text-[#022448]">ART-SP-2024-9981240</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1e3a5f] text-white">
                    LAUDO CONCLUÍDO & EMITIDO
                  </span>
                </div>

                {/* Dados da Contratante */}
                <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-[#022448] text-[10px] uppercase tracking-wide border-b border-slate-200 pb-0.5">
                    Dados da Contratante
                  </div>
                  <div className="font-semibold text-slate-900">{selectedRow.client}</div>
                  <div className="font-mono text-slate-600">CNPJ: {selectedRow.doc}</div>
                  <div className="text-slate-600 text-[10px]">Localização: Rod. Anhanguera, km 112 - Distrito Industrial, Campinas - SP</div>
                </div>

                {/* Gráfico Térmico SVG */}
                <div className="p-2 rounded bg-white border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-[#022448] uppercase">
                    <span>Parâmetros Térmicos</span>
                    <span className="text-emerald-700 font-mono">T_máx: 64.2 °C (Normal)</span>
                  </div>
                  <svg className="w-full h-12" fill="none" viewBox="0 0 320 60">
                    <path
                      className="text-[#335e9f]"
                      d="M 0 50 L 30 48 L 60 45 L 90 38 L 120 42 L 150 25 L 180 32 L 210 28 L 240 22 L 270 26 L 300 18 L 320 20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                    <line className="text-red-600" stroke="currentColor" strokeDasharray="3,3" strokeWidth="1.2" x1="0" x2="320" y1="15" y2="15" />
                    <text className="text-red-600 font-mono text-[8px]" fill="currentColor" x="5" y="12">
                      Limite Crítico NBR 5410 (75°C)
                    </text>
                  </svg>
                  <div className="flex justify-between font-mono text-[9px] text-slate-500">
                    <span>Fase R: 58.4°C</span>
                    <span>Fase S: 61.1°C</span>
                    <span>Fase T: 64.2°C</span>
                  </div>
                </div>

                {/* Termograma e Parecer */}
                <div className="p-2 rounded bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[10px] font-bold text-[#022448] uppercase">Conclusão do Engenheiro</div>
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    Equipamento ensaiado de acordo com a norma ABNT NBR 5356. Os gradientes térmicos e a rigidez dielétrica do isolamento encontram-se rigorosamente dentro dos parâmetros aceitáveis.
                  </p>

                  <div className="mt-2 p-1.5 bg-white rounded border border-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div className="flex-1 truncate">
                      <span className="font-bold text-[#022448] block truncate">Assinado Digitalmente (ICP-Brasil)</span>
                      <span className="text-slate-600 block truncate">{selectedRow.engineer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões do Rodapé do DockPanel */}
              <div className="h-8 bg-[#eff3ff] border-t border-[#c4c6cf]/60 px-3 flex items-center justify-end gap-2">
                <button className="px-2.5 py-0.5 rounded bg-white hover:bg-slate-100 border border-[#c4c6cf] text-[11px] font-medium">
                  Adicionar Nota
                </button>
                <button className="px-3 py-0.5 rounded bg-[#1e3a5f] hover:bg-[#022448] text-white text-[11px] font-bold">
                  Imprimir Dossiê
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 5. Windows StatusBar / StatusStrip (H: 24px) */}
      <footer className="h-6 bg-[#1e3a5f] text-white px-3 flex items-center justify-between text-[11px] font-mono select-none z-50 divide-x divide-white/20">
        <div className="flex items-center gap-2 pr-3 truncate">
          <span className="text-cyan-300 font-bold">STRUCTUM Engenharia &amp; Laudos Ltda.</span>
        </div>

        <div className="flex items-center gap-2 px-3 truncate">
          <span>Eng. Alex Fabiano Longo (Administrador)</span>
        </div>

        <div
          onClick={onOpenHealthModal}
          className="flex items-center gap-1.5 px-3 truncate text-cyan-200 cursor-pointer hover:text-white transition-colors"
          title="Clique para testar a saúde do backend Fastify em tempo real"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              dbHealth.connected ? 'bg-emerald-400 status-dot-pulse' : 'bg-amber-400'
            }`}
          />
          <span>
            {dbHealth.connected
              ? '🟢 Conectado ao MySQL (Latência: 12ms)'
              : '🟡 Banco: Não Configurado (Modo Dev)'}
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 truncate">
          <span>Total: 1.482 registros</span>
        </div>

        <div className="flex items-center gap-2 pl-3 truncate text-cyan-300">
          <span>STRUCTUM v3.4.2 | Dev: Alex Fabiano Longo</span>
          <button
            onClick={onLogout}
            className="ml-2 px-1.5 py-0.2 bg-white/10 hover:bg-red-600 rounded text-[10px] flex items-center gap-1 transition-colors"
            title="Voltar para a tela de autenticação"
          >
            <LogOut className="w-3 h-3" />
            <span>Sair</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
