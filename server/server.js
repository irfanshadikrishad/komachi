import { config } from "dotenv";
import chalk from "chalk";
import express from "express";
import cors from "cors";
import animeRouter from "./routes/anime-router.js";

config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["https://konami.tech", "http://localhost:5173"],
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
