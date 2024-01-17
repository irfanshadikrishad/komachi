import { config } from "dotenv";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import database from "./utils/database.js";
import authRouter from "./routes/auth-router.js";
import animeRouter from "./routes/anime-router.js";

config();
database();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["https://foxtream.vercel.app"],
    methods: "*",
  })
);
app.use(express.json());
app.use("/api/v1", authRouter);
app.use("/api/v1/anime", animeRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: 200 });
});

app.listen(PORT, () => {
  console.log(chalk.cyan(`[server] ${PORT}`));
});
