import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/Layout";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout title="Login | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-16 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-10 rounded-3xl shadow-xl">
            <h1 className="text-draculaYellow text-3xl pb-4 text-center">
              Owner Login
            </h1>
            {!session ? (
              <Auth
                providers={["github", "google", "linkedin"]}
                socialLayout="horizontal"
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                showLinks={false}
                redirectTo={'${host}/user'}
                theme="dark"
              />
            ) : (
              <p>Account page will go here.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
