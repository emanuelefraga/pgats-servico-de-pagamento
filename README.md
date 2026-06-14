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

## Pipeline de Integração Contínua

A pipeline está configurada no arquivo `.github/workflows/ci.yml` e contempla:

### Formas de disparo

| Tipo | Descrição |
|---|---|
| `push` | Executa automaticamente a cada push na branch `main` |
| `workflow_dispatch` | Permite execução manual diretamente pelo GitHub |
| `schedule` | Executa automaticamente toda segunda-feira às 08h (UTC) |

### Etapas da pipeline

1. **Clonar repositório** — baixa o código para o ambiente de execução
2. **Instalar Node.js** — configura a versão 20 do Node.js
3. **Instalar dependências** — executa `npm install`
4. **Executar testes e gerar relatório** — roda o Mocha e salva o resultado em `relatorio.json`
5. **Armazenar relatório** — faz upload do relatório como artefato da pipeline

### Relatório de testes

O relatório é gerado automaticamente a cada execução da pipeline e fica disponível na aba **Actions** do repositório, na seção **Artifacts**, com o nome `relatorio-de-testes`.

## Conceitos aplicados

- **Integração Contínua (CI)** — prática de executar testes automaticamente a cada mudança no código, garantindo que nada foi quebrado
- **Pipeline** — sequência de etapas automatizadas que validam o projeto
- **Artefatos** — arquivos gerados durante a pipeline e armazenados para consulta posterior
- **Triggers** — formas de disparar a pipeline (push, manual, agendado)
- **Schedule (cron)** — agendamento de execuções periódicas usando expressão cron