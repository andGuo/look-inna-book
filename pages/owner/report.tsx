import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import Layout from "../../components/Layout";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
type Author = Database["public"]["Tables"]["authors"]["Row"];
type Genre = Database["public"]["Tables"]["genres"]["Row"];
type Book = Database["public"]["Tables"]["books"]["Row"];

export default function Report() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [totalSales, setTotalSales] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [customSales, setCustomSales] = useState(-1);
  const [selectGenres, setSelectGenres] = useState<Genre["name"][]>([]);
  const [selectAuthors, setSelectAuthors] = useState<Author["author_id"][]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    getBookData();
    getReportData();
  }, []);

  async function getGenres() {
    try {
      let { data, error, status } = await supabase
        .from("genres")
        .select(`name`);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setGenres(data);
      }
    } catch (error) {
      alert("Error getting genre data!");
      console.log(error);
    }
  }

  async function getAuthors() {
    try {
      let { data, error, status } = await supabase
        .from("authors")
        .select(`author_id, first_name, middle_name, last_name`);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAuthors(data);
      }
    } catch (error) {
      alert("Error getting author data!");
      console.log(error);
    }
  }

  async function getBookData() {
    try {
      await getGenres();
      await getAuthors();
    } catch (error) {
      alert("Unable to load author and genre data!");
      console.log(error);
    }
  }

  async function getReportData() {
    try {
      let { data, error, status } = await supabase.rpc("generate_report", {});

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setTotalSales(data[0].total_sales);
        setTotalExpense(data[0].total_expenses);
      }
    } catch (error) {
      alert("Error getting store data!");
      console.log(error);
    }
  }

  async function getAuthorGenreSales({
    authors,
    genres,
  }: {
    authors: Author["author_id"][];
    genres: Genre["name"][];
  }) {
    try {
      if (authors.length <=0 && genres.length <= 0) throw new Error("Enter author(s) and genres(s)!");

      let { data, error, status } = await supabase.rpc(
        "gen_author_genre_sales",
        { authors, genres }
      );

      if (error && status !== 406) {
        throw error;
      }

      setCustomSales(data || 0);
    } catch (error) {
      alert("Error getting author/genre sales!");
      console.log(error);
    }
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Layout title="Report | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                Owner Report
              </h1>
              <div className="text-darkText flex flex-col pb-4 text-xl">
                <div>
                  <span className="text-draculaYellow">Total Sales:</span>
                  <span>
                    {" "}
                    {formatter.format(totalSales.toFixed(2)) ||
                      "Unavailable"}{" "}
                  </span>
                </div>
                <div>
                  <span className="text-draculaYellow">
                    Total Expenditures:
                  </span>
                  <span>
                    {" "}
                    {formatter.format(totalExpense.toFixed(2)) ||
                      "Unavailable"}{" "}
                  </span>
                </div>
                <div>
                  <span className="text-draculaYellow">
                    Author/Genre Sales:
                  </span>
                  <span>
                    {" "}
                    {(customSales >= 0 &&
                      formatter.format(customSales.toFixed(2))) ||
                      "Unavailable"}{" "}
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-6">
                  <span className="text-darkText">Authors:</span>
                  <Select
                    isMulti
                    name="selectAuthors"
                    options={authors.map((author) => ({
                      value: author.author_id,
                      label: `${author.first_name} ${author.middle_name} ${author.last_name}`,
                    }))}
                    onChange={(e) => {
                      setSelectAuthors(e.flatMap((a) => a.value));
                    }}
                  />
                </label>
              </div>
              <div>
                <label className="block mb-6">
                  <span className="text-darkText">Genre(s):</span>
                  <Select
                    isMulti
                    name="selectGenres"
                    options={genres.map((gen) => ({
                      value: gen.name,
                      label: `${gen.name}`,
                    }))}
                    onChange={(e) => {
                      setSelectGenres(e.flatMap((g) => g.value));
                    }}
                  />
                </label>
              </div>
              <div className="mb-6 flex justify-center">
                <button type="submit" className="saveButton" onClick={() => {
                  getAuthorGenreSales({
                    authors: selectAuthors,
                    genres: selectGenres,
                  })
                }}
                disabled = {selectAuthors.length <= 0 && selectGenres.length <= 0}>
                  Show Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
