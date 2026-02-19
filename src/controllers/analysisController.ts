import { NextFunction, Request, Response } from "express";

import { buildProcessedSummary } from "../services/deterministicAnalysisService";
import { generateAnalysisFromSummary } from "../services/aiAnalysisService";
import { isValidPeriod } from "../utils/period";

async function getAnalysis(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const from = String(req.query.from ?? "");
  const to = String(req.query.to ?? "");

  if (!isValidPeriod(from) || !isValidPeriod(to)) {
    res.status(400).json({
      error: "Use query params validos: from=YYYY-MM&to=YYYY-MM.",
    });
    return;
  }

  if (from > to) {
    res.status(400).json({
      error: "Intervalo invalido: from deve ser menor ou igual a to.",
    });
    return;
  }

  try {
    const processedSummary = buildProcessedSummary(from, to);
    const analysis = await generateAnalysisFromSummary(processedSummary);
    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
}

export { getAnalysis };
