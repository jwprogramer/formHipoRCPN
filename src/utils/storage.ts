import { FormularioHipossuficiencia, ServentiaPadrao } from '../types';

const STORAGE_KEYS = {
  DRAFT: 'tjrn_hipo_draft_v1',
  SERVENTIA_DEFAULT: 'tjrn_hipo_serventia_padrao',
  HISTORY: 'tjrn_hipo_history_v1',
};

export const FORM_INICIAL: FormularioHipossuficiencia = {
  serventia: '',
  municipioComarca: '',
  beneficiarioNome: '',
  beneficiarioDocumento: '',
  beneficiarioDataNascimento: '',
  beneficiarioProfissao: '',
  beneficiarioEndereco: '',
  beneficiarioMunicipioUF: '',
  beneficiarioCep: '',
  beneficiarioContato: '',
  atoCertidao: true,
  certidaoTipos: {
    semBusca: true,
    comBusca: false,
    inteiroTeor: false,
  },
  atoHabilitacaoCasamento: false,
  atoAlteracaoPrenomeGenero: false,
  atoOutro: false,
  descricaoOutroAto: '',
  livro: '',
  folha: '',
  termo: '',
  localData: '',
  tipoAssinaturaBeneficiario: 'manual',
  temRepresentante: false,
  representanteNome: '',
  representanteDocumento: '',
  representanteContato: '',
  representanteQualidade: '',
  representanteDocumentoComprobatorio: '',
  tipoAssinaturaRepresentante: 'manual',
  temAssinaturaRogo: false,
  rogoNome: '',
  rogoDocumento: '',
  rogoContato: '',
  tipoAssinaturaRogo: 'manual',
  temDigitalBeneficiario: false,
  testemunha1Nome: '',
  testemunha1Documento: '',
  testemunha1Contato: '',
  testemunha2Nome: '',
  testemunha2Documento: '',
  testemunha2Contato: '',
  certificacaoLocalData: '',
  certificacaoOficialPreposto: '',
  tipoAssinaturaOficial: 'manual',
};

export function salvarRascunho(form: FormularioHipossuficiencia): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(form));
  } catch (e) {
    console.error('Falha ao salvar rascunho:', e);
  }
}

export function carregarRascunho(): FormularioHipossuficiencia | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Falha ao carregar rascunho:', e);
    return null;
  }
}

export function limparRascunho(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  } catch (e) {
    console.error('Falha ao limpar rascunho:', e);
  }
}

export function salvarServentiaPadrao(dados: ServentiaPadrao): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SERVENTIA_DEFAULT, JSON.stringify(dados));
  } catch (e) {
    console.error('Falha ao salvar serventia padrão:', e);
  }
}

export function carregarServentiaPadrao(): ServentiaPadrao | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVENTIA_DEFAULT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function salvarNoHistorico(form: FormularioHipossuficiencia): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    const list: FormularioHipossuficiencia[] = raw ? JSON.parse(raw) : [];
    const itemComId = {
      ...form,
      id: form.id || 'dec_' + Date.now(),
      criadoEm: new Date().toISOString(),
    };
    // Manter até 50 itens mais recentes
    const novaLista = [itemComId, ...list.filter(i => i.id !== itemComId.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(novaLista));
  } catch (e) {
    console.error('Falha ao salvar no histórico:', e);
  }
}

export function carregarHistorico(): FormularioHipossuficiencia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function removerDoHistorico(id: string): FormularioHipossuficiencia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const list: FormularioHipossuficiencia[] = JSON.parse(raw);
    const atualizado = list.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(atualizado));
    return atualizado;
  } catch (e) {
    return [];
  }
}
