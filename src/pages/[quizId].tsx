import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Question } from "@prisma/client";

type QuizPageProps = {
  quiz: Question[];
};

//

const getQuizById = async (quizId: number) => {
  const response = await fetch(`http://127.0.0.1:3000/api/quiz/${quizId}`);
  const data = await response.json();

  // console.log("data in dynamic page:", data);
  return data;
};

export default function View({ quiz }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();
  // console.log("ddd", quiz[1].text);
  if (router.isFallback) {
    return <div>Loading ............</div>;
  }

  const handleAnswerSelected = (answer: boolean) => {
    // Check if the selected answer is correct
    if (answer === quiz[currentQuestionIndex].answer && quiz.length - 1) {
      setScore(score + 1);
    }
    // Move to the next question
    // if (currentQuestionIndex < quiz.length - 1) {
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // }
  };
  const isLastQuestion = currentQuestionIndex === quiz.length;
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
        <div className="grid grid-rows-3 mt-20 bg-slate-50 px-4 pt-5 pb-7 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          {/* <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              // style={"width: 45%"}
            ></div>
          </div> */}

          <div className="p-4 m-4 border-b-2  text-xl font-semibold">
            <h1>{quiz[currentQuestionIndex].text}</h1>
          </div>

          <div className="gird-rows-2 m-4 grid gap-2 p-2">
            <div>
              <input
                className="peer sr-only m-4"
                type="radio"
                value="true"
                name="answer"
                id="answer_true"
                onChange={() => handleAnswerSelected(true)}
              />
              <label
                className="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-5 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-green-500"
                htmlFor="answer_true"
              >
                True
              </label>
            </div>
            <div>
              <input
                className="peer sr-only m-4"
                type="radio"
                value="false"
                name="answer"
                onChange={() => handleAnswerSelected(false)}
                id="answer_false"
              />
              <label
                className="flex cursor-pointer rounded-lg border border-gray-300 bg-white p-5 hover:bg-gray-50 focus:outline-none peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-green-500"
                htmlFor="answer_false"
              >
                False
              </label>
            </div>
          </div>
          <div>
            {isLastQuestion ? (
              <div>
                <p>
                  Your score: {score} out of {quiz.length}
                </p>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  className="flex justify-between w-32"
                  onClick={() => {
                    if (currentQuestionIndex !== quiz.length - 1) {
                      setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                  }}
                >
                  <span>Next</span>
                  <span className="flex items-center ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // generate paths for all quizzes
    const quizzes = await (
      await fetch(`http://127.0.0.1:3000/api/quiz`)
    ).json();
    // slower build, but faster initial page load
    const paths = quizzes.map((quiz: any) => ({
      params: { quizId: quiz.id.toString() },
    }));
    return {
      paths: [],
      fallback: true,
    };
  } catch (error) {
    console.log("localhost not aviliable during build ");
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<QuizPageProps> = async (
  context
) => {
  const quizId = context.params?.quizId;
  const quiz = await getQuizById(parseInt(quizId as string)); // convert quizId to a number and fetch data based on quiz id...
  if (!quiz) {
    return { notFound: true };
  }

  console.log("get static props");
  return {
    props: {
      quiz,
    },
    revalidate: 20, // revalidate every 10 second
  };
};
