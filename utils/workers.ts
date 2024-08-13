function insert_Into_Array(toInsertString: string, arrayToBeInsertedTo: any) {
  arrayToBeInsertedTo((prevFormat: any) => {
    if (!prevFormat.includes(toInsertString)) {
      return [...prevFormat, toInsertString];
    }
    return prevFormat;
  });
}

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

export { insert_Into_Array, slisor };
export type { AnimeInfo };
