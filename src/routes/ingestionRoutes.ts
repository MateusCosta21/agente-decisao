import { Router } from "express";

import {
  createCost,
  createEvent,
  createVolume,
} from "../controllers/ingestionController";

const ingestionRoutes = Router();

ingestionRoutes.post("/costs", createCost);
ingestionRoutes.post("/volumes", createVolume);
ingestionRoutes.post("/events", createEvent);

export { ingestionRoutes };
