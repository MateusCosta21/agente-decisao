import { NextFunction, Request, Response } from "express";

function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: "Rota nao encontrada." });
}

function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const message = error instanceof Error ? error.message : "Erro interno do servidor.";
  res.status(500).json({ error: message });
}

export { notFoundHandler, errorHandler };
