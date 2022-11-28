import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <Layout title="Login | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-16 sm:flex-row sm:items-start sm:justify-center">
        <div className="w-1/3">
        <h1>Look-Inna-Book</h1>
          {!session ? (
            <Auth
              providers={["github", "google", "linkedin"]}
              socialLayout="horizontal"
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              magicLink
              theme="dark"
            />
          ) : (
            <p>Account page will go here.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
