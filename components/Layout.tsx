import * as React from "react";
import { NextPage } from "next";
import Head from "next/head";
import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout: NextPage<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
      </Head>
      <div className="flex justify-center min-h-screen bg-gradient-to-br from-darkSecondary to-gray-700 text-darkPrimary">
        <div className="flex flex-col grow max-w-7xl">
          <NavBar />
          <div className="flex flex-col flex-grow justify-between">
            <div className="content">{children}</div>
            <footer className="flex justify-center align-middle content-start mt-4 mb-16 auto-cols-auto">
              <svg
                className="pt-0.5 h-7 text-draculaPurple fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-10 -5 1034 1034"
                version="1.1"
              >
                <path 
                  d="M500 177q-115 0 -214 58q-96 57 -153 153q-58 99 -58 214t58 214q57 96 153 153q99 58 214 58t214 -58q96 -57 153 -153q58 -99 58 -214t-58 -214q-57 -96 -153 -153q-99 -58 -214 -58zM496 264h3h1q92 0 171 46q76 45 121 121q46 79 46 171t-46 171q-45 76 -121 121 q-79 46 -171 46t-171 -46q-76 -45 -121 -121q-46 -79 -46 -170.5t45 -170.5q44 -76 120 -121q77 -46 169 -47zM497 363q-56 0 -104.5 24t-82 66.5t-45.5 94.5h114q15 -34 47 -55t71 -21q35 0 65 17.5t47.5 47.5t17.5 65t-17.5 65t-47.5 47.5t-65 17.5q-39 0 -71 -21t-47 -54 h-114q12 52 45.5 94t82 66t104.5 24q64 0 119 -32.5t87 -87t32 -119.5t-32 -119.5t-87 -87t-119 -32.5z"
                />
              </svg>
              <p className="px-0.5 py-0.5">
                <a
                  className="text-darkText px-0.5 font-bold hover:text-draculaCyan hover:underline"
                  href="https://github.com/andGuo"
                  target="_blank"
                  rel="noreferrer"
                >
                  andGuo 2022
                </a>
                <span className="font-bold text-lg">|</span>
                <span className="text-xs text-draculaPink px-0.5">
                  Powered by
                  <a
                    className="text-darkText hover:text-draculaCyan hover:underline px-1"
                    href="https://nextjs.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NextJS
                  </a>
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
