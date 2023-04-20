import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/db/client";

/**
 *
 * @param req quiz id
 * @param res all the questions and answers based on quiz id
 * @returns question of quiz based on id
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const quizId = req.query.id;

  try {
    const getQuesByQuizId = await prisma.question.findMany({
      where: {
        quizId: parseInt(quizId as string),
      },
    });
    res.status(200).json(getQuesByQuizId);
  } catch (error) {
    res.status(501).json({ message: "Error in database" });
  }
}
