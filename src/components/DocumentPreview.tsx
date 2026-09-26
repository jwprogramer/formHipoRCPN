import React from 'react';
import { FormularioHipossuficiencia } from '../types';
import { LOGO_TJRN_BASE64, LOGO_CGJ_BASE64 } from '../utils/assets';

interface DocumentPreviewProps {
  form: FormularioHipossuficiencia;
  documentRef?: React.RefObject<HTMLDivElement | null>;
  idPrefix?: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ form, documentRef, idPrefix }) => {
  const page1Id = idPrefix ? `${idPrefix}-page-1` : 'official-page-1';
  const page2Id = idPrefix ? `${idPrefix}-page-2` : 'official-page-2';

  return (
    <div ref={documentRef} id={idPrefix ? `${idPrefix}-wrapper` : 'official-doc-print-area'} className="official-document-wrapper text-[#1e293b]">
      {/* ============================================================== */}
      {/* PÁGINA 1 DE 2                                                  */}
      {/* ============================================================== */}
      <div id={page1Id} className="a4-page page-1 shadow-lg bg-white relative">
        {/* Cabeçalho Oficial */}
        <div className="header-line flex justify-between items-center pb-2 mb-2 border-b-2 border-[#004a80]">
          <div className="flex items-center">
            <img 
              src={LOGO_TJRN_BASE64} 
              alt="Tribunal de Justiça do Rio Grande do Norte" 
              className="h-[68px] object-contain"
            />
          </div>
          <div className="flex items-center">
            <img 
              src={LOGO_CGJ_BASE64} 
              alt="Corregedoria Geral de Justiça do RN" 
              className="h-[52px] object-contain"
            />
          </div>
        </div>

        {/* Título Oficial */}
        <div className="text-center mt-1">
          <div className="font-bold text-[#374151] text-[11px] tracking-widest uppercase">
            Registro Civil das Pessoas Naturais
          </div>
          <div className="text-[#004a80] font-black text-xl leading-tight mt-0.5 tracking-tight">
            DECLARAÇÃO DE HIPOSSUFICIÊNCIA ECONÔMICA
          </div>
        </div>

        {/* Box Informativo */}
        <div className="info-blue-box bg-[#f0f7ff] rounded-md p-2 flex gap-2.5 my-2 border-l-4 border-[#004a80] text-[9.5px] leading-snug text-[#1e293b]">
          <div className="text-xl leading-none select-none">📝</div>
          <div>
            <b className="text-[#004a80]">ANTES DE PREENCHER:</b> Use este formulário somente quando a gratuidade depender da insuficiência de recursos. Não é exigido para atos gratuitos independentemente de renda nem para atos abrangidos por decisão judicial. Preencha um formulário para cada pessoa beneficiária.
          </div>
        </div>

        {/* SEÇÃO 1: DADOS DA SERVENTIA */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-1 mb-1.5 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            1
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Dados da Serventia
          </div>
          <div className="badge badge-serventia bg-[#e8f5e9] text-[#2e7d32] text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
            Preenchimento da Serventia
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Serventia:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.serventia || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1.5 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Município/Comarca:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.municipioComarca || ''}
            </span>
          </div>
        </div>

        {/* SEÇÃO 2: DADOS DA PESSOA BENEFICIÁRIA */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-1 mb-1.5 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            2
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Dados da pessoa beneficiária
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Nome completo *:</span>
            <span className="input-line border-b border-black text-[10.5px] font-semibold flex-grow px-1 min-h-[18px]">
              {form.beneficiarioNome || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-7 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">CPF ou RG *:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioDocumento || ''}
            </span>
          </div>
          <div className="col-span-5 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Data de nascimento:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioDataNascimento || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Profissão:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioProfissao || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Endereço *:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioEndereco || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-8 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Município/UF *:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioMunicipioUF || ''}
            </span>
          </div>
          <div className="col-span-4 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">CEP:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioCep || ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1.5 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Telefone ou e-mail:</span>
            <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[18px]">
              {form.beneficiarioContato || ''}
            </span>
          </div>
        </div>

        {/* SEÇÃO 3: QUAL ATO PRECISA SER GRATUITO */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-1 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            3
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Qual ato precisa ser gratuito?
          </div>
        </div>
        <div className="text-[9.5px] text-[#475569] px-1 mb-1 font-medium">
          Marque o ato solicitado. Se for certidão, marque também o tipo desejado.
        </div>

        <div className="grid grid-cols-12 gap-2 px-1 mb-1">
          <div className="col-span-8 space-y-1.5 text-[9.5px] leading-tight">
            <div className="flex items-start gap-1.5">
              <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold leading-none select-none shrink-0 ${form.atoCertidao ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                {form.atoCertidao ? 'X' : ''}
              </span>
              <span className="font-bold text-[#0f172a]">Certidão de nascimento, casamento, óbito ou outra</span>
            </div>
            
            <div className="flex items-center gap-3 ml-5 font-bold text-[#004a80] uppercase text-[8.5px]">
              <span>Tipo da certidão:</span>
              <label className="font-normal text-black flex items-center gap-1 select-none">
                <span className={`w-3 h-3 border border-black flex items-center justify-center text-[9px] font-bold ${form.certidaoTipos.semBusca ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                  {form.certidaoTipos.semBusca ? 'X' : ''}
                </span>
                Sem busca
              </label>
              <label className="font-normal text-black flex items-center gap-1 select-none">
                <span className={`w-3 h-3 border border-black flex items-center justify-center text-[9px] font-bold ${form.certidaoTipos.comBusca ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                  {form.certidaoTipos.comBusca ? 'X' : ''}
                </span>
                Com busca
              </label>
              <label className="font-normal text-black flex items-center gap-1 select-none">
                <span className={`w-3 h-3 border border-black flex items-center justify-center text-[9px] font-bold ${form.certidaoTipos.inteiroTeor ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                  {form.certidaoTipos.inteiroTeor ? 'X' : ''}
                </span>
                Inteiro teor
              </label>
            </div>

            <div className="flex items-start gap-1.5">
              <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold leading-none select-none shrink-0 ${form.atoHabilitacaoCasamento ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                {form.atoHabilitacaoCasamento ? 'X' : ''}
              </span>
              <span className="font-bold text-[#0f172a]">Habilitação, registro de casamento e primeira certidão</span>
            </div>

            <div className="flex items-start gap-1.5">
              <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold leading-none select-none shrink-0 ${form.atoAlteracaoPrenomeGenero ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                {form.atoAlteracaoPrenomeGenero ? 'X' : ''}
              </span>
              <span className="font-bold text-[#0f172a] leading-snug">
                Alteração extrajudicial de prenome e gênero (Retificação e Averbação), inclusive certidões correspondentes
              </span>
            </div>

            <div className="flex items-start gap-1.5">
              <span className={`w-3.5 h-3.5 border border-black flex items-center justify-center text-[10px] font-bold leading-none select-none shrink-0 ${form.atoOutro ? 'bg-[#0f172a] text-white' : 'bg-white'}`}>
                {form.atoOutro ? 'X' : ''}
              </span>
              <span className="font-bold text-[#0f172a]">Outro ato com previsão legal</span>
            </div>
          </div>

          {/* Dados para localizar o ato */}
          <div className="col-span-4 border border-[#cbd5e1] p-2 rounded text-[9.5px] bg-[#fafafa]">
            <p className="font-bold text-[#004a80] mb-1.5">Dados para localizar o ato (se souber):</p>
            <div className="flex items-baseline mb-1">
              <span className="font-medium mr-1">Livro:</span>
              <span className="border-b border-black flex-grow min-h-[16px] px-1 text-center font-semibold">
                {form.livro || ''}
              </span>
            </div>
            <div className="flex items-baseline mb-1">
              <span className="font-medium mr-1">Folha:</span>
              <span className="border-b border-black flex-grow min-h-[16px] px-1 text-center font-semibold">
                {form.folha || ''}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="font-medium mr-1">Termo:</span>
              <span className="border-b border-black flex-grow min-h-[16px] px-1 text-center font-semibold">
                {form.termo || ''}
              </span>
            </div>
          </div>
        </div>

        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">
              Descreva o ato e a finalidade (se necessário):
            </span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[18px]">
              {form.descricaoOutroAto || ''}
            </span>
          </div>
        </div>

        {/* SEÇÃO 4: DECLARAÇÃO */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-2 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            4
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Declaração
          </div>
        </div>
        <div className="text-[9.5px] text-justify px-1 space-y-1 text-[#1e293b] leading-relaxed font-normal">
          <p className="font-bold">
            Declaro, sob as penas da lei, que não disponho de recursos suficientes para suportar os emolumentos do ato indicado sem prejuízo de minha manutenção e da manutenção de minha família.
          </p>
          <p className="font-bold">Declaro, ainda, que estou ciente de que:</p>
          <p>
            <b>a)</b> havendo fundadas razões para dúvida quanto à veracidade desta declaração, o registrador poderá suscitar a questão ao juízo competente, inclusive para eventual substituição da gratuidade pelo parcelamento;
          </p>
          <p>
            <b>b)</b> mesmo nessa hipótese, o ato será praticado de imediato, independentemente de prévia decisão sobre a gratuidade;
          </p>
          <p>
            <b>c)</b> se o benefício for posteriormente indeferido, poderão ser adotadas medidas extrajudiciais para cobrança dos emolumentos devidos;
          </p>
          <p>
            <b>d)</b> a prestação de informação falsa poderá gerar responsabilidade civil e criminal;
          </p>
          <p>
            <b>e)</b> salvo previsão legal em sentido diverso, a gratuidade não abrange serviços postais, remessas de documentos, diligências ou notificações.
          </p>
        </div>

        {/* Rodapé Página 1 */}
        <div className="footer-text mt-auto pt-2 border-t border-[#cbd5e1] flex justify-between items-center text-[9px] text-[#475569]">
          <span>Edição disponibilizada em 08/09/2026</span>
          <span className="font-mono text-[#94a3b8]">000086910</span>
          <span className="font-bold text-[#004a80]">Página 1 de 2</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PÁGINA 2 DE 2                                                  */}
      {/* ============================================================== */}
      <div id={page2Id} className="a4-page page-2 shadow-lg bg-white relative page-break-before">
        {/* Cabeçalho Página 2 */}
        <div className="header-line flex justify-between items-center pb-2 mb-2 border-b-2 border-[#004a80]">
          <div className="text-[#004a80] font-black text-xl uppercase italic tracking-tight">
            Assinaturas e Complementos
          </div>
          <div className="text-[9px] text-[#64748b] font-medium">
            TJRN - Registro Civil das Pessoas Naturais
          </div>
        </div>
        <div className="text-[9px] text-[#4b5563] mb-2 font-medium">
          Preencha os blocos complementares somente quando se aplicarem ao caso.
        </div>

        {/* SEÇÃO 5: LOCAL, DATA E ASSINATURA */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-1 mb-2 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            5
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Local, data e assinatura da pessoa interessada
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8 px-2 mt-2 mb-3">
          <div className="flex flex-col justify-end">
            <div className="flex items-baseline">
              <span className="field-label text-[10.5px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Local e data *:</span>
              <span className="input-line border-b border-black text-[10.5px] font-medium flex-grow px-1 min-h-[20px]">
                {form.localData || ''}
              </span>
            </div>
          </div>
          <div className="signature-box flex flex-col items-center justify-end">
            {form.tipoAssinaturaBeneficiario === 'digital' && form.assinaturaBeneficiarioDataUrl ? (
              <img 
                src={form.assinaturaBeneficiarioDataUrl} 
                alt="Assinatura da pessoa interessada" 
                className="max-h-12 max-w-[200px] object-contain mb-1"
              />
            ) : (
              <div className="h-10"></div>
            )}
            <div className="w-full border-t border-black text-center text-[10px] pt-1 font-medium text-[#0f172a]">
              Assinatura da pessoa interessada
            </div>
          </div>
        </div>

        {/* Box LGPD */}
        <div className="info-blue-box bg-[#f0f7ff] rounded-md p-2 flex items-center gap-2.5 my-2 border-l-4 border-[#004a80]">
          <div className="text-xl leading-none select-none">🔒</div>
          <div className="text-[9px] text-[#004a80] italic leading-tight">
            <b>Proteção de dados:</b> as informações serão tratadas apenas para processamento do pedido, cumprimento de obrigação legal e eventual comunicação, com acesso restrito.
          </div>
        </div>

        {/* SEÇÃO 6: REPRESENTANTE LEGAL OU ASSISTENTE */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-2 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            6
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Representante legal ou assistente
          </div>
          <div className="badge badge-serventia bg-[#e8f5e9] text-[#2e7d32] text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
            Somente se houver
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Nome completo:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temRepresentante ? form.representanteNome : ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">CPF ou RG:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temRepresentante ? form.representanteDocumento : ''}
            </span>
          </div>
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Telefone/e-mail:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temRepresentante ? form.representanteContato : ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">
              Qualidade em que atua (Ex.: responsável legal, tutor, curador ou assistente):
            </span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temRepresentante ? form.representanteQualidade : ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Documento comprobatório:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temRepresentante ? form.representanteDocumentoComprobatorio : ''}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2 px-1">
          <div className="text-[8px] italic w-1/2 text-[#334155] leading-snug">
            Declaro que atuo em nome ou em assistência da pessoa beneficiária e que as informações econômicas prestadas se referem à situação dessa pessoa.
          </div>
          <div className="signature-box w-2/5 flex flex-col items-center">
            {form.temRepresentante && form.tipoAssinaturaRepresentante === 'digital' && form.assinaturaRepresentanteDataUrl ? (
              <img 
                src={form.assinaturaRepresentanteDataUrl} 
                alt="Assinatura do representante" 
                className="max-h-10 max-w-[180px] object-contain mb-1"
              />
            ) : (
              <div className="h-8"></div>
            )}
            <div className="w-full border-t border-black text-center text-[9px] pt-1 font-medium text-[#0f172a]">
              Assinatura do representante legal ou assistente
            </div>
          </div>
        </div>

        {/* SEÇÃO 7: ASSINATURA A ROGO */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-2 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            7
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Assinatura a rogo
          </div>
          <div className="badge badge-rogo bg-[#fff3e0] text-[#ef6c00] text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
            Se não souber ou não puder assinar
          </div>
        </div>
        <div className="text-[9px] px-1 text-[#334155] font-medium">
          A pedido da pessoa beneficiária, assino a presente declaração a rogo.
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mt-1 mb-1 px-1">
          <div className="col-span-12 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Nome de quem assina a rogo:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temAssinaturaRogo ? form.rogoNome : ''}
            </span>
          </div>
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mb-1 px-1">
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">CPF ou RG:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temAssinaturaRogo ? form.rogoDocumento : ''}
            </span>
          </div>
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Telefone/e-mail:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.temAssinaturaRogo ? form.rogoContato : ''}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end px-1 mt-2">
          <div className="signature-box w-2/5 flex flex-col items-center">
            {form.temAssinaturaRogo && form.tipoAssinaturaRogo === 'digital' && form.assinaturaRogoDataUrl ? (
              <img 
                src={form.assinaturaRogoDataUrl} 
                alt="Assinatura a rogo" 
                className="max-h-10 max-w-[180px] object-contain mb-1"
              />
            ) : (
              <div className="h-8"></div>
            )}
            <div className="w-full border-t border-black text-center text-[9px] pt-1 font-medium text-[#0f172a]">
              Assinatura a rogo
            </div>
          </div>
          <div className="thumb-box w-[75px] h-[75px] border border-dashed border-[#475569] rounded text-[7.5px] flex flex-col items-center justify-center text-center p-1 text-[#475569]">
            {form.digitalBeneficiarioDataUrl ? (
              <img src={form.digitalBeneficiarioDataUrl} alt="Digital" className="max-h-full max-w-full object-contain" />
            ) : (
              <span>Impressão digital da pessoa beneficiária (se possível)</span>
            )}
          </div>
        </div>

        {/* SEÇÃO 8: TESTEMUNHAS DA ASSINATURA A ROGO */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-2 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            8
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Testemunhas da assinatura a rogo
          </div>
          <div className="badge badge-rogo bg-[#fff3e0] text-[#ef6c00] text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
            Somente se houver assinatura a rogo
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 px-1 mt-1">
          <div className="border border-[#cbd5e1] p-1.5 rounded text-[9px] bg-[#fafafa]">
            <b className="text-[#004a80] block mb-1">TESTEMUNHA 1</b>
            <div className="flex items-baseline mb-0.5">
              <span className="font-semibold mr-1">Nome:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha1Nome : ''}
              </span>
            </div>
            <div className="flex items-baseline mb-0.5">
              <span className="font-semibold mr-1">CPF/RG:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha1Documento : ''}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold mr-1">Telefone/e-mail:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha1Contato : ''}
              </span>
            </div>
          </div>
          <div className="border border-[#cbd5e1] p-1.5 rounded text-[9px] bg-[#fafafa]">
            <b className="text-[#004a80] block mb-1">TESTEMUNHA 2</b>
            <div className="flex items-baseline mb-0.5">
              <span className="font-semibold mr-1">Nome:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha2Nome : ''}
              </span>
            </div>
            <div className="flex items-baseline mb-0.5">
              <span className="font-semibold mr-1">CPF/RG:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha2Documento : ''}
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold mr-1">Telefone/e-mail:</span>
              <span className="border-b border-black flex-grow min-h-[15px] px-1 font-medium">
                {form.temAssinaturaRogo ? form.testemunha2Contato : ''}
              </span>
            </div>
          </div>
        </div>

        {/* SEÇÃO 9: CERTIFICAÇÃO DA PRESENÇA */}
        <div className="section-box border border-[#004a80] rounded-lg flex items-center mt-2 mb-1 overflow-hidden">
          <div className="section-num bg-[#004a80] text-white w-6 h-6 flex items-center justify-center font-bold text-xs rounded-full m-1">
            9
          </div>
          <div className="section-title font-bold text-[#004a80] pl-2 flex-grow text-xs uppercase tracking-wide">
            Certificação da presença
          </div>
          <div className="badge badge-serventia bg-[#e8f5e9] text-[#2e7d32] text-[8px] font-extrabold px-2 py-0.5 uppercase tracking-wider">
            Preenchimento da Serventia
          </div>
        </div>
        <div className="text-[8.5px] px-1 text-[#334155] leading-tight text-justify font-medium">
          Certifico e dou fé que as assinaturas e/ou a impressão digital foram apostas em minha presença, após a identificação das pessoas signatárias, ficando concedida a gratuidade para a prática do ato solicitado.
        </div>
        <div className="grid-row grid grid-cols-12 gap-2 mt-1 mb-1 px-1">
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Local e data:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.certificacaoLocalData || ''}
            </span>
          </div>
          <div className="col-span-6 flex items-baseline">
            <span className="field-label text-[10px] font-bold text-[#1e293b] mr-1.5 whitespace-nowrap">Oficial ou preposto:</span>
            <span className="input-line border-b border-black text-[10px] font-medium flex-grow px-1 min-h-[17px]">
              {form.certificacaoOficialPreposto || ''}
            </span>
          </div>
        </div>
        <div className="signature-box w-3/5 mx-auto mt-8 flex flex-col items-center">
          {form.tipoAssinaturaOficial === 'digital' && form.assinaturaOficialDataUrl ? (
            <img 
              src={form.assinaturaOficialDataUrl} 
              alt="Assinatura do oficial" 
              className="max-h-12 max-w-[200px] object-contain mb-1"
            />
          ) : (
            <div className="h-10"></div>
          )}
          <div className="w-full border-t border-black text-center text-[9.5px] pt-1.5 font-medium text-[#0f172a]">
            Assinatura e identificação funcional
          </div>
        </div>

        {/* Rodapé Página 2 com Base Normativa */}
        <div className="footer-text mt-auto pt-1.5 border-t border-[#cbd5e1]">
          <div className="flex gap-2.5 border-t-2 border-[#004a80] pt-1">
            <div className="text-lg leading-none select-none">📄</div>
            <div className="text-[7.5px] leading-tight text-justify text-[#334155]">
              <b>BASE NORMATIVA:</b> Provimento CNJ n. 221/2026, Provimento CGJ/RN n. 07/2026, Lei Estadual n. 11.038/2021 (Arts. 45, incisos I a VII), Lei Federal n. 6.015/1973 (Art. 56, §§ 1º, 2º, 3º e 4º), Código de Normas CGJRN – Caderno Extrajudicial, Código de Processo Civil (Art. 98, inciso IX).
            </div>
          </div>
          <div className="flex justify-between items-center mt-1 text-[8.5px] text-[#475569]">
            <span>Edição disponibilizada em 08/09/2026 - 000086910</span>
            <span className="font-bold text-[#004a80] uppercase tracking-wide">
              Ano 2026 Edição 920 - Página 2 de 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
