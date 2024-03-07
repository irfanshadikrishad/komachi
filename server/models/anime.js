import { Schema, model } from "mongoose";

const animeSchema = Schema(
  {
    title: String,
    description: String,
    poster: String,
    isAdult: Boolean,
    format: String,
    status: String,
    totalEpisodes: Number,
    aired: String,
    genre: [String],
    episodes: [{ id: Number, url: String }],
  },
  { timestamps: true }
);

const Anime = model("Anime", animeSchema);

export default Anime;
