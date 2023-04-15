import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/db/client";
/**
 *
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, questions } = req.body;

  try {
    const quiz = await prisma.quiz.create({
      data: {
        name,
        questions: {
          create: questions.map((question: { text: any; answer: any; }) => ({
            text: question.text,
            answer: question.answer,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
