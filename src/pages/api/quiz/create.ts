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
  const { userName, name, quiz } = req.body;
  // console.log("question in api  ", quiz);

  try {
    // Find the user by name or create a new user if not found
    const user = await prisma.user.upsert({
      where: { userName: userName },
      create: { userName: userName },
      update: { userName: userName },
    });

    // Create a new quiz with the associated questions
    const createQuiz = await prisma.quiz.create({
      data: {
        name: name.trim(),
        createrId: user.userId,
        questions: {
          create: quiz.map((question: { question: any; answer: any }) => ({
            text: question.question,
            answer: question.answer.toLowerCase() === "true", // saving  boolean
          })),
        },
      },
    });

    res.status(201).json(createQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
