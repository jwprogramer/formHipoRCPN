import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Edit3, 
  FileCheck,
  Copy,
  Check
} from 'lucide-react';
import { FormularioHipossuficiencia } from '../types';
import { DocumentPreview } from './DocumentPreview';

interface ConferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: FormularioHipossuficiencia;
  onImprimir: () => void;
  onBaixarPDF: () => void;
  erros: string[];
}

export const ConferenceModal: React.FC<ConferenceModalProps> = ({
  isOpen,
  onClose,
  form,
  onImprimir,
  onBaixarPDF,
  erros,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [zoomScale, setZoomScale] = useState<number>(0.7);

  if (!isOpen) return null;

  const handleCopiarResumo = () => {
    const atosSelecionados: string[] = [];
    if (form.atoCertidao) {
      const tipos: string[] = [];
      if (form.certidaoTipos.semBusca) tipos.push('Sem busca');
      if (form.certidaoTipos.comBusca) tipos.push('Com busca');
      if (form.certidaoTipos.inteiroTeor) tipos.push('Inteiro teor');
      atosSelecionados.push(`Certidão (${tipos.join(', ') || 'Tipo padrão'})`);
    }
    if (form.atoHabilitacaoCasamento) atosSelecionados.push('Habilitação/Casamento e 1ª certidão');
    if (form.atoAlteracaoPrenomeGenero) atosSelecionados.push('Alteração de prenome e gênero');
    if (form.atoOutro) atosSelecionados.push(`Outro: ${form.descricaoOutroAto}`);

    const resumo = `DECLARAÇÃO DE HIPOSSUFICIÊNCIA ECONÔMICA (TJRN / RCPN)
Beneficiário: ${form.beneficiarioNome}
Documento: ${form.beneficiarioDocumento}
Data Nasc: ${form.beneficiarioDataNascimento || 'Não informada'}
Endereço: ${form.beneficiarioEndereco}, ${form.beneficiarioMunicipioUF} - CEP ${form.beneficiarioCep || 'N/I'}
Contato: ${form.beneficiarioContato || 'N/I'}
Serventia: ${form.serventia || 'N/I'} - ${form.municipioComarca || 'N/I'}
Ato(s): ${atosSelecionados.join('; ')}
Local e Data: ${form.localData}
Assinatura: ${form.tipoAssinaturaBeneficiario === 'digital' ? 'Assinada digitalmente em tela' : 'Pendente de assinatura física'}`;

    navigator.clipboard.writeText(resumo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  const temErros = erros.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/85 backdrop-blur-xs overflow-hidden">
      {/* Barra Superior do Modal */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#004a80] text-white flex items-center justify-center font-bold">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Conferência e Emissão da Declaração
            </h2>
            <p className="text-[11px] text-slate-500">
              {temErros ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Atenção: existem campos obrigatórios pendentes
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Todos os campos obrigatórios validados com sucesso
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Controles de Ação */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-lg p-1 text-xs text-slate-600 mr-2">
            <button
              onClick={() => setZoomScale((prev) => Math.max(0.4, prev - 0.1))}
              className="px-2 py-1 font-bold hover:bg-white rounded transition"
              title="Diminuir Zoom"
            >
              -
            </button>
            <span className="px-2 font-mono text-[11px]">{Math.round(zoomScale * 100)}%</span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(1.0, prev + 0.1))}
              className="px-2 py-1 font-bold hover:bg-white rounded transition"
              title="Aumentar Zoom"
            >
              +
            </button>
          </div>

          <button
            onClick={handleCopiarResumo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            title="Copiar dados da declaração"
          >
            {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiado ? 'Copiado!' : 'Copiar Resumo'}</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar Dados</span>
          </button>

          <button
            onClick={onImprimir}
            disabled={temErros}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm transition ${
              temErros
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-[#004a80] hover:bg-[#003660] cursor-pointer'
            }`}
            title="Imprimir as 2 páginas A4"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={onBaixarPDF}
            disabled={temErros}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm transition ${
              temErros
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-800 cursor-pointer'
            }`}
            title="Gerar e salvar arquivo PDF no dispositivo"
          >
            <Download className="w-4 h-4" />
            <span>Baixar PDF</span>
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 ml-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Conteúdo Principal: Erros ou Documento */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
        {temErros && (
          <div className="w-full max-w-2xl bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6 shadow-md">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-red-900 text-sm">
                  Existem pendências antes de imprimir ou salvar o documento:
                </h4>
                <ul className="list-disc list-inside text-xs text-red-700 space-y-1 mt-1">
                  {erros.map((erro, i) => (
                    <li key={i}>{erro}</li>
                  ))}
                </ul>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-800 hover:text-red-900 underline"
                  >
                    Voltar ao formulário para corrigir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visualizador Escalonado da Folha A4 */}
        <div 
          className="transition-transform duration-200 origin-top"
          style={{ transform: `scale(${zoomScale})` }}
        >
          <DocumentPreview form={form} />
        </div>
      </div>
    </div>
  );
};
