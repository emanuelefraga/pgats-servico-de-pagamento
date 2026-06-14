Projeto de conclusão da Disciplina de Programação para Automação de Testes de Software, ministrada pelo Prof. Mestre Júlio de Lima na Pós-graduação em Automação de Testes de Software | PGATS-2026-03.

Projeto atualizado com correções para ser utilizado na disciplina 04 de Integração Contínua.

# Serviço de Pagamento — CI com GitHub Actions

Projeto desenvolvido para a disciplina de Qualidade de Software da pós-graduação, com pipeline de integração contínua configurada via GitHub Actions.

## Sobre o projeto

Classe JavaScript responsável por realizar pagamentos e consultar o último pagamento realizado. Cada pagamento contém as propriedades:

- `codigoBarras` — código de barras do pagamento
- `empresa` — nome da empresa
- `valor` — valor do pagamento
- `categoria` — `'cara'` para valores acima de R$ 100,00 ou `'padrão'` para os demais

## Tecnologias utilizadas

- Node.js
- Mocha (framework de testes)
- GitHub Actions (integração contínua)

## Como executar os testes localmente

```bash
npm install
npm test
```

## Como gerar o relatório localmente

```bash
npm run test:report
```

O relatório será salvo em `test-results/relatorio.json`.

## Estrutura do projeto

├── .github/
│   └── workflows/
│       ├── 1-exec-manual.yml       ← execução manual
│       ├── 2-exec-scheduled.yml    ← execução agendada
│       └── 3-exec-push.yml         ← execução por push
├── src/
│   └── servicoDePagamento.js
├── test/
│   └── servicoDePagamento.test.js
├── package.json
└── README.md

## Pipelines de Integração Contínua

As pipelines estão separadas em três arquivos dentro de `.github/workflows/`, cada uma com uma responsabilidade específica.

### Execução Manual (`1-exec-manual.yml`)

Disparada manualmente pelo usuário diretamente na aba **Actions** do GitHub.

| Configuração | Valor |
|---|---|
| Trigger | `workflow_dispatch` |
| Node.js | 18.x, 20.x, 22.x (matrix) |
| Timeout | 15 minutos |

### Execução Agendada (`2-exec-scheduled.yml`)

Disparada automaticamente em horários fixos, sem necessidade de intervenção humana.

| Configuração | Valor |
|---|---|
| Trigger | `schedule` |
| Agendamento 1 | A cada 30 minutos (`*/30 * * * *`) |
| Agendamento 2 | Toda sexta-feira à meia-noite UTC (`0 0 * * 5`) |
| Node.js | 18.x, 20.x, 22.x (matrix) |
| Timeout | 15 minutos |

### Execução por Push (`3-exec-push.yml`)

Disparada automaticamente sempre que houver um push ou pull request na branch `main`.

| Configuração | Valor |
|---|---|
| Trigger | `push` e `pull_request` na branch `main` |
| Node.js | 18.x, 20.x, 22.x (matrix) |
| Timeout | 15 minutos |

## Etapas comuns às três pipelines

1. **Checkout do código** — clona o repositório no ambiente de execução
2. **Setup Node.js** — configura a versão do Node.js definida na matrix
3. **Instalar dependências** — executa `npm ci` para instalação limpa e reproduzível
4. **Executar testes** — roda o Mocha e gera o relatório em `test-results/`
5. **Armazenar relatório** — faz upload do relatório como artefato da pipeline

## Relatório de testes

O relatório é gerado automaticamente a cada execução e fica disponível na aba **Actions** do repositório, na seção **Artifacts**. Como as pipelines rodam em três versões do Node.js simultaneamente, são gerados três relatórios por execução:

- `Relatorio-Testes-N1-Node-18.x`
- `Relatorio-Testes-N1-Node-20.x`
- `Relatorio-Testes-N1-Node-22.x`

## Conceitos aplicados

- **Integração Contínua (CI)** — prática de executar testes automaticamente a cada mudança no código, garantindo que nada foi quebrado
- **Pipeline** — sequência de etapas automatizadas que validam o projeto
- **Triggers** — formas de disparar a pipeline (push, manual, agendado)
- **Schedule (cron)** — agendamento de execuções periódicas usando expressão cron
- **Matrix** — estratégia que executa o mesmo job em múltiplas versões do Node.js simultaneamente
- **Artefatos** — arquivos gerados durante a pipeline e armazenados para consulta posterior
- **npm ci** — instalação limpa e reproduzível das dependências baseada no `package-lock.json`
- **Concurrency** — evita execuções simultâneas conflitantes da mesma pipeline
- **Timeout** — tempo máximo de execução para evitar pipelines travadas
- **Permissions** — define as permissões mínimas necessárias para o workflow