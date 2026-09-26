import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  Printer, 
  FileText, 
  Eye, 
  Split, 
  CheckCircle2, 
  FileCheck2,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { FormularioHipossuficiencia, ServentiaPadrao } from './types';
import { 
  FORM_INICIAL, 
  salvarRascunho, 
  carregarRascunho, 
  limparRascunho, 
  salvarServentiaPadrao, 
  carregarServentiaPadrao
} from './utils/storage';
import { getDataAtualFormatada } from './utils/masks';
import { InteractiveForm } from './components/InteractiveForm';
import { DocumentPreview } from './components/DocumentPreview';
import { ServentiaModal } from './components/ServentiaModal';
import { ToastContainer, ToastMessage } from './components/Toast';

type ViewMode = 'form' | 'preview' | 'split';

export const App: React.FC = () => {
  const [form, setForm] = useState<FormularioHipossuficiencia>(() => {
    const salvo = carregarRascunho();
    if (salvo) return salvo;
    const servPadrao = carregarServentiaPadrao();
    return {
      ...FORM_INICIAL,
      serventia: servPadrao?.serventia || 'Cartório de Registro Civil das Pessoas Naturais',
      municipioComarca: servPadrao?.municipioComarca || 'Natal/RN',
      localData: `Natal/RN, ${getDataAtualFormatada()}`,
      certificacaoLocalData: `Natal/RN, ${getDataAtualFormatada()}`,
      certificacaoOficialPreposto: servPadrao?.oficialPrepostoPadrao || '',
    };
  });

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isServentiaModalOpen, setIsServentiaModalOpen] = useState(false);
  const [serventiaPadrao, setServentiaPadrao] = useState<ServentiaPadrao | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const documentPrintRef = useRef<HTMLDivElement | null>(null);

  // Initialize
  useEffect(() => {
    limparRascunho();
    const padrao = carregarServentiaPadrao();
    if (padrao) setServentiaPadrao(padrao);

    // Auto-adjust viewMode on small screen
    if (window.innerWidth < 1024) {
      setViewMode('form');
    }
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFormChange = (updated: Partial<FormularioHipossuficiencia>) => {
    setForm((prev) => ({ ...prev, ...updated }));
  };

  const handleResetForm = () => {
    const padrao = carregarServentiaPadrao();
    const novoForm: FormularioHipossuficiencia = {
      ...FORM_INICIAL,
      serventia: padrao?.serventia || '',
      municipioComarca: padrao?.municipioComarca || '',
      localData: `Natal/RN, ${getDataAtualFormatada()}`,
      certificacaoLocalData: `Natal/RN, ${getDataAtualFormatada()}`,
      certificacaoOficialPreposto: padrao?.oficialPrepostoPadrao || '',
    };
    setForm(novoForm);
    limparRascunho();
    addToast('info', 'Formulário limpo com sucesso');
  };

  const handlePreencherExemplo = () => {
    const exemplo: FormularioHipossuficiencia = {
      ...form,
      serventia: form.serventia || 'Cartório de Registro Civil das Pessoas Naturais - 1ª Zona',
      municipioComarca: form.municipioComarca || 'Natal/RN',
      beneficiarioNome: 'Maria Aparecida dos Santos Silva',
      beneficiarioDocumento: '123.456.789-00',
      beneficiarioDataNascimento: '15/04/1988',
      beneficiarioProfissao: 'Costureira autônoma',
      beneficiarioEndereco: 'Rua São José, nº 245, Bairro Alecrim',
      beneficiarioMunicipioUF: 'Natal/RN',
      beneficiarioCep: '59030-000',
      beneficiarioContato: '(84) 98877-6655',
      atoCertidao: true,
      certidaoTipos: {
        semBusca: false,
        comBusca: true,
        inteiroTeor: false,
      },
      atoHabilitacaoCasamento: false,
      atoAlteracaoPrenomeGenero: false,
      atoOutro: false,
      descricaoOutroAto: 'Segunda via de certidão de nascimento para comprovação cadastral',
      livro: 'A-42',
      folha: '112',
      termo: '25489',
      localData: `Natal/RN, ${getDataAtualFormatada()}`,
      tipoAssinaturaBeneficiario: 'manual',
      temRepresentante: false,
      temAssinaturaRogo: false,
      certificacaoLocalData: `Natal/RN, ${getDataAtualFormatada()}`,
      certificacaoOficialPreposto: 'Ana Beatriz Souza - Escrevente Autorizada',
    };
    setForm(exemplo);
    addToast('success', 'Dados de exemplo preenchidos', 'Você pode revisar e alterar qualquer campo.');
  };

  const validarCampos = (): string[] => {
    const erros: string[] = [];

    if (!form.beneficiarioNome.trim()) {
      erros.push('Nome completo da pessoa beneficiária é obrigatório (Seção 2).');
    }
    if (!form.beneficiarioDocumento.trim()) {
      erros.push('CPF ou RG da pessoa beneficiária é obrigatório (Seção 2).');
    }
    if (!form.beneficiarioEndereco.trim()) {
      erros.push('Endereço da pessoa beneficiária é obrigatório (Seção 2).');
    }
    if (!form.beneficiarioMunicipioUF.trim()) {
      erros.push('Município/UF da pessoa beneficiária é obrigatório (Seção 2).');
    }

    const algumAto = 
      form.atoCertidao ||
      form.atoHabilitacaoCasamento ||
      form.atoAlteracaoPrenomeGenero ||
      form.atoOutro;

    if (!algumAto) {
      erros.push('Selecione pelo menos um ato gratuito na Seção 3.');
    }

    if (!form.localData.trim()) {
      erros.push('Local e data são obrigatórios (Seção 5).');
    }

    if (form.temRepresentante) {
      if (!form.representanteNome.trim()) {
        erros.push('Nome do representante legal/assistente não foi preenchido (Seção 6).');
      }
      if (!form.representanteDocumento.trim()) {
        erros.push('CPF ou RG do representante legal/assistente não foi preenchido (Seção 6).');
      }
    }

    if (form.temAssinaturaRogo) {
      if (!form.rogoNome.trim()) {
        erros.push('Nome de quem assina a rogo é obrigatório (Seção 7).');
      }
      if (!form.rogoDocumento.trim()) {
        erros.push('CPF ou RG de quem assina a rogo é obrigatório (Seção 7).');
      }
      if (!form.testemunha1Nome.trim() && !form.testemunha2Nome.trim()) {
        erros.push('Informe os dados de pelo menos uma testemunha da assinatura a rogo (Seção 8).');
      }
    }

    return erros;
  };

  const handleSalvarServentia = (dados: ServentiaPadrao) => {
    salvarServentiaPadrao(dados);
    setServentiaPadrao(dados);
    setForm((prev) => ({
      ...prev,
      serventia: dados.serventia,
      municipioComarca: dados.municipioComarca,
      certificacaoOficialPreposto: dados.oficialPrepostoPadrao || prev.certificacaoOficialPreposto,
    }));
    addToast('success', 'Serventia padrão atualizada', 'Os dados foram aplicados ao formulário.');
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Barra de Navegação Superior */}
      <header className="no-print bg-[#002d50] text-white px-4 lg:px-8 py-2.5 shadow-md sticky top-0 z-40 border-b border-blue-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg border border-white/20">
              <Scale className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-wide text-white uppercase">
                  TJRN · CGJRN
                </span>
                <span className="text-[10px] bg-blue-800 text-blue-100 px-2 py-0.5 rounded font-mono font-medium">
                  Prov. 07/2026
                </span>
              </div>
              <p className="text-[11px] text-blue-200 font-medium">
                Declaração de Hipossuficiência Econômica (RCPN)
              </p>
            </div>
          </div>

          {/* Seletor de Modo de Exibição */}
          <div className="flex items-center gap-1 bg-[#001f38] p-1 rounded-lg border border-blue-900/60 text-xs">
            <button
              onClick={() => setViewMode('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'form'
                  ? 'bg-[#004a80] text-white shadow-xs'
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
              }`}
              title="Apenas Formulário"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Formulário</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'preview'
                  ? 'bg-[#004a80] text-white shadow-xs'
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
              }`}
              title="Apenas Folha Oficial A4"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visualizar A4</span>
            </button>

            <button
              onClick={() => setViewMode('split')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 font-semibold rounded-md transition cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-[#004a80] text-white shadow-xs'
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
              }`}
              title="Lado a Lado: Formulário + Documento em Tempo Real"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Dividido</span>
            </button>
          </div>

          {/* Botões de Ação do Topo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsServentiaModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition border border-white/10 cursor-pointer"
              title="Configurar serventia padrão do cartório"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Serventia</span>
            </button>

            <button
              onClick={handleImprimir}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-xs transition cursor-pointer active:scale-95"
              title="Imprimir ou Salvar como PDF no navegador"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6">
        {viewMode === 'form' && (
          <div className="max-w-3xl mx-auto">
            <InteractiveForm
              form={form}
              onChange={handleFormChange}
              onReset={handleResetForm}
              onPreencherExemplo={handlePreencherExemplo}
              onConfigurarServentia={() => setIsServentiaModalOpen(true)}
              onImprimir={handleImprimir}
            />
          </div>
        )}

        {viewMode === 'preview' && (
          <div className="flex flex-col items-center">
            <div className="no-print bg-white border border-slate-200 rounded-xl p-3 mb-6 shadow-xs max-w-2xl w-full flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Visualização do documento oficial (2 páginas A4)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleImprimir}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#004a80] hover:bg-[#003660] rounded-lg cursor-pointer transition active:scale-95"
                  title="Imprimir ou Salvar como PDF"
                >
                  <Printer className="w-3.5 h-3.5" /> Imprimir / Salvar PDF
                </button>
              </div>
            </div>

            <DocumentPreview form={form} documentRef={documentPrintRef} />
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lado Esquerdo: Formulário */}
            <div className="lg:col-span-6 xl:col-span-6 overflow-y-auto pr-1">
              <InteractiveForm
                form={form}
                onChange={handleFormChange}
                onReset={handleResetForm}
                onPreencherExemplo={handlePreencherExemplo}
                onConfigurarServentia={() => setIsServentiaModalOpen(true)}
                onImprimir={handleImprimir}
              />
            </div>

            {/* Lado Direito: Preview da Folha Oficial em Tempo Real */}
            <div className="lg:col-span-6 xl:col-span-6 sticky top-20 flex flex-col items-center">
              <div className="no-print bg-white/90 backdrop-blur-xs border border-slate-200 rounded-xl p-2.5 mb-3 shadow-xs w-full flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#004a80]">
                  <Eye className="w-4 h-4" />
                  <span>Visualização Oficial em Tempo Real</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleImprimir}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#004a80] hover:bg-[#003660] rounded-md transition cursor-pointer active:scale-95"
                    title="Imprimir ou Salvar como PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir / Salvar PDF</span>
                  </button>
                </div>
              </div>

              {/* Documento Escalonado para o Painel Lateral */}
              <div className="w-full overflow-y-auto max-h-[calc(100vh-140px)] border border-slate-300 rounded-xl bg-slate-200 p-4 shadow-inner flex justify-center">
                <div className="origin-top transition-transform" style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                  <DocumentPreview form={form} documentRef={documentPrintRef} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Impressão Nativa (Apenas para CSS @media print quando acionado pelo browser) */}
      <div className="hidden print:block print:w-full print:m-0 print:p-0">
        <DocumentPreview form={form} idPrefix="print-native" />
      </div>

      {/* Modais */}
      <ServentiaModal
        isOpen={isServentiaModalOpen}
        onClose={() => setIsServentiaModalOpen(false)}
        serventiaAtual={serventiaPadrao}
        onSalvar={handleSalvarServentia}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
export default App;
