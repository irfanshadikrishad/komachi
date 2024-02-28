import { search, singleAnime } from "../controllers/native-anime.js";
import { Router } from "express";

const router = Router();

router.get("/search/:name", search);
router.post("/single", singleAnime);

export default router;
