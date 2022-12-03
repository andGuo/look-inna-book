import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/Layout";
import Profile from "../../components/Profile";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout title={!session ? "Login | Look-Inna-Book" : "Profile | Look-Inna-Book"}>
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
                  User Info
                </h1>
                <Profile session={session} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
