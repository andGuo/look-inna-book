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
        <Link className="text-draculaGreen hover:text-draculaCyan" href="/">
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
            <Link href="/user/orders">Orders</Link>
          </li>
          <li className="navBtn">
            <a href="/owner">Owner Page</a>
          </li>
          <li className="navBtn flex">
            <svg
              aria-hidden="true"
              className="mr-2 -ml-1 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
            </svg>
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
            <li className="navBtn py-4 text-darkText font-bold">
              {!session ? (
                <Link href="/user">Log In</Link>
              ) : (
                <button onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
              )}
            </li>

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

            <Link
              href="/user/orders"
              className="border border-solid border-black w-full"
            >
              <li className="navBtn py-4 text-darkText font-bold">Order</li>
            </Link>

            <Link
              href="/owner"
              className="border border-solid border-black w-full"
            >
              <li className="navBtn py-4 text-darkText font-bold">
                Owner Page
              </li>
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
