import { get } from "http";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Quiz() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // store the question and all the answers
  const [data, setData] = useState<{
    userName: string;
    name: string;
    quiz: { question: string; answer: string }[];
  }>({
    userName: "",
    name: "",
    quiz: [],
  });

  // creating array for question and answers
  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: "true",
    },
  ]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     name: e.target.value,
  //   }));
  // };
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
        answer: "true",
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
    setLoading(true);
    const newdata = { ...data };
    newdata.quiz = questions;
    console.log("question:", newdata);
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

  return (
    <>
      <main>
        <div className="relative bg-white px-4 pt-5 mt-5 pb-7 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <h1> Create Quiz</h1>
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
            <div className="flex justify-center items-center border-b-2">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Questions
              </h2>
            </div>
            {/** ...... Adding questions for the quiz ................... */}
            {questions.map((question, index) => {
              return (
                <>
                  <div id="questions-container " key={index} className="pt-5">
                    <div className="question mb-4">
                      <label
                        htmlFor="question"
                        className="block mb-2 font-bold text-gray-700"
                      >
                        Question 1:
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
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="inline-block bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4"
                    onClick={() => deleteQuestion(index)}
                  >
                    {" "}
                    Delete Question
                  </button>
                </>
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
              // type="submit"
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
      </main>
    </>
  );
}
