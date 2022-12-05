import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { useUser, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
type Author = Database["public"]["Tables"]["authors"]["Row"];
type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
type Book = Database["public"]["Tables"]["books"]["Row"];
type CartBooks = Database["public"]["Tables"]["cart_books"]["Row"];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const isbn_id = ctx?.params?.isbn || ctx?.query?.isbn;

  const { data: books, error: e1 } = await supabase
    .from("books")
    .select("isbn, title, msrp, num_pages, img_url, publisher_id, instock_quantity")
    .eq("isbn", isbn_id)
    .single();

  const { data: authors, error: e2 } = await supabase
    .from("authored")
    .select("author_id (author_id, first_name, middle_name, last_name)")
    .eq("isbn", isbn_id);

  const { data: publisher, error: e3 } = await supabase
    .from("publishers")
    .select("publisher_id, name, email")
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
  const user = useUser();

  async function addToCart({
    isbn,
    purchase_quantity,
  }: {
    isbn:CartBooks["isbn"];
    purchase_quantity:CartBooks["quantity"];
  }) {
    try {
      if (!user) throw new Error("No user");
      if (
        !isbn ||
        !purchase_quantity
      ) {
        throw new Error("Add to Cart Info Incomplete");
      }
  
      const newCartBook = {
        cart_id: user.id,
        isbn,
        quantity: purchase_quantity,
      };
  
      let { data, error } = await supabase.rpc("add_to_cart", newCartBook);
  
      if (error) console.error(error);
      if (error) throw error;
      alert("Added to cart!");
    } catch (error) {
      alert("Error unable to add to cart!");
      console.log(error);
    }
  }

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
                <div className="text-darkText text-xl flex flex-col gap-2 pb-2">
                  <span className="text-2xl">${book.msrp} CAD</span>
                  <div>
                    <span className="text-draculaYellow">Number of pages:</span>
                    <span>
                      {" "}
                      {book.num_pages}
                    </span>
                  </div>
                  <div>
                    <span className="text-draculaYellow">Authored by:</span>
                    <ul className="list-disc list-inside">
                      {authors.map((author) => (
                        <li key={author.author_id.author_id} className="text-lg">{`${author.author_id.first_name} ${author.author_id.middle_name} ${author.author_id.last_name}`}</li>
                      ))}
                    </ul>
                  </div>
                  {publisher.map((publisher) => (
                    <div key={publisher.publisher_id} className="flex flex-col">
                      <span className="text-draculaYellow">Published by: </span>{" "}
                      <span className="text-lg">{`${publisher.name} - (${publisher.email})`}</span>
                    </div>
                  ))}
                  <div>
                    <span className="text-draculaYellow">Remaining Stock:</span>
                    <span>
                      {" "}
                      {book.instock_quantity || "0 - (Out of Stock!)"}
                    </span>
                  </div>
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
                    onClick={() =>
                      addToCart({
                        isbn: book.isbn,
                        purchase_quantity: quantity,
                      })
                    }
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
