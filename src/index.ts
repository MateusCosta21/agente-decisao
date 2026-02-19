import dotenv from "dotenv";
import express from "express";

import { analysisRoutes } from "./routes/analysisRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { ingestionRoutes } from "./routes/ingestionRoutes";
import { errorHandler, notFoundHandler } from "./utils/errors";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(healthRoutes);
app.use(ingestionRoutes);
app.use(analysisRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
