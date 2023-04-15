import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Quizes</title>
      </Head>
      <main>
        <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen">
          <div className="flex flex-col items-center pb-3">
            <h1 className="font-bold text-5xl mt-5 tracking-tight">Quizes</h1>
            <p className="text-neutral-500 text-xl mt-3">
              Test your knowledge on different topics
            </p>
          </div>
          <div className="relative bg-gray-100 px-4 pt-5 pb-7 hover:cursor-pointer hover:shadow-md border-1 border ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="flex justify-center mx-auto max-w-md ">
              {" "}
              {/* <span>Add more quizes </span> */}
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
          <br></br>
          <div className="relative bg-white px-4 pt-5 pb-7 hover:cursor-pointer shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
            <div className="mx-auto max-w-md ">Quiz 01 React JS</div>
          </div>
        </div>
      </main>
    </>
  );
}
