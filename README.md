# Agente de Custo Inexplicavel (MVP)

Backend em Node.js + TypeScript para ingestao de custos, volume e eventos, com analise deterministica e explicacao por IA.

## Stack

- Node.js
- TypeScript
- Express
- dotenv
- Armazenamento em memoria (arrays/map)

## Estrutura

```txt
src/
  ai/
  controllers/
  routes/
  services/
  utils/
```

## Variaveis de ambiente

Use `.env` com base no `.env.example`:

```env
PORT=3000
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```

## Como rodar

```bash
npm install
npm run dev
```

Build e start:

```bash
npm run build
npm run start
```

## Endpoints

### Healthcheck

```bash
curl -X GET http://localhost:3000/health
```

### Ingestao de custos

```bash
curl -X POST http://localhost:3000/costs \
  -H "Content-Type: application/json" \
  -d '{"periodo":"2025-03","categoria":"energia","valor":18200}'
```

### Ingestao de volume

```bash
curl -X POST http://localhost:3000/volumes \
  -H "Content-Type: application/json" \
  -d '{"periodo":"2025-03","volume":920}'
```

### Ingestao de eventos

```bash
curl -X POST http://localhost:3000/events \
  -H "Content-Type: application/json" \
  -d '{"evento":"mudanca_fornecedor","data":"2025-02-15","descricao":"Troca de fornecedor de energia"}'
```

### Analise com IA

```bash
curl -X GET "http://localhost:3000/analysis?from=2025-01&to=2025-03"
```

Resposta esperada:

```json
{
  "resumo": "string",
  "principais_causas": ["string"],
  "pergunta_critica": "string"
}
```

## Fluxo de analise

1. O sistema agrega custos por periodo e categoria.
2. Calcula custo por unidade quando houver volume.
3. Compara periodos e detecta aumentos desproporcionais.
4. Envia apenas o resumo processado para a IA.
5. A IA devolve resumo executivo, causas provaveis e pergunta critica.

## Exemplo de prompt da camada de IA

System prompt:

```txt
Voce e um analista financeiro especialista em explicar aumento de custos.
Responda SOMENTE em JSON valido com as chaves: resumo, principais_causas, pergunta_critica.
```

User prompt (resumido):

```txt
Com base no resumo processado abaixo, explique as causas mais provaveis para o aumento de custos.
Seja objetivo, acionavel e evite mencionar dados nao presentes.

Resumo processado:
{ ...JSON deterministico... }

Formato esperado:
{ "resumo": "texto curto", "principais_causas": ["causa 1"], "pergunta_critica": "pergunta" }
```
