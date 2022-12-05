import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
type Author = Database["public"]["Tables"]["authors"]["Row"];
type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
type Book = Database["public"]["Tables"]["books"]["Row"];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const isbn_id = ctx?.params?.isbn || ctx?.query?.isbn;

  const { data: books, error: e1 } = await supabase
    .from("books")
    .select("title, msrp, num_pages, img_url, publisher_id, instock_quantity")
    .eq("isbn", isbn_id)
    .single();

  const { data: authors, error: e2 } = await supabase
    .from("authored")
    .select("author_id (first_name, middle_name, last_name)")
    .eq("isbn", isbn_id);

  const { data: publisher, error: e3 } = await supabase
    .from("publishers")
    .select("name, email")
    .eq("publisher_id", books?.publisher_id);

  console.log(books, authors, publisher);

  if (e1 || e2 || e3)
    return {
      redirect: {
        destination: "/sorry",
        permanent: false,
      },
    };

  return {
    props: {
      book: books ?? [],
      authors: authors ?? [],
      publisher: publisher ?? [],
    },
  };
};

const BookSalePage = ({
  book,
  authors,
  publisher,
}: {
  book: Book;
  authors: any[];
  publisher: Publisher[];
}) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [quantity, setQuantity] = useState(0);

  return (
    <Layout
      title={
        !session
          ? "Login | Look-Inna-Book"
          : `${book.title} [In-Stock] | Look-Inna-Book`
      }
    >
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            {!session ? (
              <div>
                <h1 className="text-draculaGreen text-3xl pb-4 text-center">
                  User Login
                </h1>
                <Auth
                  /*providers={["github", "google", "linkedin"]}*/
                  socialLayout="horizontal"
                  supabaseClient={supabase}
                  appearance={{ theme: ThemeSupa }}
                  magicLink={true}
                  redirectTo={"${host}"}
                  theme="dark"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-draculaPink text-3xl pb-4 text-center">
                  {`Title: ${book.title}`}
                </h1>
                <div className="text-darkText text-2xl flex flex-col">
                  <span>${book.msrp}</span>
                  <span>Number of pages: {book.num_pages}</span>
                  <span>Authored by:</span>
                  <ul className="list-disc">
                    {authors.map((author) => (
                      <li>{`${author.author_id.first_name} ${author.author_id.middle_name} ${author.author_id.last_name}`}</li>
                    ))}
                  </ul>
                  <span>Published by: </span>
                  {publisher.map((publisher) => (
                    <span>
                      {`${publisher.name} - (${publisher.email})`}
                    </span>
                  ))}
                  <span>Remaining Stock: {book.instock_quantity}</span>
                </div>
                <label htmlFor="quantity" className="block mb-6">
                  <span className="text-darkText">Purchase Quantity:</span>
                  <NumericFormat
                    allowNegative={false}
                    id="quantity"
                    value={quantity || ""}
                    onValueChange={(v) => {
                      setQuantity(Number(v.value));
                    }}
                    className="inputField"
                    placeholder="ex. 10"
                    decimalScale={0}
                    isAllowed={(v) => {
                      return Number(v.value) <= book.instock_quantity ?? 0;
                    }}
                    disabled={book.instock_quantity <= 0}
                  />
                </label>
                <div className="mb-6 flex justify-end">
                  <button
                    type="submit"
                    className="saveButton"
                    onClick={() => {}}
                    disabled={book.instock_quantity <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookSalePage;
