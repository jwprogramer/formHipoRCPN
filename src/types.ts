export type CertidaoTipo = 'sem_busca' | 'com_busca' | 'inteiro_teor';

export type AtoGratuitoKey = 
  | 'certidao' 
  | 'habilitacao_casamento' 
  | 'alteracao_prenome_genero' 
  | 'outro';

export interface FormularioHipossuficiencia {
  id?: string;
  criadoEm?: string;
  // Seção 1 - Dados da Serventia
  serventia: string;
  municipioComarca: string;

  // Seção 2 - Beneficiário
  beneficiarioNome: string;
  beneficiarioDocumento: string; // CPF ou RG
  beneficiarioDataNascimento: string;
  beneficiarioProfissao: string;
  beneficiarioEndereco: string;
  beneficiarioMunicipioUF: string;
  beneficiarioCep: string;
  beneficiarioContato: string; // Telefone ou e-mail

  // Seção 3 - Atos
  atoCertidao: boolean;
  certidaoTipos: {
    semBusca: boolean;
    comBusca: boolean;
    inteiroTeor: boolean;
  };
  atoHabilitacaoCasamento: boolean;
  atoAlteracaoPrenomeGenero: boolean;
  atoOutro: boolean;
  descricaoOutroAto: string;
  
  // Localização do ato
  livro: string;
  folha: string;
  termo: string;

  // Seção 5 - Local, Data e Assinatura
  localData: string;
  tipoAssinaturaBeneficiario: 'manual' | 'digital';
  assinaturaBeneficiarioDataUrl?: string;

  // Seção 6 - Representante Legal ou Assistente
  temRepresentante: boolean;
  representanteNome: string;
  representanteDocumento: string;
  representanteContato: string;
  representanteQualidade: string; // Ex: responsável legal, tutor, curador, assistente
  representanteDocumentoComprobatorio: string;
  tipoAssinaturaRepresentante: 'manual' | 'digital';
  assinaturaRepresentanteDataUrl?: string;

  // Seção 7 - Assinatura a Rogo
  temAssinaturaRogo: boolean;
  rogoNome: string;
  rogoDocumento: string;
  rogoContato: string;
  tipoAssinaturaRogo: 'manual' | 'digital';
  assinaturaRogoDataUrl?: string;
  temDigitalBeneficiario: boolean;
  digitalBeneficiarioDataUrl?: string;

  // Seção 8 - Testemunhas da Assinatura a Rogo
  testemunha1Nome: string;
  testemunha1Documento: string;
  testemunha1Contato: string;
  testemunha2Nome: string;
  testemunha2Documento: string;
  testemunha2Contato: string;

  // Seção 9 - Certificação da Presença (Serventia)
  certificacaoLocalData: string;
  certificacaoOficialPreposto: string;
  tipoAssinaturaOficial?: 'manual' | 'digital';
  assinaturaOficialDataUrl?: string;
}

export interface ServentiaPadrao {
  serventia: string;
  municipioComarca: string;
  oficialPrepostoPadrao?: string;
}
