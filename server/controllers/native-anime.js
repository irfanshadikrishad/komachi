import chalk from "chalk";
import Anime from "../models/anime.js";

const search = async (req, res) => {
  try {
    const { name } = await req.params;
    const result = await Anime.find({
      title: { $regex: new RegExp(name, "i") },
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Not found!" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[search] ${error.message}`));
    res.status(400).json({ error: error.message });
  }
};

const singleAnime = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const anime = await Anime.findOne({ animeId });
    if (anime) {
      res.status(200).json(anime);
    } else {
      res.status(404).json({ error: "Not found!" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[singleAnime] ${error.message}`));
    res.status(400).json({ error: error.message });
  }
};

export { search, singleAnime };
