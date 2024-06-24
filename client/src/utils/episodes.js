import { subToDub } from "./info_modifier";

const getSubEpisodesFromGoGo = async (SERVER, episodeId) => {
  if (episodeId) {
    const animeId = episodeId.split("-")?.slice(0, -2)?.join("-");
    try {
      const request = await fetch(`${SERVER}/api/v1/anime/sub-episodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      });
      const response = await request.json();
      if (request.status === 200) {
        return response;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error.message);
    }
  } else {
    return [];
  }
};

const getDubEpisodesFromGoGo = async (SERVER, subId) => {
  try {
    if (subId) {
      const request = await fetch(`${SERVER}/api/v1/anime/dub-episodes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId: subToDub(subId) }),
      });
      const response = await request.json();
      if (request.status === 200) {
        return response;
      }
    } else {
      console.log(`subId `, subId, `dubId `, subToDub(subId));
    }
  } catch (error) {
    console.log(error);
  }
};

export { getSubEpisodesFromGoGo, getDubEpisodesFromGoGo };
