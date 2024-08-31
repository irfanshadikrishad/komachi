/**
 * Converts timestamp like 1120415 to readable string
 * @param airingTime - in timistamp format as int number
 * @param episode - episode number (eg: 1, 2, 3 etc.)
 * @returns formatted string
 */
function convertTimestampToReadable(airingTime: any, episode: any) {
  let currentDate = new Date();

  let timeUntilAiring = Math.floor(airingTime - currentDate.getTime() / 1000);

  let days = Math.floor(timeUntilAiring / (24 * 3600));
  timeUntilAiring %= 24 * 3600;
  let hours = Math.floor(timeUntilAiring / 3600);
  timeUntilAiring %= 3600;
  let minutes = Math.floor(timeUntilAiring / 60);
  let seconds = timeUntilAiring % 60;

  let output = `Episode ${episode} will be airing in ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds.`;

  return output;
}

/**
 * Converts SubId to DubId
 * @param subId - (eg: one-piece-episode-1)
 * @returns dubId (eg: one-piece-dub-episode-1)
 */
function subToDub(subId: string) {
  if (String(subId).includes("dub")) {
    return subId;
  } else {
    const dubId = subId.split("-episode-").slice(0, -1);
    return `${String(dubId)}-dub`;
  }
}

/**
 * Checks for repeated string (eg: one-piece-episode-episode-1108)
 * @param str
 * @returns true | false
 */
function hasRepeatedWords(str: string) {
  const words = str.split("-");
  const wordSet = new Set();

  for (let word of words) {
    if (wordSet.has(word)) {
      return true;
    }
    wordSet.add(word);
  }

  return false;
}

/**
 * Converts episodeId to episode number
 * @param episodeId - (eg: one-piece-episode-1108)
 * @returns episode number (eg: 1108)
 */
const episodeIdToEpisodeNumber = (episodeId: string) => {
  const arr = String(episodeId).split("-");
  return arr[arr.length - 1];
};

/**
 * input like 'true' or 'false' will be returned as boolean true/false
 * @param string 'true' | 'false'
 * @returns true | false
 */
const stringToBoolean = (string: any) => {
  if (string === "true" || string === true) {
    return true;
  } else {
    return false;
  }
};

/**
 * Replace episode number from episodeId
 * @param defaultId (eg: kaijuu-8-gou-episode-1)
 * @param toSetId (eg: 2)
 * @returns (eg: kaijuu-8-gou-episode-2)
 */
const replaceId = (defaultId: string, toSetId: string) => {
  let splt = String(defaultId).split("-");
  splt[splt.length - 1] = toSetId;

  return String(splt.join("-"));
};

/**
 * Remove HTML & Markdown from string
 * @param input - string including markdown
 * @returns - pure string
 */
function removeHtmlAndMarkdown(input: string) {
  if (input) {
    input = input.replace(/<\/?[^>]+(>|$)/g, "");
    input = input.replace(/(^|\n)#{1,6}\s+(.+?)(\n|$)/g, "$2 ");
    input = input.replace(/(\*\*|__)(.*?)\1/g, "$2");
    input = input.replace(/(\*|_)(.*?)\1/g, "$2");
    input = input.replace(/`(.+?)`/g, "$1");
    input = input.replace(/\[(.*?)\]\(.*?\)/g, "$1");
    input = input.replace(/!\[(.*?)\]\(.*?\)/g, "$1");
    input = input.replace(/(^|\n)>\s+(.+?)(\n|$)/g, "$2 ");
    input = input.replace(/(^|\n)-\s+(.+?)(\n|$)/g, "$2 ");
    input = input.replace(/(^|\n)\d+\.\s+(.+?)(\n|$)/g, "$2 ");
    input = input.replace(/(^|\n)\s*([-*_]){3,}\s*(\n|$)/g, "$1");
    input = input.replace(/~~(.*?)~~/g, "$1");
    input = input.replace(/\s+/g, " ").trim();
  }
  return input;
}

/**
 * Insert value into state
 * @param toInsertString  - String
 * @param arrayToBeInsertedTo - Array
 */
function insert_Into_Array(toInsertString: string, arrayToBeInsertedTo: any) {
  arrayToBeInsertedTo((prevFormat: any) => {
    if (!prevFormat.includes(toInsertString)) {
      return [...prevFormat, toInsertString];
    }
    return prevFormat;
  });
}

/**
 * Slice string by length
 * @param str - String to slice
 * @param length - length to slice to
 * @returns sliced string
 */
const slisor = (str: string, length: number) => {
  if (str.length <= length) return str;
  let slicePos = length;
  while (slicePos > 0 && str[slicePos] !== " ") {
    slicePos--;
  }
  if (slicePos === 0) return str.slice(0, length);

  return str.slice(0, slicePos);
};

interface AnimeInfo {
  season: string;
  release_date: any;
  anilistId: {
    type: string;
  };
  malId: { type: string };
  title: {
    english: string;
    romaji: string;
    native: string;
    userPreferred: string;
  };
  description: string;
  poster: string;
  cover: string;
  sub_episodes: [{}];
  dub_episodes: [{}];
  origin: string;
  format: string;
  duration: string;
  status: string;
  airing_start: {
    year: string;
    month: string;
    day: string;
  };
  airing_end: {
    year: string;
    month: string;
    day: string;
  };
  genres: [string];
  synonyms: [string];
  isAdult: string;
  nextAiringEpisode: [
    {
      airingTime: number;
      timeUntilAiring: number;
      episode: number;
    }
  ];
  totalEpisodes: number;
  studios: [string];
  recommendations: [
    {
      animeId: string;
      malId: string;
      title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
      };
      status: string;
      episodes: number;
      poster: string;
      cover: string;
      rating: number;
      format: string;
    }
  ];
  trailer: {
    id: string;
  };
}

export {
  insert_Into_Array,
  slisor,
  convertTimestampToReadable,
  subToDub,
  hasRepeatedWords,
  episodeIdToEpisodeNumber,
  stringToBoolean,
  replaceId,
  removeHtmlAndMarkdown,
};
export type { AnimeInfo };