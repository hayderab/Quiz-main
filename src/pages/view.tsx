import React from "react";

export default function view() {
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
        <div className="grid grid-rows-3 mt-5 bg-white px-4 pt-5 pb-7 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="p-4 m-4 border-b-2  text-xl font-semibold">
            <h1>
              {" "}
              The red supergiant star Betelgeuse belongs to the constellation of
              Gemini.
            </h1>
          </div>
          <div className="flex items-center mb-4  p-4 m-4 rounded-md border-1 border">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center  p-4 m-4 rounded-md border-1 border">
            <input
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checked-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
          </div>
          <div className="flex justify-end">
          <button className="flex items-center justify-between w-32">
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
      </main>
    </>
  );
}
