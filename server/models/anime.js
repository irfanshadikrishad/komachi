import { Schema, model } from "mongoose";

const animeSchema = Schema({
  title: String,
  description: String,
  poster: String,
  isAdult: Boolean,
  type: String,
  status: String,
  totalEpisodes: Number,
  released: String,
  audioType: String,
  episodes: [{ episodeNumber: Number, episodeUrl: String }],
  genre: [String],
});

const Anime = model("Anime", animeSchema);

export default Anime;
