import { search, singleAnime, latest } from "../controllers/native-anime.js";
import { Router } from "express";

const router = Router();

router.get("/search/:name", search);
router.post("/single", singleAnime);
router.get("/latest", latest);

export default router;
