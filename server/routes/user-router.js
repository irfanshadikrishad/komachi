import { Router } from "express";
import { updateList } from "../controllers/user-controller.js";
import isAuthorized from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/updatelist", isAuthorized, updateList);

export default router;
