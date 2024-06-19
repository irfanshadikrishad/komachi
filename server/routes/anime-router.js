import { Router } from "express";
import {
  trending,
  recentEpisodes,
  animeInfo,
  streamingEpisodeLink,
  search,
  steamingServerSources,
  popular,
  dubEpisodes,
  advanceSearch,
  random_Anime,
} from "../controllers/anime-controller.js";

const router = Router();

router.post("/trending", trending);
router.post("/recent", recentEpisodes);
router.post("/info", animeInfo);
router.post("/stream", streamingEpisodeLink);
router.post("/search", search);
router.post("/sources", steamingServerSources);
router.post("/popular", popular);
router.post("/dub-episodes", dubEpisodes);
router.post("/advance-search", advanceSearch);
router.get("/random", random_Anime);

export default router;
