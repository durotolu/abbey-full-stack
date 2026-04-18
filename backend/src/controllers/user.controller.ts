import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth";

export const getUsers = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const users = await prisma.user.findMany({
    where: { id: { not: userId } },
  });

  res.json(users);
};
