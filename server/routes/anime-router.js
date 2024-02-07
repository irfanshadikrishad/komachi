import { Router } from "express";
import {
  trending,
  recentEpisodes,
  animeInfo,
  streamingEpisodeLink,
  search,
  steamingServerSources,
} from "../controllers/anime-controller.js";

const router = Router();

router.get("/trending", trending);
router.post("/recent", recentEpisodes);
router.post("/info", animeInfo);
router.post("/stream", streamingEpisodeLink);
router.post("/search", search);
router.post("/sources", steamingServerSources);

export default router;
