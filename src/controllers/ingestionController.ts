import { Request, Response } from "express";

import { inMemoryStore } from "../services/inMemoryStore";

function createCost(req: Request, res: Response): void {
  const { periodo, categoria, valor } = req.body;

  if (
    typeof periodo !== "string" ||
    typeof categoria !== "string" ||
    typeof valor !== "number"
  ) {
    res.status(400).json({
      error: "Payload invalido para /costs. Use: periodo, categoria, valor.",
    });
    return;
  }

  const saved = inMemoryStore.addCost({ periodo, categoria, valor });
  res.status(201).json(saved);
}

function createVolume(req: Request, res: Response): void {
  const { periodo, volume } = req.body;

  if (typeof periodo !== "string" || typeof volume !== "number") {
    res.status(400).json({
      error: "Payload invalido para /volumes. Use: periodo, volume.",
    });
    return;
  }

  const saved = inMemoryStore.addVolume({ periodo, volume });
  res.status(201).json(saved);
}

function createEvent(req: Request, res: Response): void {
  const { evento, data, descricao } = req.body;

  if (
    typeof evento !== "string" ||
    typeof data !== "string" ||
    typeof descricao !== "string"
  ) {
    res.status(400).json({
      error: "Payload invalido para /events. Use: evento, data, descricao.",
    });
    return;
  }

  const saved = inMemoryStore.addEvent({ evento, data, descricao });
  res.status(201).json(saved);
}

export { createCost, createVolume, createEvent };
