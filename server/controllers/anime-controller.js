import chalk from "chalk";
import { ANIME, META } from "@consumet/extensions";

const gogoanime = new ANIME.Gogoanime();
const anilist = new META.Anilist();

function getRuntimeInSeconds() {
  return performance.now() / 1000;
}

const trending = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    const topAiring = await anilist.fetchTrendingAnime();
    res.status(200).json(topAiring.results);
    const endTime = getRuntimeInSeconds();
    const runtime = endTime - startTime;
    console.log(chalk.gray(`[trending] ${runtime.toFixed(2)}s.`));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const popular = async (req, res) => {
  try {
    const { results } = await anilist.fetchPopularAnime(1, 10);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const recentEpisodes = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    const { page } = await req.body;
    const recent = await anilist.fetchRecentEpisodes("gogoanime", page, 34);
    res.status(200).json(recent.results);
    const endTime = getRuntimeInSeconds();
    const runtime = endTime - startTime;
    console.log(chalk.gray(`[recentEpisodes] ${runtime.toFixed(2)}s.`));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const dubEpisodes = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const episodes = await gogoanime.fetchAnimeInfo(animeId);
    res.status(200).json(episodes.episodes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const animeInfo = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    const { animeId } = await req.body;
    const info = await anilist.fetchAnimeInfo(animeId);
    res.status(200).json(info);
    const endTime = getRuntimeInSeconds();
    const runtime = endTime - startTime;
    console.log(chalk.gray(`[animeInfo] ${runtime.toFixed(2)}s.`));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const streamingEpisodeLink = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    const { episodeId } = await req.body;
    const streaminLinks = await gogoanime.fetchEpisodeSources(episodeId);
    res.status(200).json(streaminLinks);
    const endTime = getRuntimeInSeconds();
    const runtime = endTime - startTime;
    console.log(chalk.gray(`[streamingEpisodeLink] ${runtime.toFixed(2)}s.`));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    let searchedOverall = [];
    const { searchQuery } = await req.body;
    async function searchProvider(searchQuery, page) {
      const searched = await anilist.search(searchQuery, page, 25);
      searchedOverall = [...searchedOverall, ...searched.results];
      if (searched.hasNextPage) {
        await searchProvider(searchQuery, searched.currentPage + 1); // recursion to get exact results
      } else {
        res.status(200).json(searchedOverall);
        const endTime = getRuntimeInSeconds();
        const runtime = endTime - startTime;
        console.log(chalk.gray(`[search] ${runtime.toFixed(2)}s.`));
      }
    }
    await searchProvider(searchQuery, 1);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const steamingServerSources = async (req, res) => {
  try {
    const startTime = getRuntimeInSeconds();
    const { episodeId } = await req.body;
    const sources = await gogoanime.fetchEpisodeServers(episodeId);
    res.status(200).json(sources);
    const endTime = getRuntimeInSeconds();
    const runtime = endTime - startTime;
    console.log(chalk.gray(`[steamingServerSources] ${runtime.toFixed(2)}s.`));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  trending,
  recentEpisodes,
  animeInfo,
  streamingEpisodeLink,
  search,
  steamingServerSources,
  popular,
  dubEpisodes,
};
