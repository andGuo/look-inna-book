import { useState } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import Layout from "../../../components/Layout";
type Author = Database["public"]["Tables"]["authors"]["Row"];

export default function AddGenre() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [fname, setFname] = useState<Author["first_name"]>("");
  const [mname, setMname] = useState<Author["middle_name"]>("");
  const [lname, setLname] = useState<Author["last_name"]>("");

  async function insertAuthor({
    first_name,
    middle_name,
    last_name,
  }: {
    first_name: Author["first_name"];
    middle_name: Author["middle_name"];
    last_name: Author["last_name"];
  }) {
    try {
      if (!user) throw new Error("No user");
      if (!first_name || !last_name) throw new Error("Author needs first and last name");

      const newAuthor = {
        first_name,
        middle_name,
        last_name,
      };

      let { data, error } = await supabase.rpc(
        "create_author",
        newAuthor
      );

      if (error) console.error(error);
      if (error) throw error;
      alert("Author added!");
    } catch (error) {
      alert("Error creating author!");
      console.log(error);
    }
  }

  return (
    <Layout title="Add Author | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                Add Author
              </h1>
              <div>
                <label htmlFor="fname" className="block mb-6">
                  <span className="text-darkText">First Name:</span>
                  <input
                    id="fname"
                    type="text"
                    value={fname || ""}
                    onChange={(e) => setFname(e.target.value)}
                    className="inputField"
                    placeholder=""
                  />
                </label>
              </div>
              <div>
                <label htmlFor="mname" className="block mb-6">
                  <span className="text-darkText">Middle Name: *Optional*</span>
                  <input
                    id="mname"
                    type="text"
                    value={mname || ""}
                    onChange={(e) => setMname(e.target.value)}
                    className="inputField"
                    placeholder=""
                  />
                </label>
              </div>
              <div>
                <label htmlFor="lname" className="block mb-6">
                  <span className="text-darkText">Last Name:</span>
                  <input
                    id="lname"
                    type="text"
                    value={lname || ""}
                    onChange={(e) => setLname(e.target.value)}
                    className="inputField"
                    placeholder=""
                  />
                </label>
              </div>
              <div className="mb-6 flex justify-end">
                <button
                  type="submit"
                  className="saveButton"
                  onClick={() => insertAuthor({ first_name:fname, middle_name:mname, last_name:lname })}
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
