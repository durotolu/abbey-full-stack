import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing } from "../controllers/follow.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/:userId", authMiddleware, followUser);
router.delete("/:userId", authMiddleware, unfollowUser);
router.get("/:userId/followers", authMiddleware, getFollowers);
router.get("/:userId/following", authMiddleware, getFollowing);

export default router;
