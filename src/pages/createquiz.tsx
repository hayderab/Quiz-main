import { get } from "http";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "components/layout";
import { type } from "os";
interface FormData {
  userName: string;
  name: string;
  quiz: any[]; // replace "any[]" with the appropriate type for your quiz data
}
export default function Quiz() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // store the question and all the answers
  const [data, setData] = useState<FormData>({
    userName: "",
    name: "",
    quiz: [], //saving question and answers here
  });

  // creating array for question and answers
  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: "true",
    },
  ]);

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // on add  new question empty form data is created
  const addQuestions = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "True",
      },
    ]);
  };
  /**
   *
   * @param index get the index of question you want to delete
   * assign updated array
   */
  const deleteQuestion = (index: any) => {
    let newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  // collect data from all the question and send them to database
  const collectdata = (e: any) => {
    e.preventDefault();
    // Check if all fields are filled
    if (
      data.userName === "" ||
      data.name === "" ||
      questions.some((q) => q.question === "")
    ) {
      // Handle error, show error message or prevent API call
      setError(true);
      return;
    }
    setLoading(true);
    const newdata = { ...data };
    newdata.quiz = questions;
    // console.log("question:", newdata);

    fetch("/api/quiz/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newdata),
    })
      .then((response) => {
        console.log(response);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("data:", data);
  }, [data]);

  /**
   * generate questions based on topic through openAI
   */
  async function generateQuestions() {
    if (data.name === "") {
      alert("add topic");
      return;
    }

    setLoading(true);

    await fetch("/api/quiz/generatequiz", {
      method: "POST",
      body: JSON.stringify({ topic: data.name }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        // Extract data from the response
        // console.log("data.result: ", data.result.trim());
        const generatedQuestions = eval(data.result.trim()); // remove whitespace and convert it to array [{question:"", answer:""}]

        // console.log("data from openai", typeof generatedQuestions);
        setQuestions(generatedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        // Handle error
        console.error("Error:", error);
      });
  }
  console.log("set question data", questions);
  return (
    <>
      <Head>
        <title>Create Quiz</title>
      </Head>
      <Layout>
        <div className="relative bg-white px-4 pt-5 mt-5 pb-7 max-h-[90%] overflow-auto  ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <h1 className="flex justify-center items-center text-xl font-bold">
            {" "}
            Create Quiz
          </h1>
          {error && (
            <div className="flex justify-center items-center p-2 m-3">
              {" "}
              <h1 className="text-red-500"> Fill all the boxes </h1>{" "}
            </div>
          )}
          <div className="">
            <form>
              <div className="flex justify-between p-2">
                <div className="mb-4">
                  <label
                    htmlFor="userName"
                    className="block mb-2 font-bold text-gray-700 "
                  >
                    Enter Username
                  </label>
                  <input
                    type="text"
                    id="userName"
                    onChange={handleChange}
                    value={data.userName}
                    name="userName"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-gray-700 "
                  >
                    Topic of quiz
                  </label>
                  <input
                    type="text"
                    id="name"
                    onChange={handleChange}
                    value={data.name}
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between items-center border-b-2">
                <h2 className="mb-2 text-xl font-bold text-gray-800">
                  Questions
                </h2>
                <button
                  className="flex justify-between m-2"
                  onClick={generateQuestions}
                >
                  {loading ? (
                    <>
                      <div
                        className="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent px-2 "
                      ></div>
                      Generating ...
                    </>
                  ) : (
                    <div className="flex ">
                      <span>Auto Geneate</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 ml-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
              {/** ...... Adding questions for the quiz ................... */}
              {questions.map((question, index) => {
                return (
                  <React.Fragment key={index}>
                    {" "}
                    <div id="questions-container " key={index} className="pt-5">
                      <div className="question mb-4">
                        <label
                          htmlFor="question"
                          className="block mb-2 font-bold text-gray-700"
                        >
                          Question {index}:
                        </label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => {
                            const newQuestion = [...questions];
                            newQuestion[index]["question"] = e.target.value;
                            setQuestions(newQuestion);
                          }}
                          id="question"
                          name="question"
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />

                        <label
                          htmlFor="answer"
                          className="block mt-2 mb-1 font-bold text-gray-700"
                        >
                          Answer:
                        </label>
                        <select
                          id="answer"
                          name="answer"
                          onChange={(e) => {
                            const newQuestion = [...questions];
                            newQuestion[index]["answer"] = e.target.value;
                            setQuestions(newQuestion);
                          }}
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        >
                          <option value="true">{question.answer}</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                    <button
                      className="inline-block bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4"
                      onClick={() => deleteQuestion(index)}
                    >
                      {" "}
                      Delete
                    </button>
                  </React.Fragment>
                );
              })}
              {/** ...... Adding questions for the quiz ................... */}
              <button
                onClick={addQuestions}
                type="button"
                id="add-question-btn"
                className="inline-block mt-4 shadow-sm mr-2  text-blue-100  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 "
              >
                Add Question
              </button>

              <button
                type="submit"
                onClick={collectdata}
                className="inline-flex items-center justify-center px-5 py-2.5  mt-4 font-bold text-white-100 bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-700 focus:outline-none focus:ring-outline-green active:bg-green-800"
              >
                {loading ? (
                  <>
                    <div
                      className="w-5 h-5 rounded-full animate-spin
                    border-2 border-solid border-white border-t-transparent px-2 "
                    ></div>
                    creating ...
                  </>
                ) : (
                  "Create Quiz"
                )}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}
