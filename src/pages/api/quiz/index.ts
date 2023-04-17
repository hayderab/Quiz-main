import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const getQuizzes = await prisma.quiz.findMany({
          include: {
            questions: false,
          },
          //   orderBy: {
          //     createdAt: "desc",
          //   }
        });
        res.status(200).json(getQuizzes);
      } catch (error) {
        res.status(501).json(error);
      }

    default:
      break;
  }
}
