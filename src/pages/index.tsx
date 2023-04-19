import Head from "next/head";
import Link from "next/link";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import Loading from "components/loading";
import Layout from "components/layout";


//fetching questions ,base url is used so fetch can be done in staticprops as well
const getQuizData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz`);
  const data = await response.json();
  return data;
};

export default function Home() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuizData,
  });

  // console.log(isLoading);
  // console.log(data);
  if (error) return <div>Data Error </div>;

  return (
    <>
      <Head>
        <title>Quizzes</title>
      </Head>
      <main>
        <Layout>
          <div className="max-w-screen-xl mx-auto px-5 bg-white h-[90%] overflow-auto">
            <div className="flex flex-col items-center pb-3">
              <h1 className="font-bold text-5xl mt-5 tracking-tight">Quizzes</h1>
              <p className="text-neutral-500 text-xl mt-3">
                Test your knowledge on different topics
              </p>
            </div>
            <Link href={"/createquiz"}>
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
            </Link>
            <br></br>
            {isLoading ||
              (!data && (
                <>
                  <Loading></Loading>
                </>
              ))}
            {data?.map((quiz: any, index: number) => (
              <Link href={`/${quiz.id}`} key={index}>
                <div
                  key={index}
                  className="relative m-2 bg-white px-4 pt-5 pb-7 hover:cursor-pointer shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10"
                >
                  <h1 className="mx-auto max-w-md font-bold ">
                    {quiz.userName}
                  </h1>
                  <h1 className="mx-auto max-w-md font-bold ">{quiz.name}</h1>
                </div>
              </Link>
            ))}
          </div>
        </Layout>
      </main>
    </>
  );
}

//dehydration for caching
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["quiz"], getQuizData); // get quiz data fetched from  api

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 5, // revalidate every 5 second
  };
}
