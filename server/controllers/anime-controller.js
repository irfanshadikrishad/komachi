import chalk from "chalk";
import { ANIME, META } from "@consumet/extensions";

const gogoanime = new ANIME.Gogoanime();
const anilist = new META.Anilist();

const trending = async (req, res) => {
  try {
    const topAiring = await anilist.fetchTrendingAnime();
    res.status(200).json(topAiring.results);
  } catch (error) {
    console.log(chalk.magenta("trending", error));
    res.status(400).json({ error: error.message });
  }
};

const popular = async (req, res) => {
  try {
    const { results } = await anilist.fetchPopularAnime(1, 10);
    res.status(200).json(results);
  } catch (error) {
    console.log(chalk.magenta(`popular`, error));
    res.status(400).json({ error: error.message });
  }
};

const recentEpisodes = async (req, res) => {
  try {
    const { page } = await req.body;
    const recent = await anilist.fetchRecentEpisodes("gogoanime", page, 34);
    res.status(200).json(recent.results);
  } catch (error) {
    console.log(chalk.magenta(`recentEpisodes`, error));
    res.status(400).json({ error: error.message });
  }
};

const dubEpisodes = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const episodes = await gogoanime.fetchAnimeInfo(animeId);
    res.status(200).json(episodes.episodes);
  } catch (error) {
    console.log(chalk.magenta(`dubEpisodes`, error));
    res.status(400).json({ error: error.message });
  }
};

const animeInfo = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const info = await anilist.fetchAnimeInfo(animeId);
    res.status(200).json(info);
  } catch (error) {
    console.log(chalk.magenta(`animeInfo`, error));
    res.status(400).json({ error: error.message });
  }
};

const streamingEpisodeLink = async (req, res) => {
  try {
    const { episodeId } = await req.body;
    const streaminLinks = await gogoanime.fetchEpisodeSources(episodeId);
    res.status(200).json(streaminLinks);
  } catch (error) {
    console.log(chalk.magenta(`streamingEpisodeLink`, error));
    res.status(400).json({ error: error.message });
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

const advanceSearch = async (req, res) => {
  try {
    const { query, type, page, perPage, format, sort, genres, year, season } =
      await req.body;
    const result = await anilist.advancedSearch(
      query,
      type,
      page,
      perPage,
      format,
      sort,
      genres,
      undefined,
      year,
      season
    );
    res.status(200).json(result.results);
  } catch (error) {
    console.log(chalk.magenta(error.message));
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
  advanceSearch,
};
