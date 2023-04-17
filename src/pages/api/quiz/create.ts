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
  const { name, quiz } = req.body;
  console.log("question in api  ", quiz);

  try {
    const createQuiz = await prisma.quiz.create({
      data: {
        name: name,
        questions: {
          create: quiz.map(
            (question: { question: string; answer: string }) => ({
              text: question.question,
              answer: question.answer === "true",
            })
          ),
        },
      },
      // include: {
      //   questions: true,
      // },
    });

    res.status(201).json(createQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
