import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.get("/", authMiddleware, getUsers);

export default router;
