import { Router } from "express";
import {
  login,
  register,
  authorizedUser,
} from "../controllers/auth-controller.js";
import isAuthorized from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/user", isAuthorized, authorizedUser);

export default router;
