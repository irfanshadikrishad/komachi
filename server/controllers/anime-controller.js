import chalk from "chalk";
import { ANIME, META } from "@consumet/extensions";
import Anime from "../model/anime.js";

const gogoanime = new ANIME.Gogoanime();
const anilist = new META.Anilist();

const trending = async (req, res) => {
  try {
    const { page, perPage } = req.body;
    const results = await Anime.find().sort({ anilistId: 1 }).limit(perPage);
    res.status(200).json(results);
  } catch (error) {
    console.log(chalk.magenta(`trending`, error));
    res.status(400).json({ error: error.message });
  }
};

const popular = async (req, res) => {
  try {
    const { page, perPage } = req.body;
    const results = await Anime.find().sort({ anilistId: -1 }).limit(perPage);
    res.status(200).json(results);
  } catch (error) {
    console.log(chalk.magenta(`popular`, error));
    res.status(400).json({ error: error.message });
  }
};

const recent_Episodes = async (req, res) => {
  try {
    const recent = await Anime.find({}).sort({ updatedAt: -1 }).limit(24);
    res.status(200).json(recent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const dub_Episodes = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const episodes = await gogoanime.fetchAnimeInfo(animeId);
    res.status(200).json(episodes.episodes);
  } catch (error) {
    console.log(chalk.magenta(`dub_Episodes`, error));
    res.status(400).json({ error: error.message });
  }
};

const anime_Info = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const info = await Anime.findOne({ anilistId: animeId });
    if (info) {
      res.status(200).json(info);
    } else {
      res.status(404).json({ message: `not found` });
    }
  } catch (error) {
    console.log(chalk.magenta(`anime_Info`, error));
    res.status(400).json({ message: error.message });
  }
};

const streamingEpisodeLink = async (req, res) => {
  const { episodeId } = await req.body;
  try {
    const streaminLinks = await gogoanime.fetchEpisodeSources(episodeId);
    res.status(200).json(streaminLinks);
  } catch (error) {
    console.log(chalk.magenta(`streamingEpisodeLink`, error));
    res.status(400).json({ error: error.message, episodeId });
  }
};

const search = async (req, res) => {
  try {
    let searchedOverall = [];
    const { searchQuery } = await req.body;
    async function searchProvider(searchQuery, page) {
      const searched = await anilist.search(searchQuery, page, 25);
      searchedOverall = [...searchedOverall, ...searched.results];
      if (searched.hasNextPage) {
        await searchProvider(searchQuery, searched.currentPage + 1); // recursion to get exact results
      } else {
        res.status(200).json(searchedOverall);
      }
    }
    await searchProvider(searchQuery, 1);
  } catch (error) {
    console.log(chalk.magenta(`search`, error));
    res.status(400).json({ error: error.message });
  }
};

const steamingServerSources = async (req, res) => {
  try {
    const { episodeId } = await req.body;
    const sources = await gogoanime.fetchEpisodeServers(episodeId);
    res.status(200).json(sources);
  } catch (error) {
    console.log(chalk.magenta(`streamingServerSources`, error));
    res.status(400).json({ error: error.message });
  }
};

const advanced_Search = async (req, res) => {
  try {
    let { query, type, page, perPage, format, sort, genres, year, season } =
      await req.body;
    if (query) {
      const results = await Anime.find({
        $or: [
          { "title.english": { $regex: query, $options: "i" } },
          { "title.romaji": { $regex: query, $options: "i" } },
          { "title.native": { $regex: query, $options: "i" } },
        ],
      }).limit(60);
      res.status(200).json(results);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(chalk.magenta(error.message));
    res.status(400).json({ error: error.message });
  }
};

const random_Anime = async (req, res) => {
  try {
    const total_Animes = await Anime.find({});
    const random_number =
      Math.floor(Math.random() * (total_Animes.length - 1 + 1)) + 1;
    const random_Anime = await Anime.find({}).skip(random_number).limit(1);
    res.status(200).json(random_Anime);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const sub_Episodes = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const info = await gogoanime.fetchAnimeInfo(animeId);
    if (info) {
      res.status(200).json(info.episodes);
    } else {
      res.status(400).json(info);
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const get_Board = async (req, res) => {
  try {
    const board = await Anime.find({}).sort({ updatedAt: -1 }).limit(5);
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const stats = async (req, res) => {
  try {
    const totalAnimes = await Anime.find({});
    res.status(200).json({ total_animes: totalAnimes.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  trending,
  recent_Episodes,
  anime_Info,
  streamingEpisodeLink,
  search,
  steamingServerSources,
  popular,
  dub_Episodes,
  advanced_Search,
  random_Anime,
  sub_Episodes,
  get_Board,
  stats,
};
