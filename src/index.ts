import dotenv from "dotenv";
import express from "express";

import { healthRoutes } from "./routes/healthRoutes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json());
app.use(healthRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
