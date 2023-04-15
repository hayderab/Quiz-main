import React from "react";
import { useState } from "react";
export default function quiz() {
  
 const [formData, setFormData] = useState({
  name: "",
  question: ""
 })
  

  return (
    <>
      <main>
        <div className="relative bg-white px-4 pt-5 mt-5 pb-7  ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <h1> Create Quiz</h1>
          <form className="mx-auto max-w-md m-4 p-2">
            <div className="mb-4">
              <label
                htmlFor="quiz-name"
                className="block mb-2 font-bold text-gray-700 "
              >
                Name of quiz
              </label>
              <input
                type="text"
                id="quiz-name"
                name="quiz-name"
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-center items-center border-b-2">
              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Questions
              </h2>
            </div>
            <div id="questions-container" className="pt-5">
              <div className="question mb-4">
                <label
                  htmlFor="question-1"
                  className="block mb-2 font-bold text-gray-700"
                >
                  Question 1:
                </label>
                <input
                  type="text"
                  id="question-1"
                  name="question-1"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />

                <label
                  htmlFor="answer-1"
                  className="block mt-2 mb-1 font-bold text-gray-700"
                >
                  Answer:
                </label>
                <select
                  id="answer-1"
                  name="answer-1"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              id="add-question-btn"
              className="inline-blockmt-4 shadow-sm mr-2  text-blue-100  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 "
            >
              Add Question
            </button>
            <button
              type="submit"
              className="inline-block px-5 py-2.5  mt-4 font-bold text-white-100 bg-gradient-to-r from-green-500 to-green-700 hover:bg-green-700 focus:outline-none focus:ring-outline-green active:bg-green-800"
            >
              Create Quiz
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
