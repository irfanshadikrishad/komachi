import { Schema, model, models } from "mongoose";

const animeSchema = new Schema(
  {
    anilistId: {
      type: String,
      required: true,
    },
    malId: { type: String },
    title: {
      english: String,
      romaji: String,
      native: String,
      userPreferred: String,
    },
    description: String,
    poster: String,
    cover: String,
    sub_episodes: [{}],
    dub_episodes: [{}],
    origin: String,
    format: String,
    duration: String,
    status: String,
    airing_start: {
      year: String,
      month: String,
      day: String,
    },
    airing_end: {
      year: String,
      month: String,
      day: String,
    },
    genres: [String],
    synonyms: [String],
    isAdult: String,
    nextAiringEpisode: [
      {
        airingTime: Number,
        timeUntilAiring: Number,
        episode: Number,
      },
    ],
    totalEpisodes: Number,
    studios: [String],
    recommendations: [
      {
        animeId: String,
        malId: String,
        title: {
          romaji: String,
          english: String,
          native: String,
          userPreferred: String,
        },
        status: String,
        episodes: Number,
        poster: String,
        cover: String,
        rating: Number,
        format: String,
      },
    ],
  },
  { timestamps: true }
);

// Use the same model name in both the check and the creation
const Anime = models.ANIME || model("ANIME", animeSchema);

export default Anime;
