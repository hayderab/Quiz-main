import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/db/client";

/**
 *
 * @param req
 * @param res return all the quizes from quiz table
 */
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
        });
        res.status(200).json(getQuizzes);
      } catch (error) {
        res.status(501).json(error);
      }

    default:
      break;
  }
}
