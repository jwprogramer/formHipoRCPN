# Declaração de Hipossuficiência Econômica — TJRN (RCPN)

[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![LGPD Compliant](https://img.shields.io/badge/LGPD-Sem_Armazenamento_de_Dados-success.svg)](#privacidade-e-lgpd)

Aplicação web moderna, acessível e segura desenvolvida para o preenchimento, validação, conferência visual e emissão da **Declaração de Hipossuficiência Econômica** destinada aos serviços de **Registro Civil das Pessoas Naturais (RCPN)** no âmbito do Poder Judiciário do Estado do Rio Grande do Norte (**TJRN / Corregedoria Geral de Justiça - CGJ/RN**).

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Privacidade e LGPD (Zero Retenção de Dados)](#-privacidade-e-lgpd-zero-retenção-de-dados)
- [Fundamentação Legal](#-fundamentação-legal)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Geração do Documento Oficial (PDF / Impressão)](#-geração-do-documento-oficial-pdf--impressão)

---

## 🏛️ Visão Geral

A declaração de hipossuficiência assegura a cidadãos em situação de vulnerabilidade econômica o acesso gratuito aos atos de registro civil garantidos por lei (como certidões de nascimento, casamento, óbito, habilitação para casamento civil, averbações e procedimentos correlatos).

Este sistema elimina formulários manuais propensos a erros e burocracia, fornecendo uma interface interativa que gera o espelho exato do documento oficial padronizado pelo TJRN, pronto para assinatura e arquivamento pela serventia extrajudicial.

---

## ✨ Principais Funcionalidades

- **Formulário Inteligente e Interativo**:
  - Máscaras automáticas e validações em tempo real para CPF, CEP, datas e telefones.
  - Consulta automática de endereço via CEP (integração ViaCEP).
  - Suporte completo a requerentes representados (procuradores, pais ou representantes legais).
  - Seleção detalhada dos atos requeridos: certidões (com ou sem busca, inteiro teor), habilitação de casamento, averbações/anotações ou outros atos do RCPN.
- **Visualização Lado a Lado (Split View)**:
  - Alternância rápida entre visualização dividida (Formulário + Visualização do Documento), somente formulário ou tela cheia do documento.
- **Configuração de Serventia Padrão**:
  - Cartórios e serventias podem salvar seus dados institucionais (Nome do Cartório, Comarca, Titular/Oficial e Município) para agilizar atendimentos repetidos.
- **Emissão Oficial**:
  - Geração de **PDF em alta definição (300 DPI)** formato A4 oficial com layout exato do TJRN/CGJ.
  - Botão de **Impressão Direta** formatado via CSS Print sem margens indesejadas ou cortes.
- **Opções de Assinatura**:
  - Opção para assinatura física tradicional (campo com linha para assinatura de próprio punho ou a rogo com testemunhas).
  - Opção para aposição de assinatura digital qualificada (Gov.br / ICP-Brasil).

---

## 🔒 Privacidade e LGPD (Zero Retenção de Dados)

Em estrita consonância com a **Lei Geral de Proteção de Dados (Lei Federal nº 13.709/2018 - LGPD)** e os princípios de minimização e segurança da informação:

1. **Nenhum dado pessoal é gravado**: Não há banco de dados nem armazenamento de registros em servidores remotos.
2. **Sem persistência local de dados sensíveis**: Nomes, CPFs, contatos e endereços de cidadãos não permanecem gravados no navegador após o encerramento ou atualização da sessão.
3. **Processamento Client-Side**: A geração do PDF e a formatação do documento ocorrem 100% no navegador do usuário.

---

## ⚖️ Fundamentação Legal

O modelo e as diretrizes do documento atendem a:

- **Lei Federal nº 6.015/1973** (Lei de Registros Públicos);
- **Lei Federal nº 9.534/1997** (Gratuidade dos assentos e primeiras certidões de nascimento e óbito para os reconhecidamente pobres);
- **Lei Federal nº 1.060/1950** e **Código de Processo Civil (CPC - Lei nº 13.105/2015, arts. 98 e seguintes)**;
- **Código de Normas da Corregedoria Geral de Justiça do Estado do Rio Grande do Norte (CGJ/RN)**;
- **Provimentos do Conselho Nacional de Justiça (CNJ)** pertinentes ao Registro Civil das Pessoas Naturais.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Bundler / Servidor Dev**: [Vite 6](https://vitejs.dev/)
- **Renderização e Exportação de PDF**: [html2canvas-pro](https://www.npmjs.com/package/html2canvas-pro) & [jsPDF](https://github.com/parallax/jsPDF)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 📁 Estrutura do Projeto

```text
├── index.html                   # Entry point HTML com metadados institucionais
├── metadata.json                # Metadados e configurações da aplicação
├── package.json                 # Dependências e scripts npm
├── vite.config.ts               # Configuração do Vite
├── src/
│   ├── main.tsx                 # Ponto de inicialização do React
│   ├── App.tsx                  # Componente raiz, controle de layout e exportação
│   ├── index.css                # Estilos globais e diretivas do Tailwind
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript dos dados do formulário
│   ├── utils/
│   │   ├── masks.ts             # Máscaras de CPF, CEP, telefone e consulta de CEP
│   │   └── storage.ts           # Configurações institucionais de serventia
│   └── components/
│       ├── InteractiveForm.tsx  # Formulário dinâmico em seções ordenadas
│       ├── DocumentPreview.tsx  # Espelho visual fiel do documento oficial A4 TJRN
│       ├── ServentiaModal.tsx   # Modal para configuração da serventia padrão
│       └── Toast.tsx            # Notificações e alertas do sistema
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Gerenciador de pacotes `npm` ou `yarn` / `pnpm`

### Instalação

1. Clone o repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/seu-usuario/formHipoRCPN.git
   cd formHipoRCPN
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação no seu navegador:
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento com hot-reload.
- `npm run build`: Valida tipagens com TypeScript e compila a aplicação para produção na pasta `dist/`.
- `npm run lint`: Executa a verificação estática de tipos (`tsc --noEmit`).
- `npm run preview`: Executa localmente o build de produção.

---

## 📄 Geração do Documento Oficial (PDF / Impressão)

1. Preencha os dados da Serventia e da Pessoa Beneficiária (e Representante, se houver).
2. Selecione os atos do RCPN aos quais a gratuidade se destina.
3. Escolha a modalidade de assinatura (manual ou digital).
4. Clique em **"Baixar PDF"** para obter o documento gerado em alta definição pronto para assinatura, ou clique em **"Imprimir"** para enviá-lo diretamente à impressora da serventia.
