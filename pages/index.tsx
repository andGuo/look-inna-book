import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../components/Layout";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Link from "next/link";
type Author = Database["public"]["Tables"]["authors"]["Row"];
type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
type Book = Database["public"]["Tables"]["books"]["Row"];
type CartBooks = Database["public"]["Tables"]["cart_books"]["Row"];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const { data, error } = await supabase
    .from("books")
    .select(
      "isbn, title, msrp, num_pages, img_url, publisher_id, instock_quantity"
    );

  if (error)
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };

  return {
    props: {
      books: data ?? [],
    },
  };
};

const Home = ({ books }: { books: Book[] }) => {
  const supabase = useSupabaseClient();
  const [shownBooks, setShownBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");

  async function searchForBooks(searchQuery: string) {
    try {
      if (searchQuery.trim()) {
        const { data, error } = await supabase
          .from("books")
          .select(
            "isbn, title, msrp, num_pages, img_url, publisher_id, instock_quantity"
          )
          .textSearch("title", searchQuery);

        if (error) throw error;
        if (data) setShownBooks(data);
      } else {
        const { data, error } = await supabase
          .from("books")
          .select(
            "isbn, title, msrp, num_pages, img_url, publisher_id, instock_quantity"
          );

        if (error) throw error;
        if (data) setShownBooks(data);
      }
    } catch (error) {
      console.debug(error);
    }
  }

  return (
    <Layout title={"Home | Look-Inna-Book"}>
      <div className="flex flex-wrap flex-col items-center justify-center">
        <div className="text-center text-draculaYellow text-4xl my-2">
          {shownBooks.length > 0 ? (
            <div>Welcome!</div>
          ) : (
            <div>No books found ¯\_(ツ)_/¯</div>
          )}
        </div>
        <div className="mt-4 sm:w-1/2">
          <form className="flex items-center" onSubmit={e => { e.preventDefault(); searchForBooks(searchQuery);}}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Books"
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => searchForBooks(searchQuery)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="col-span-3 grid lg:grid-cols-3 items-center p-2 m-4 lg:w-4/5 sm:w-2/3">
          {shownBooks.map((book) => (
            <div
              key={book.isbn}
              className="rounded-2xl drop-shadow-xl hover:drop-shadow-2xl bg-darkPrimary m-3"
            >
              <Link href={`/books/${book.isbn}`}>
                <div className="flex flex-col justify-center items-center p-4 max-h-max min-h-max">
                  {book.img_url ? (
                    <img
                      src={book.img_url}
                      alt="Book Image"
                      className="image"
                    />
                  ) : (
                    <div className="w-9/12 flex justify-center">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cp-svg icon-svg-book cp-format-icon"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#282a36"
                          fillRule="evenodd"
                          d="M12,4.85018126 C13.4346383,3.36081884 15.3769278,2.02591908 17.5096559,2 C17.5576778,2 17.5575953,2 17.6056172,2.00019201 C19.6637363,2.02800451 21.3714604,3.1384592 22.7339217,4.48709478 C22.7339217,4.48709478 23,4.78725723 23,5.11964368 L23,17.9998192 C23,17.9998192 22.9983512,18.0234208 22.9983512,18.039242 C22.9983512,18.8562518 22.2267034,19.0156072 21.9515565,18.8935891 C21.1947275,18.5579943 19.0247773,17.2352662 17.6812569,17.222533 C15.6184387,17.2030021 14.1138079,18.7900191 12.9733603,20.3856586 C12.9389206,20.4342653 12.8848599,20.527388 12.7998838,20.626747 C12.6635882,20.8230588 12.425746,21 12.0112944,21 L12,21 L11.9887262,21 C11.5742747,21 11.3364324,20.8230588 11.2001368,20.626747 C11.1151607,20.527388 11.0611,20.4342653 11.0266603,20.3856586 C9.88621268,18.7900191 8.38158193,17.2030021 6.31876376,17.222533 C4.97524334,17.2352662 2.80529309,18.5579943 2.04850529,18.8935891 C1.77337905,19.0156072 1.00177248,18.8562518 1.00177248,18.039242 C1.00177248,18.0234208 1,17.9998192 1,17.9998192 L1,5.11964368 C1,4.78725723 1.26603712,4.48709478 1.26603712,4.48709478 C2.62856019,3.1384592 4.33628435,2.02800451 6.39440338,2.00019201 C6.44242526,2 6.44234282,2 6.49036471,2 C8.62309285,2.02591908 10.5653823,3.36081884 12,4.85018126 Z M6.4121282,3.80478244 C5.04136103,3.82336459 3.80717799,4.61811632 2.85822021,5.49285656 C2.85822021,5.49285656 2.85492257,16.3756053 2.85492257,16.3756053 C2.90576806,16.3491163 2.95684026,16.3230683 3.00801551,16.297241 C4.96485578,15.3205149 7.34270163,15.1320436 9.2394424,16.1835045 C9.89523997,16.5470522 10.463815,17.0773947 11.0179009,17.937597 C11.0179009,17.937597 11.0121919,6.48063145 11.0121919,6.48063145 C9.80418388,5.09331505 8.32358468,3.79515104 6.4121282,3.80478244 Z M17.5878924,3.80478244 C18.9586596,3.82336459 20.1928426,4.61811632 21.1418004,5.49285656 C21.1418004,5.49285656 21.145098,16.3756053 21.145098,16.3756053 C21.0942526,16.3491163 21.0431803,16.3230683 20.9920051,16.297241 C19.0351648,15.3205149 16.657319,15.1320436 14.7605782,16.1835045 C14.1047806,16.5470522 13.5362057,17.0773947 12.9821197,17.937597 C12.9821197,17.937597 12.9878287,6.48063145 12.9878287,6.48063145 C14.1958367,5.09331505 15.6764359,3.79515104 17.5878924,3.80478244 Z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <div className="flex flex-col justify-center px-2 py-4 mx-2 text-2xl text-darkText text-center">
                    <div className="text-draculaCyan">{`${book.title}`} </div>{" "}
                    <div>-</div>{" "}
                    <div className="text-draculaPurple">{`$${book.msrp.toFixed(
                      2
                    )}`}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
