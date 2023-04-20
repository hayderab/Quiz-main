import React, { useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Question } from "@prisma/client";
import Loading from "components/loading";
import CircularProgressbar from "components/CircleBar";
import ProgressBar from "components/ProgressBar";
import Link from "next/link";
import Layout from "components/layout";
import Head from "next/head";
type QuizPageProps = {
  quiz: Question[];
};

//getting data from api and resturn json
const getQuizById = async (quizId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/${quizId}`
  );
  const data = await response.json();

  return data;
};

export default function View({ quiz }: QuizPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // question incrementation based
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const router = useRouter();

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

  // checking when to show the score
  const isLastQuestion = currentQuestionIndex === quiz.length;

  return (
    <>
      <Head>
        <title>View Quiz</title>
      </Head>
      <Layout>
        <div className="grid grid-rows-1 mt-20 bg-slate-50 px-4 pt-5  shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div>
            <ProgressBar progress={currentQuestionIndex} total={quiz.length} />
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
      </Layout>
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
      paths: paths,
      fallback: false, // if page does not exist show 404
    };
  } catch (error) {
    console.log("localhost not aviliable during build ");
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps<QuizPageProps> = async (
  context
) => {
  try {
    const quizId = context.params?.quizId;
    const quiz = await getQuizById(parseInt(quizId as string));
    if (!quiz || quiz.length === 0) {
      return { notFound: true };
    }

    // console.log("get static props");
    return {
      props: {
        quiz,
      },
      revalidate: 5, // revalidate every 5 second
    };
  } catch (error) {
    return { notFound: true };
  }
};
