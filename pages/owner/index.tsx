import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Layout from "../../components/Layout";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout title="Dashboard | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <h1 className="text-draculaCyan text-3xl pb-4 text-center">
              Owner Management Page
            </h1>
            <ul className="grid-cols-3 list-disc">
              <li className="redirectButton">
                <Link href="add/book">Add New Book</Link>
              </li>
              <li className="redirectButton">
                <Link href="remove/book">Remove Books</Link>
              </li>
              <li className="redirectButton">
                <Link href="add/author">Add Author</Link>
              </li>
              <li className="redirectButton">
                <Link href="add/publisher">Add Publisher</Link>
              </li>
              <li className="redirectButton">
                <Link href="add/genre">Add Genre</Link>
              </li>
              <li className="redirectButton">
                <Link href="report">Generate Report</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
