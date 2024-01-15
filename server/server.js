import { config } from "dotenv";
import chalk from "chalk";
import express from "express";
import database from "./utils/database.js";
import authRouter from "./routes/auth-router.js";

config();
database();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use("/api/v1", authRouter);

app.listen(PORT, () => {
  console.log(chalk.cyan(`[server] ${PORT}`));
});
