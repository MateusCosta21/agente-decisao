import { generateStructuredAnalysis } from "../ai/openaiClient";
import { AnalysisResult, ProcessedSummary } from "../utils/types";

function buildPromptPayload(processedSummary: ProcessedSummary): string {
  return JSON.stringify(processedSummary, null, 2);
}

async function generateAnalysisFromSummary(
  processedSummary: ProcessedSummary,
): Promise<AnalysisResult> {
  const systemPrompt =
    "Voce e um analista financeiro especialista em explicar aumento de custos. " +
    "Responda SOMENTE em JSON valido com as chaves: resumo, principais_causas, pergunta_critica.";

  const userPrompt =
    "Com base no resumo processado abaixo, explique as causas mais provaveis para o aumento de custos. " +
    "Seja objetivo, acionavel e evite mencionar dados nao presentes.\n\n" +
    `Resumo processado:\n${buildPromptPayload(processedSummary)}\n\n` +
    "Formato esperado:\n" +
    '{ "resumo": "texto curto", "principais_causas": ["causa 1"], "pergunta_critica": "pergunta" }';

  const raw = await generateStructuredAnalysis([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  const parsed = JSON.parse(raw) as Partial<AnalysisResult>;

  if (
    typeof parsed.resumo !== "string" ||
    !Array.isArray(parsed.principais_causas) ||
    !parsed.principais_causas.every((item) => typeof item === "string") ||
    typeof parsed.pergunta_critica !== "string"
  ) {
    throw new Error("Resposta da IA em formato invalido.");
  }

  return {
    resumo: parsed.resumo,
    principais_causas: parsed.principais_causas,
    pergunta_critica: parsed.pergunta_critica,
  };
}

export { generateAnalysisFromSummary };
