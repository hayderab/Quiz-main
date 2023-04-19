import React, { ReactNode } from "react";
import Link from "next/link";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed  items-center justify-center bg-slate-200 min-h-screen max-h-screen top-0 left-0 right-0 bottom-0">
      <div className="flex max-w-screen h-screen flex-1 m-10 flex-col space-y-5 bg-white sm:mx-4 sm:my-2 sm:rounded-2xl sm:p-6 lg:flex-row lg:space-x-10 lg:space-y-0">
        <div className="flex justify-between bg-blue-500 px-2 py-2 sm:rounded-xl lg:flex-col lg:px-4 lg:py-10">
          <nav className="flex flex-row items-center space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
            <Link
              className="smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-blue-800 hover:text-white"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
            <Link
              className="smooth-hover inline-flex justify-center rounded-md p-4 text-white/50 hover:bg-blue-800 hover:text-white"
              href="/createquiz"
            >
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
            </Link>
          </nav>
        </div>
        {/* -------Content--- */}
        <div className="flex-1 px-2 sm:px-0">{children}</div>
      </div>
    </div>
  );
}
