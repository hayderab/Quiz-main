import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const quizId = req.query.id;

  // console.log("quizId in api call", quizId);

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
