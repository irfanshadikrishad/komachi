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
    res.status(200).json(recent);
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
  try {
    const { searchQuery } = await req.body;
    const searched = await gogoanime.search(searchQuery);
    res.status(200).json(searched);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { trending, recentEpisodes, animeInfo, streamingEpisodeLink, search };
