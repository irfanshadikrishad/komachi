import chalk from "chalk";
import { ANIME, META } from "@consumet/extensions";

const gogoanime = new ANIME.Gogoanime();
const anilist = new META.Anilist();

const trending = async (req, res) => {
  try {
    const { page, perPage } = req.body;
    const topAiring = await anilist.fetchTrendingAnime(page, perPage);
    res.status(200).json(topAiring.results);
  } catch (error) {
    console.log(chalk.magenta("trending", error));
    res.status(400).json({ error: error.message });
  }
};

const popular = async (req, res) => {
  try {
    const { page, perPage } = req.body;
    const { results } = await anilist.fetchPopularAnime(page, perPage);
    res.status(200).json(results);
  } catch (error) {
    console.log(chalk.magenta(`popular`, error));
    res.status(400).json({ error: error.message });
  }
};

const recent_Episodes = async (req, res) => {
  try {
    const { page } = await req.body;
    const recent = await anilist.fetchRecentEpisodes("gogoanime", page, 34);
    res.status(200).json(recent.results);
  } catch (error) {
    console.log(chalk.magenta(`recent_Episodes`, error));
    res.status(400).json({ error: error.message });
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
    const info = await anilist.fetchAnimeInfo(animeId);
    res.status(200).json(info);
  } catch (error) {
    console.log(chalk.magenta(`anime_Info`, error));
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

const advanced_Search = async (req, res) => {
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
      undefined, // id not preferred
      year,
      season
    );
    res.status(200).json(result.results);
  } catch (error) {
    console.log(chalk.magenta(error.message));
    res.status(400).json({ error: error.message });
  }
};

const random_Anime = async (req, res) => {
  try {
    let r;

    async function getRandom() {
      r = await anilist.fetchRandomAnime();
    }

    do {
      await getRandom();
    } while (!r.episodes || r.episodes.length === 0);

    res.status(200).json(r);
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
    const trnd = await anilist.fetchTrendingAnime(1, 5);
    const boardPromises = trnd.results.map(async ({ id }) => {
      const raw_data = await anilist.fetchAnimeInfo(id);
      const episodeId = (raw_data.episodes[0]?.id)
        .split("-")
        .slice(0, -2)
        .join("-");

      const dub_episodeId = episodeId + "-dub";

      const getSub = await gogoanime.fetchAnimeInfo(episodeId);

      let getDub = null;
      try {
        getDub = await gogoanime.fetchAnimeInfo(dub_episodeId);
      } catch (error) {
        // console.log(`getting dub failed for ${dub_episodeId}`);
      }

      return {
        id: raw_data.id,
        title:
          raw_data.title && raw_data.title.english
            ? raw_data.title.english
            : raw_data.title.romaji,
        description: raw_data.description,
        cover: raw_data.cover,
        totalEpisodes: raw_data.totalEpisodes,
        genres: raw_data.genres,
        status: raw_data.status,
        totalSub: getSub ? getSub.episodes.length : 0,
        totalDub: getDub ? getDub.episodes.length : 0,
      };
    });
    const board = await Promise.all(boardPromises);
    res.status(200).json(board);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
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
};
