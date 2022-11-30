import { useState } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import Layout from "../../../components/Layout";
type Genre = Database["public"]["Tables"]["genres"]["Row"];

export default function AddGenre() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [name, setName] = useState<Genre["name"]>("");

  async function insertGenre({ name }: { name: Genre["name"] }) {
    try {
      if (!user) throw new Error("No user");
      if (!name) throw new Error("No genre name");

      const newGenre = {
        name,
      };

      let { error } = await supabase.from("genres").insert(newGenre);

      if (error) throw error;
      alert("Genre inserted!");
    } catch (error) {
      alert("Error inserting genre!");
      console.log(error);
    }
  }

  return (
    <Layout title="Add Genre | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                Add Genre
              </h1>
              <div>
                <label htmlFor="genre" className="block mb-6">
                  <span className="text-darkText">Genre Name</span>
                  <input
                    id="genre"
                    type="text"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="inputField"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="mb-6 flex justify-end">
                <button
                  type="submit"
                  className="saveButton"
                  onClick={() => insertGenre({ name })}
                >
                  Insert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
