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
  sub_Episodes,
  get_Board,
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
router.post("/sub-episodes", sub_Episodes);
router.get("/random", random_Anime);
router.get("/board", get_Board);

export default router;
