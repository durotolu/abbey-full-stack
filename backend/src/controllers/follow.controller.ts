import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth";

export const followUser = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (req.userId === userId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  try {
    const follow = await prisma.follow.create({
      data: {
        followerId: req.userId!,
        followingId: userId,
      },
    });
    res.json(follow);
  } catch (error) {
    res.status(500).json({ message: "Failed to follow user" });
    console.error(error);
  }
};

export const unfollowUser = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (req.userId === userId) {
    return res.status(400).json({ message: "You cannot unfollow yourself" });
  }

  try {
    const follow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: req.userId!,
          followingId: userId,
        },
      },
    });
    res.json(follow);
  } catch (error) {
    res.status(500).json({ message: "Failed to unfollow user" });
    console.error(error);
  }
};

export const getFollowers = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
      const followers = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

    res.json({
      count: followers.length,
      followers: followers.map((f) => f.follower),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get followers" });
    console.error(error);
  }
};

export const getFollowing = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params as { userId: string };
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

    res.json({
      count: following.length,
      following: following.map((f) => f.following),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get following" });
    console.error(error);
  }
};
