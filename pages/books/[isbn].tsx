import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
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

const BookSalePage = ({ book, authors, publisher }: { book: Book, authors: Author, publisher: Publisher }) => {

  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout title={`${book.title} | Look-Inna-Book`}>
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                {`Title: ${book.title}`}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookSalePage;
