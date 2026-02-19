import { Router } from "express";

import { getAnalysis } from "../controllers/analysisController";

const analysisRoutes = Router();

analysisRoutes.get("/analysis", getAnalysis);

export { analysisRoutes };
