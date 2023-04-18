import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Question } from "@prisma/client";
import Loading from "Components/loading";
import CircularProgressbar from "Components/CircleBar";
import ProgressBar from "Components/ProgressBar";
import Link from "next/link";

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
  const [answer, setAnswer] = useState<boolean | null>(null);
  const router = useRouter();
  // console.log("ddd", quiz.length);
  if (router.isFallback) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  const handleNext = () => {
    // Check if the selected answer is correct and update the score
    if (answer !== null && answer === quiz[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    // Reset the answer for the next question
    setAnswer(null);
    // Move to the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const isLastQuestion = currentQuestionIndex === quiz.length;
  const progressPercentage = (currentQuestionIndex / quiz.length) * 100;

  return (
    <>
      <main className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
        <div className="grid grid-rows-1 mt-20 bg-slate-50 px-4 pt-5  shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div>
            {/**---------Progress bar ---------------- */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            {/* <ProgressBar progress={currentQuestionIndex} total={quiz.length} /> */}
            {isLastQuestion ? (
              <div>
                <div className="flex justify-center items-center m-2">
                  <h1 className="text-xl font-bold">Your score</h1>
                  <div className="w-20 h-20 m-4 ">
                    <CircularProgressbar value={score} maxValue={quiz.length} />
                  </div>{" "}
                </div>
                <Link href={"/"}>
                  <button className="flex justify-start">
                    {" "}
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
                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                      />
                    </svg>
                    <span className="ml-3">Home</span>
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="p-4 m-4 border-b-2  text-xl font-semibold">
                  <h1>{quiz[currentQuestionIndex].text}</h1>
                </div>

                <div className="grid grid-rows-2 m-4 gap-2 p-2">
                  <div>
                    <input
                      className="peer sr-only m-4"
                      type="radio"
                      value="true"
                      name="answer"
                      id="answer_true"
                      checked={answer === true}
                      onChange={() => setAnswer(true)}
                    />
                    <label
                      className={`flex cursor-pointer rounded-lg border border-gray-300 bg-white p-5 hover:bg-gray-50 focus:outline-none ${
                        answer === true
                          ? "peer-checked:bg-blue-500 peer-checked:text-white"
                          : ""
                      }`}
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
                      id="answer_false"
                      checked={answer === false}
                      onChange={() => setAnswer(false)}
                    />
                    <label
                      className={`flex cursor-pointer rounded-lg border border-gray-300 bg-white p-5 hover:bg-gray-50 focus:outline-none ${
                        answer === false
                          ? "peer-checked:bg-blue-500 peer-checked:text-white"
                          : ""
                      }`}
                      htmlFor="answer_false"
                    >
                      False
                    </label>
                  </div>
                </div>
                <div className="flex justify-end m-2">
                  <button
                    className="flex justify-between w-32 m-3"
                    onClick={handleNext}
                    disabled={answer === null} // disable button if no answer selected
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
