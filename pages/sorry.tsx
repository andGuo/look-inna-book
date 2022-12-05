import Link from "next/link";
import Layout from "../components/Layout";

const Sorry = () => {
  return (
    <Layout title="Login | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl flex flex-col justify-center items-center">
            <h1 className="text-6xl mb-4 text-draculaRed">Sorry!</h1>
            <h2 className="text-3xl mb-4 text-darkText text-center">
              You do not have permission to view that page or something went wrong. Contact andGuo if this shouldn't be the case.
            </h2>
            <button className="bg-draculaRed hover:bg-draculaPink text-white font-bold py-2 px-4 border-b-4 border-draculaPink hover:border-draculaGreen rounded">
              <Link className="text-3xl" href="/">
                Return Home
              </Link>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Sorry;
