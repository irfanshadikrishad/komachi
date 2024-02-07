import { ANIME } from "@consumet/extensions";

const gogoanime = new ANIME.Gogoanime();

const trending = async (req, res) => {
  try {
    const topAiring = await gogoanime.fetchTopAiring();
    res.status(200).json(topAiring);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const recentEpisodes = async (req, res) => {
  try {
    const { page, type } = await req.body;
    const recent = await gogoanime.fetchRecentEpisodes(page, type);
    const recentPageTwo = await gogoanime.fetchRecentEpisodes(page + 1, type);
    const recentPageThree = await gogoanime.fetchRecentEpisodes(page + 2, type);
    const recentEpisodesOverall = [
      ...recent.results,
      ...recentPageTwo.results,
      ...recentPageThree.results,
    ];
    res.status(200).json(recentEpisodesOverall);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const animeInfo = async (req, res) => {
  try {
    const { animeId } = await req.body;
    const info = await gogoanime.fetchAnimeInfo(animeId);
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const streamingEpisodeLink = async (req, res) => {
  try {
    const { episodeId } = await req.body;
    const streaminLinks = await gogoanime.fetchEpisodeSources(episodeId);
    res.status(200).json(streaminLinks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const search = async (req, res) => {
  const searchProvider = async (q, p) => {
    return await gogoanime.search(q, p);
  };
  try {
    const { searchQuery } = await req.body;
    const searched = await searchProvider(searchQuery, 1);
    if (searched.hasNextPage) {
      const searchedTwo = await searchProvider(searchQuery, 2);
      const searchedOverAll = [...searched.results, ...searchedTwo.results];
      res.status(200).json(searchedOverAll);
    } else {
      res.status(200).json(searched.results);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const steamingServerSources = async (req, res) => {
  try {
    const { episodeId } = await req.body;
    const sources = await gogoanime.fetchEpisodeServers(episodeId);
    res.status(200).json(sources);
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
};
