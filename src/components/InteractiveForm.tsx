import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Download,
  Printer, 
  MapPin, 
  Phone, 
  Calendar, 
  PenTool, 
  Search, 
  ShieldCheck, 
  Users, 
  HelpCircle,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldAlert
} from 'lucide-react';
import { FormularioHipossuficiencia } from '../types';
import { maskCPF, maskCEP, maskPhone, maskDate, consultarCep, isValidCPF, getDataAtualFormatada } from '../utils/masks';
import { SignaturePad } from './SignaturePad';

interface InteractiveFormProps {
  form: FormularioHipossuficiencia;
  onChange: (updated: Partial<FormularioHipossuficiencia>) => void;
  onReset: () => void;
  onPreencherExemplo: () => void;
  onConfigurarServentia: () => void;
  onBaixarPDF?: () => void;
  onImprimir?: () => void;
  isGeneratingPdf?: boolean;
}

export const InteractiveForm: React.FC<InteractiveFormProps> = ({
  form,
  onChange,
  onReset,
  onPreencherExemplo,
  onConfigurarServentia,
  onBaixarPDF,
  onImprimir,
  isGeneratingPdf,
}) => {
  const [loadingCep, setLoadingCep] = useState(false);
  const [cpfValido, setCpfValido] = useState<boolean | null>(null);

  // Handle CEP lookup
  const handleBuscarCep = async () => {
    if (!form.beneficiarioCep) return;
    setLoadingCep(true);
    const dados = await consultarCep(form.beneficiarioCep);
    setLoadingCep(false);
    if (dados) {
      const enderecoMontado = dados.logradouro ? `${dados.logradouro}${dados.bairro ? `, ${dados.bairro}` : ''}` : form.beneficiarioEndereco;
      const cidadeUF = dados.localidade && dados.uf ? `${dados.localidade}/${dados.uf}` : form.beneficiarioMunicipioUF;
      onChange({
        beneficiarioEndereco: enderecoMontado,
        beneficiarioMunicipioUF: cidadeUF,
      });
    }
  };

  const handleCpfChange = (val: string) => {
    const masked = maskCPF(val);
    onChange({ beneficiarioDocumento: masked });
    const digits = masked.replace(/\D/g, '');
    if (digits.length === 11) {
      setCpfValido(isValidCPF(masked));
    } else {
      setCpfValido(null);
    }
  };

  const handlePreencherDataHoje = () => {
    const dataFormatada = getDataAtualFormatada();
    const cidade = form.municipioComarca ? form.municipioComarca.split('/')[0].trim() : 'Natal';
    const texto = `${cidade}/RN, ${dataFormatada}`;
    onChange({ 
      localData: texto,
      certificacaoLocalData: texto
    });
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Quick Tools */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#004a80] block">
              Registro Civil das Pessoas Naturais · TJRN
            </span>
            <h1 className="text-base font-extrabold text-slate-900 mt-0.5">
              Declaração de Hipossuficiência Econômica
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Preenchimento guiado com validações normativas oficiais (Provimento CGJ/RN 07/2026).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPreencherExemplo}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition border border-blue-200 cursor-pointer"
              title="Preenche campos de exemplo para testar e visualizar"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              Exemplo
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
              title="Limpar formulário atual"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de Privacidade e Segurança (LGPD) - Não Armazenamento de Dados */}
      <div className="bg-amber-50/90 border border-amber-300 border-l-4 border-l-amber-600 p-4 rounded-xl shadow-xs flex items-start gap-3.5">
        <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
        </div>
        <div className="text-xs text-amber-950 leading-relaxed flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-extrabold text-amber-900 uppercase tracking-wide text-xs">
              Aviso de Privacidade e Segurança (LGPD)
            </span>
            <span className="bg-amber-200/90 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-full border border-amber-300">
              Nenhum dado é armazenado
            </span>
          </div>
          <p className="text-slate-700">
            Para sua total tranquilidade e em conformidade com a <strong>LGPD (Lei Geral de Proteção de Dados)</strong>, informamos que <strong>não haverá armazenagem, retenção ou gravação de nenhum dado pessoal</strong> inserido pelo usuário. Todas as informações permanecem estritamente na memória volátil do seu navegador durante o preenchimento e são descartadas assim que a página é fechada ou recarregada. Nenhum dado é enviado a servidores externos.
          </p>
        </div>
      </div>

      {/* SEÇÃO 1: SERVENTIA */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Dados da Serventia
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Preenchimento da Serventia
            </span>
          </div>
          <button
            type="button"
            onClick={onConfigurarServentia}
            className="text-xs font-bold text-[#004a80] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            Configurar Padrão
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome da Serventia / Cartório:
            </label>
            <input
              type="text"
              placeholder="Ex: Cartório de Registro Civil de Pessoas Naturais"
              value={form.serventia}
              onChange={(e) => onChange({ serventia: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Município / Comarca:
            </label>
            <input
              type="text"
              placeholder="Ex: Natal/RN"
              value={form.municipioComarca}
              onChange={(e) => onChange({ municipioComarca: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: DADOS DO BENEFICIÁRIO */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              2
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Dados da Pessoa Beneficiária
            </span>
          </div>
          <span className="text-[11px] text-red-600 font-semibold">* Campos obrigatórios</span>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nome Completo do Beneficiário <span className="text-red-600">*</span>:
            </label>
            <input
              type="text"
              placeholder="Nome completo sem abreviações"
              value={form.beneficiarioNome}
              onChange={(e) => onChange({ beneficiarioNome: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  CPF ou RG <span className="text-red-600">*</span>:
                </label>
                {cpfValido === true && (
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> CPF Válido
                  </span>
                )}
                {cpfValido === false && (
                  <span className="text-[10px] text-red-600 font-semibold flex items-center gap-0.5">
                    <AlertCircle className="w-3 h-3" /> CPF Inválido
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="000.000.000-00 ou RG"
                value={form.beneficiarioDocumento}
                onChange={(e) => handleCpfChange(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Data de Nascimento:
              </label>
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                value={form.beneficiarioDataNascimento}
                onChange={(e) => onChange({ beneficiarioDataNascimento: maskDate(e.target.value) })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Profissão:
              </label>
              <input
                type="text"
                placeholder="Ex: Agricultor(a), Autônomo(a), Do lar"
                value={form.beneficiarioProfissao}
                onChange={(e) => onChange({ beneficiarioProfissao: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>

          {/* Endereço & CEP */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CEP (com busca automática):
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="00000-000"
                  value={form.beneficiarioCep}
                  onChange={(e) => onChange({ beneficiarioCep: maskCEP(e.target.value) })}
                  onBlur={handleBuscarCep}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
                <button
                  type="button"
                  onClick={handleBuscarCep}
                  disabled={loadingCep}
                  className="px-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer"
                  title="Buscar endereço pelo CEP"
                >
                  {loadingCep ? '...' : <Search className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="md:col-span-8">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Endereço Residencial <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                placeholder="Rua, número, bairro, complemento"
                value={form.beneficiarioEndereco}
                onChange={(e) => onChange({ beneficiarioEndereco: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Município/UF <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                placeholder="Ex: Natal/RN"
                value={form.beneficiarioMunicipioUF}
                onChange={(e) => onChange({ beneficiarioMunicipioUF: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Telefone ou E-mail:
              </label>
              <input
                type="text"
                placeholder="(84) 99999-9999 ou email@exemplo.com"
                value={form.beneficiarioContato}
                onChange={(e) => {
                  const val = e.target.value;
                  // If starts like a phone, apply phone mask
                  if (/^[\d() -]+$/.test(val) && val.length <= 15) {
                    onChange({ beneficiarioContato: maskPhone(val) });
                  } else {
                    onChange({ beneficiarioContato: val });
                  }
                }}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: QUAL ATO PRECISA SER GRATUITO */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              3
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Qual ato precisa ser gratuito? <span className="text-red-600">*</span>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">Selecione pelo menos um ato</span>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-3">
            {/* Certidão */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.atoCertidao}
                  onChange={(e) => onChange({ atoCertidao: e.target.checked })}
                  className="mt-0.5 rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Certidão de nascimento, casamento, óbito ou outra
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Emissão de 2ª via ou certidões para fins legais.
                  </span>
                </div>
              </label>

              {form.atoCertidao && (
                <div className="mt-3 ml-7 pt-2.5 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs">
                  <span className="font-bold text-[#004a80] text-[11px] uppercase tracking-wider">
                    Tipo desejado:
                  </span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.certidaoTipos.semBusca}
                      onChange={(e) =>
                        onChange({
                          certidaoTipos: { ...form.certidaoTipos, semBusca: e.target.checked },
                        })
                      }
                      className="rounded text-blue-800 w-3.5 h-3.5"
                    />
                    Sem busca
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.certidaoTipos.comBusca}
                      onChange={(e) =>
                        onChange({
                          certidaoTipos: { ...form.certidaoTipos, comBusca: e.target.checked },
                        })
                      }
                      className="rounded text-blue-800 w-3.5 h-3.5"
                    />
                    Com busca
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.certidaoTipos.inteiroTeor}
                      onChange={(e) =>
                        onChange({
                          certidaoTipos: { ...form.certidaoTipos, inteiroTeor: e.target.checked },
                        })
                      }
                      className="rounded text-blue-800 w-3.5 h-3.5"
                    />
                    Inteiro teor
                  </label>
                </div>
              )}
            </div>

            {/* Habilitação Casamento */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.atoHabilitacaoCasamento}
                  onChange={(e) => onChange({ atoHabilitacaoCasamento: e.target.checked })}
                  className="mt-0.5 rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Habilitação, registro de casamento e primeira certidão
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Gratuidade assegurada pelo Código Civil e Lei 6.015/73.
                  </span>
                </div>
              </label>
            </div>

            {/* Alteração Prenome e Gênero */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.atoAlteracaoPrenomeGenero}
                  onChange={(e) => onChange({ atoAlteracaoPrenomeGenero: e.target.checked })}
                  className="mt-0.5 rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Alteração extrajudicial de prenome e gênero (Retificação e Averbação), inclusive certidões correspondentes
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Provimento CNJ n. 73/2018 e regulamentações do TJRN.
                  </span>
                </div>
              </label>
            </div>

            {/* Outro Ato */}
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.atoOutro}
                  onChange={(e) => onChange({ atoOutro: e.target.checked })}
                  className="mt-0.5 rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Outro ato com previsão legal
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Averbações, reconhecimentos voluntários de paternidade/maternidade, etc.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Descreva o ato e a finalidade (se necessário) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Descreva o ato e a finalidade (se necessário):
            </label>
            <input
              type="text"
              placeholder="Ex: Segunda via de certidão para instrução de processo de RG / Casamento civil comunitário"
              value={form.descricaoOutroAto}
              onChange={(e) => onChange({ descricaoOutroAto: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <span className="text-[10.5px] text-slate-500 block">
              Preenchimento facultativo. Indique detalhes adicionais sobre o ato e para que finalidade a gratuidade é solicitada.
            </span>
          </div>

          {/* Dados para Localizar o Registro */}
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-3">
            <span className="text-xs font-bold text-[#004a80] block mb-2">
              Dados para localizar o ato (se souber os dados do livro/folha/termo):
            </span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Livro:</label>
                <input
                  type="text"
                  placeholder="Ex: A-12"
                  value={form.livro}
                  onChange={(e) => onChange({ livro: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Folha:</label>
                <input
                  type="text"
                  placeholder="Ex: 45V"
                  value={form.folha}
                  onChange={(e) => onChange({ folha: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Termo:</label>
                <input
                  type="text"
                  placeholder="Ex: 12345"
                  value={form.termo}
                  onChange={(e) => onChange({ termo: e.target.value })}
                  className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 4 & 5: DECLARAÇÃO & ASSINATURA DA PESSOA INTERESSADA */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              4 e 5
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Declaração, Local, Data e Assinatura
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
            <p className="font-bold text-slate-900 mb-1">
              "Declaro, sob as penas da lei, que não disponho de recursos suficientes para suportar os emolumentos do ato indicado sem prejuízo de minha manutenção e da manutenção de minha família..."
            </p>
            <p className="text-[10px] text-slate-500">
              Advertência: A declaração falsa sujeita a pessoa signatária a sanções cíveis, criminais e cobrança extrajudicial dos emolumentos devidos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Local e Data <span className="text-red-600">*</span>:
                </label>
                <button
                  type="button"
                  onClick={handlePreencherDataHoje}
                  className="text-[11px] font-semibold text-blue-800 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3 h-3" /> Inserir Hoje
                </button>
              </div>
              <input
                type="text"
                placeholder="Ex: Natal/RN, 25 de setembro de 2026"
                value={form.localData}
                onChange={(e) => onChange({ localData: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Forma de Assinatura:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ tipoAssinaturaBeneficiario: 'manual' })}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                    form.tipoAssinaturaBeneficiario === 'manual'
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Assinar no Papel (após imprimir)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ tipoAssinaturaBeneficiario: 'digital' })}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                    form.tipoAssinaturaBeneficiario === 'digital'
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Assinar na Tela (Digital)
                </button>
              </div>
            </div>
          </div>

          {form.tipoAssinaturaBeneficiario === 'digital' && (
            <div className="pt-2">
              <SignaturePad
                label="Assinatura da pessoa interessada"
                value={form.assinaturaBeneficiarioDataUrl}
                onChange={(url) => onChange({ assinaturaBeneficiarioDataUrl: url })}
              />
            </div>
          )}
        </div>
      </div>

      {/* SEÇÃO 6: REPRESENTANTE LEGAL (OPCIONAL) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              6
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Representante Legal ou Assistente
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.temRepresentante}
              onChange={(e) => onChange({ temRepresentante: e.target.checked })}
              className="rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700">Possui Representante?</span>
          </label>
        </div>

        {form.temRepresentante ? (
          <div className="p-4 space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome Completo do Representante:
              </label>
              <input
                type="text"
                placeholder="Nome do responsável legal, tutor ou curador"
                value={form.representanteNome}
                onChange={(e) => onChange({ representanteNome: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CPF ou RG:
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00 ou RG"
                  value={form.representanteDocumento}
                  onChange={(e) => onChange({ representanteDocumento: maskCPF(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefone ou E-mail:
                </label>
                <input
                  type="text"
                  placeholder="(84) 99999-9999 ou email"
                  value={form.representanteContato}
                  onChange={(e) => onChange({ representanteContato: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Qualidade em que atua:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Responsável legal, Tutor, Curador, Assistente"
                  value={form.representanteQualidade}
                  onChange={(e) => onChange({ representanteQualidade: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Documento comprobatório:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Termo de Guarda / Tutela n. 123/2025"
                  value={form.representanteDocumentoComprobatorio}
                  onChange={(e) => onChange({ representanteDocumentoComprobatorio: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Assinatura do Representante:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ tipoAssinaturaRepresentante: 'manual' })}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded transition cursor-pointer ${
                      form.tipoAssinaturaRepresentante === 'manual'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    No Papel
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ tipoAssinaturaRepresentante: 'digital' })}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded transition cursor-pointer ${
                      form.tipoAssinaturaRepresentante === 'digital'
                        ? 'bg-blue-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Na Tela
                  </button>
                </div>
              </div>
              {form.tipoAssinaturaRepresentante === 'digital' && (
                <SignaturePad
                  label="Assinatura do Representante Legal"
                  value={form.assinaturaRepresentanteDataUrl}
                  onChange={(url) => onChange({ assinaturaRepresentanteDataUrl: url })}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 text-xs text-slate-500 italic">
            Não aplicável ou preenchimento dispensado para pessoa maior e capaz assinando por si.
          </div>
        )}
      </div>

      {/* SEÇÃO 7 & 8: ASSINATURA A ROGO & TESTEMUNHAS */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              7 e 8
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Assinatura a Rogo e Testemunhas
            </span>
            <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
              Se não puder/souber assinar
            </span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.temAssinaturaRogo}
              onChange={(e) => onChange({ temAssinaturaRogo: e.target.checked })}
              className="rounded text-blue-800 focus:ring-blue-800 w-4 h-4 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700">Houve Assinatura a Rogo?</span>
          </label>
        </div>

        {form.temAssinaturaRogo ? (
          <div className="p-4 space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-600 italic">
              "A pedido da pessoa beneficiária, assino a presente declaração a rogo." (Exige 2 testemunhas instrumentárias).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nome de quem assina a rogo:
              </label>
              <input
                type="text"
                placeholder="Nome da pessoa que assina pelo beneficiário"
                value={form.rogoNome}
                onChange={(e) => onChange({ rogoNome: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CPF ou RG de quem assina a rogo:
                </label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={form.rogoDocumento}
                  onChange={(e) => onChange({ rogoDocumento: maskCPF(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Telefone ou E-mail:
                </label>
                <input
                  type="text"
                  placeholder="(84) 99999-9999"
                  value={form.rogoContato}
                  onChange={(e) => onChange({ rogoContato: e.target.value })}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
            </div>

            {/* Testemunhas */}
            <div className="pt-2">
              <span className="text-xs font-bold text-[#004a80] block mb-2">
                Testemunhas da Assinatura a Rogo (Seção 8):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">TESTEMUNHA 1</span>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={form.testemunha1Nome}
                    onChange={(e) => onChange({ testemunha1Nome: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="CPF ou RG"
                    value={form.testemunha1Documento}
                    onChange={(e) => onChange({ testemunha1Documento: maskCPF(e.target.value) })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Telefone/e-mail"
                    value={form.testemunha1Contato}
                    onChange={(e) => onChange({ testemunha1Contato: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">TESTEMUNHA 2</span>
                  <input
                    type="text"
                    placeholder="Nome completo"
                    value={form.testemunha2Nome}
                    onChange={(e) => onChange({ testemunha2Nome: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="CPF ou RG"
                    value={form.testemunha2Documento}
                    onChange={(e) => onChange({ testemunha2Documento: maskCPF(e.target.value) })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Telefone/e-mail"
                    value={form.testemunha2Contato}
                    onChange={(e) => onChange({ testemunha2Contato: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 text-xs text-slate-500 italic">
            Assinatura a rogo desmarcada. A pessoa beneficiária assinará por si mesma.
          </div>
        )}
      </div>

      {/* SEÇÃO 9: CERTIFICAÇÃO DA PRESENÇA PELA SERVENTIA */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#004a80] text-white flex items-center justify-center text-xs font-bold">
              9
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Certificação da Presença (Serventia)
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            Fé Pública Cartorial
          </span>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-600 leading-snug">
            "Certifico e dou fé que as assinaturas e/ou a impressão digital foram apostas em minha presença, após a identificação das pessoas signatárias, ficando concedida a gratuidade para a prática do ato solicitado."
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Local e Data da Certificação:
              </label>
              <input
                type="text"
                placeholder="Ex: Natal/RN, 25 de setembro de 2026"
                value={form.certificacaoLocalData}
                onChange={(e) => onChange({ certificacaoLocalData: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Oficial ou Preposto:
              </label>
              <input
                type="text"
                placeholder="Nome e cargo (ex: Escrevente Autorizado)"
                value={form.certificacaoOficialPreposto}
                onChange={(e) => onChange({ certificacaoOficialPreposto: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </div>

          {/* Assinatura e Identificação Funcional */}
          <div className="border-t border-slate-200 pt-3 mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">
                Assinatura e Identificação Funcional:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ tipoAssinaturaOficial: 'manual' })}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded transition cursor-pointer ${
                    form.tipoAssinaturaOficial !== 'digital'
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Assinar no Papel (Carimbo)
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ tipoAssinaturaOficial: 'digital' })}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded transition cursor-pointer ${
                    form.tipoAssinaturaOficial === 'digital'
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Assinar na Tela
                </button>
              </div>
            </div>

            {form.tipoAssinaturaOficial === 'digital' ? (
              <SignaturePad
                label="Assinatura e Identificação Funcional do Oficial/Preposto"
                value={form.assinaturaOficialDataUrl}
                onChange={(url) => onChange({ assinaturaOficialDataUrl: url })}
              />
            ) : (
              <p className="text-[11px] text-slate-500 italic">
                O documento físico contém espaçamento amplo reservado para assinatura e carimbo funcional da serventia.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Barra de Ação Flutuante */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-6 shadow-2xl z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-800">Privacidade Garantida:</span>
            <span>Nenhum dado pessoal do usuário é armazenado</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onImprimir && (
              <button
                type="button"
                onClick={onImprimir}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-2.5 px-5 rounded-xl border border-slate-300 transition cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Imprimir
              </button>
            )}
            {onBaixarPDF && (
              <button
                type="button"
                onClick={onBaixarPDF}
                disabled={isGeneratingPdf}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#004a80] hover:bg-[#003660] text-white font-extrabold text-sm py-2.5 px-6 rounded-xl shadow-md transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
