import { Router } from "express";
import {
  trending,
  streamingEpisodeLink,
  search,
  steamingServerSources,
  popular,
  anime_Info,
  dub_Episodes,
  recent_Episodes,
  advanced_Search,
  random_Anime,
} from "../controllers/anime-controller.js";

const router = Router();

router.post("/trending", trending);
router.post("/recent", recent_Episodes);
router.post("/info", anime_Info);
router.post("/stream", streamingEpisodeLink);
router.post("/search", search);
router.post("/sources", steamingServerSources);
router.post("/popular", popular);
router.post("/dub-episodes", dub_Episodes);
router.post("/advance-search", advanced_Search);
router.get("/random", random_Anime);

export default router;
