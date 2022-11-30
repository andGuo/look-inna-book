import * as React from "react";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const NavBar = () => {
  const [openNavMenu, setNavMenuOpen] = React.useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <nav className="flex flex-wrap items-center justify-between content-end pt-5">
      <div className="flex items-center logo h-12 px-6 py-3 text-5xl font-bold">
        <Link className="text-darkText hover:text-draculaCyan" href="/">
          Look-Inna-Book
        </Link>
      </div>
      <div className="flex items-center pr-1.5">
        <ul className="hidden sm:flex p-3 text-xl items-center justify-evenly">
          <li className="navBtn">
            {!session ? (
              <Link href="/user">Log In</Link>
            ) : (
              <button
                className="button block"
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
            )}
          </li>
          <li className="navBtn">
            <Link href="/user">Profile</Link>
          </li>
          <li className="navBtn">
            <Link href="/owner">Owner Page</Link>
          </li>
          <li className="navBtn">
            <Link href="/checkout">Cart</Link>
          </li>
        </ul>
        <div className="sm:hidden">
          {openNavMenu ? (
            <div className="mt-2.5 pr-3">
              <button
                onClick={() => setNavMenuOpen(false)}
                type="button"
                className="select-none text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="mt-2.5 pr-3">
              <button
                onClick={() => setNavMenuOpen(true)}
                type="button"
                className="select-none text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {openNavMenu && (
        <div className="sm:hidden basis-full bg-lightPrimar mt-6 mb-4">
          <ul className="flex text-xl flex-col items-center justify-evenly">
            <Link
              href="/user"
              className="border border-solid border-black w-full"
            >
              <li className="navBtn py-4 text-darkText font-bold">Profile</li>
            </Link>
            <Link
              href="/checkout"
              className="border border-solid border-black w-full"
            >
              <li className="navBtn py-4 text-darkText font-bold">Cart</li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
