import { config } from "dotenv";
import chalk from "chalk";
import express from "express";

config();
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(chalk.cyan(`[server] ${PORT}`));
});
