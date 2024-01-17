import chalk from "chalk";

const trending = async (req, res) => {
  try {
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/trending`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response.results);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

const recentEpisodes = async (req, res) => {
  try {
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/recent-episodes`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

const animeInfo = async (req, res) => {
  try {
    const { anilistId } = await req.body;
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/info/${anilistId}`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

const streamingEpisodeLink = async (req, res) => {
  try {
    const { episodeId } = await req.body;
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/watch/${episodeId}`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

const randomAnime = async (req, res) => {
  try {
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/random-anime`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

const search = async (req, res) => {
  try {
    const { searchQuery } = await req.body;
    const request = await fetch(
      `https://foxtream.up.railway.app/meta/anilist/${searchQuery}`
    );
    const response = await request.json();
    if (request.status === 200) {
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "something went wrong" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[trending] ${error.message}`));
  }
};

export {
  trending,
  recentEpisodes,
  animeInfo,
  streamingEpisodeLink,
  randomAnime,
  search,
};
