import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import Layout from "../../../components/Layout";
import BookImage from "../../../components/BookImage"
type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
type Author = Database["public"]["Tables"]["authors"]["Row"];
type Genre = Database["public"]["Tables"]["genres"]["Row"];
type Book = Database["public"]["Tables"]["books"]["Row"];

export default function AddPublisher() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [isbn, setIsbn] = useState<Book["isbn"]>("");
  const [title, setTitle] = useState<Book["title"]>("");
  const [msrp, setMsrp] = useState<Book["msrp"]>(0.0);
  const [numPages, setNumPages] = useState<Book["num_pages"]>(0);
  const [pubPercentage, setPubPercentage] =
    useState<Book["pub_percentage"]>(0.0);
  const [imgUrl, setImgUrl] = useState<Book["img_url"]>("");
  const [publisherId, setPublisherId] = useState<Book["publisher_id"]>("");

  const inputNumMax = (e: any) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  async function addBook({
    title,
    msrp,
    num_pages,
    pub_percentage,
    img_url,
    publisher_id,
  }: {
    title: Book["title"];
    msrp: Book["msrp"];
    num_pages: Book["num_pages"];
    pub_percentage: Book["pub_percentage"];
    img_url: Book["img_url"];
    publisher_id: Book["publisher_id"];
  }) {
    try {
      if (!user) throw new Error("No user");
      if (!title || !msrp || !num_pages || !pub_percentage || !publisher_id)
        throw new Error("Book Info Incomplete");

      const newBook = {
        name,
        msrp,
        num_pages,
        pub_percentage,
        img_url,
        publisher_id,
      };

      let { data, error } = await supabase.rpc("create_book", newBook);

      if (error) console.error(error);
      if (error) throw error;
      alert("Book added!");
    } catch (error) {
      alert("Error adding book!");
      console.log(error);
    }
  }

  return (
    <Layout title="Add Book | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                Add Book
              </h1>
              <BookImage isbn={isbn} url={""} size={250} onUpload={url => {
                setImgUrl(url);
              }} />
              <div className="form-widget">
                <div>
                  <label htmlFor="title" className="block mb-6">
                    <span className="text-darkText">Book Title</span>
                    <input
                      id="title"
                      type="text"
                      value={title || ""}
                      onChange={(e) => setTitle(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="msrp" className="block mb-6">
                    <span className="text-darkText">Book Retail Price</span>
                    <input
                      id="msrp"
                      type="number"
                      value={msrp || ""}
                      onChange={(e) => setMsrp(Number(e.target.value))}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <div>
                    <label htmlFor="numPages" className="block mb-6">
                      <span className="text-darkText">Number of Pages</span>
                      <input
                        id="numPages"
                        type="number"
                        value={numPages || ""}
                        onChange={(e) => setNumPages(Number(e.target.value))}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="pubPercentage" className="block mb-6">
                      <span className="text-darkText">
                        Publisher Commission Percentage
                      </span>
                      <input
                        id="pubPercentage"
                        type="number"
                        value={pubPercentage || ""}
                        onChange={(e) =>
                          setPubPercentage(Number(e.target.value))
                        }
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div className="mb-6 flex justify-end">
                    <button
                      type="submit"
                      className="saveButton"
                      onClick={() =>
                        addBook({
                          title,
                          msrp,
                          num_pages: numPages,
                          pub_percentage: pubPercentage,
                          img_url: imgUrl,
                          publisher_id: publisherId,
                        })
                      }
                    >
                      Insert Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
