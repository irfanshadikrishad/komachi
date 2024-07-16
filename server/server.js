import { config } from "dotenv";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import animeRouter from "./routes/anime-router.js";
import database from "./utils/database.js";

config();
database();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: [
      "https://konami.tech",
      "https://www.konami.tech",
      "http://localhost:5173",
      "https://komachi-phi.vercel.app",
    ],
    methods: "*",
  })
);
app.use(express.json());
app.use("/api/v1/anime", animeRouter);

app.get("/", (req, res) => {
  res.status(200).json({ status: 200 });
});

app.listen(PORT, () => {
  console.log(chalk.cyan(`[server] ${PORT}`));
});
