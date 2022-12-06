import { useState, useEffect } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import { Database } from "../utils/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
type BillAddress = Database["public"]["Tables"]["billing_address"]["Row"];
type ShipAddress = Database["public"]["Tables"]["shipping_address"]["Row"];

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [shownBooks, setShownBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [shipFname, setShipFname] = useState<ShipAddress["first_name"]>("");
  const [shipLname, setShipLname] = useState<ShipAddress["last_name"]>("");
  const [shipAddr, setShipAddr] = useState<ShipAddress["address"]>("");
  const [shipAptSuite, setShipAptSuite] =
    useState<ShipAddress["apartment_suite"]>(null);
  const [shipCountry, setShipCountry] = useState<ShipAddress["country"]>("");
  const [shipCity, setShipCity] = useState<ShipAddress["city"]>("");
  const [shipState, setShipState] = useState<ShipAddress["state"]>("");
  const [shipZipCode, setShipZipCode] = useState<ShipAddress["zip_code"]>("");
  const [shipPhoneNum, setShipPhoneNum] =
    useState<ShipAddress["phone_number"]>("");
  const [billFname, setBillFname] = useState<BillAddress["first_name"]>("");
  const [billLname, setBillLname] = useState<BillAddress["last_name"]>("");
  const [billAddr, setBillAddr] = useState<BillAddress["address"]>("");
  const [billAptSuite, setBillAptSuite] =
    useState<BillAddress["apartment_suite"]>(null);
  const [billCountry, setBillCountry] = useState<BillAddress["country"]>("");
  const [billCity, setBillCity] = useState<BillAddress["city"]>("");
  const [billState, setBillState] = useState<BillAddress["state"]>("");
  const [billZipCode, setBillZipCode] = useState<BillAddress["zip_code"]>("");

  useEffect(() => {
    getProfileAddr();
    getCartItems();
  }, [session]);

  // Sets default billing and shipping to user profile adderess
  async function getProfileAddr() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(
          `first_name, last_name, user_address (
            address, apartment_suite, country, city, state, zip_code, phone_number
            )`
        )
        .eq("profile_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setShipFname(data.first_name);
        setShipLname(data.last_name);
        setBillFname(data.first_name);
        setBillLname(data.last_name);
        if (data.user_address.length > 0) {
          const arr = data.user_address;
          setShipAddr(arr[0].address);
          setShipAptSuite(arr[0].apartment_suite);
          setShipCountry(arr[0].country);
          setShipCity(arr[0].city);
          setShipState(arr[0].state);
          setShipZipCode(arr[0].zip_code);
          setShipPhoneNum(arr[0].phone_number);
          //Billind address info
          setBillAddr(arr[0].address);
          setBillAptSuite(arr[0].apartment_suite);
          setBillCountry(arr[0].country);
          setBillCity(arr[0].city);
          setBillState(arr[0].state);
          setBillZipCode(arr[0].zip_code);
        }
      }
    } catch (error) {
      //alert("Error loading default user data!");
      console.debug(error);
    } finally {
      setLoading(false);
    }
  }

  async function getCartItems() {
    try {
      if (!user) throw new Error("No user");

      const { data, error } = await supabase.rpc("get_profile_cart", {
        uid: user.id,
      });

      if (error) throw error;
      if (data) setShownBooks(data);
    } catch (error) {
      console.debug(error);
    }
  }

  return (
    <Layout title={"Cart | Look-Inna-Book"}>
      <div className="flex flex-wrap flex-col items-center justify-center">
        {!session ? (
          <div className="lg:w-2/5 sm:w-1/2 sm:my-14 sm:flex-row sm:items-start sm:justify-center">
            <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
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
            </div>
          </div>
        ) : (
          <div className="col-span-3 grid lg:grid-cols-3 items-center p-2 m-4 lg:w-5/6 sm:w-2/3 gap-x-3">
            <div className="bg-neutral-800 p-6 rounded-2xl shadow-xl">
              <div>
                <h1 className="text-draculaPink text-3xl pb-4 text-center">
                  Billing Address
                </h1>
                <div className="form-widget">
                  <div>
                    <label htmlFor="bFname" className="block mb-6">
                      <span className="text-darkText">First Name</span>
                      <input
                        id="bFname"
                        type="text"
                        value={billFname || ""}
                        onChange={(e) => setBillFname(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bLname" className="block mb-6">
                      <span className="text-darkText">Last Name</span>
                      <input
                        id="bLname"
                        type="text"
                        value={billLname || ""}
                        onChange={(e) => setBillLname(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bAddress" className="block mb-6">
                      <span className="text-darkText">Address</span>
                      <input
                        id="bAddress"
                        type="text"
                        value={billAddr || ""}
                        onChange={(e) => setBillAddr(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bApartment_suite" className="block mb-6">
                      <span className="text-darkText">
                        Apartment/Suite/Company
                      </span>
                      <input
                        id="bApartment_suite"
                        type="text"
                        value={billAptSuite || ""}
                        onChange={(e) => setBillAptSuite(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bCountry" className="block mb-6">
                      <span className="text-darkText">Country</span>
                      <input
                        id="bCountry"
                        type="text"
                        value={billCountry || ""}
                        onChange={(e) => setBillCountry(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bCity" className="block mb-6">
                      <span className="text-darkText">City</span>
                      <input
                        id="bCity"
                        type="text"
                        value={billCity || ""}
                        onChange={(e) => setBillCity(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bState" className="block mb-6">
                      <span className="text-darkText">State/Province</span>
                      <input
                        id="bState"
                        type="text"
                        value={billState || ""}
                        onChange={(e) => setBillState(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="bZip_code" className="block mb-6">
                      <span className="text-darkText">Postal Code</span>
                      <input
                        id="bZip_code"
                        type="text"
                        value={billZipCode || ""}
                        onChange={(e) => setBillZipCode(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-800 p-6 rounded-2xl shadow-xl">
              <div>
                <h1 className="text-draculaPink text-3xl pb-4 text-center">
                  Shipping Address
                </h1>
                <div className="form-widget">
                  <div>
                    <label htmlFor="sFname" className="block mb-6">
                      <span className="text-darkText">First Name</span>
                      <input
                        id="sFname"
                        type="text"
                        value={shipFname || ""}
                        onChange={(e) => setShipFname(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sLname" className="block mb-6">
                      <span className="text-darkText">Last Name</span>
                      <input
                        id="sLname"
                        type="text"
                        value={shipLname || ""}
                        onChange={(e) => setShipLname(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sAddress" className="block mb-6">
                      <span className="text-darkText">Address</span>
                      <input
                        id="sAddress"
                        type="text"
                        value={shipAddr || ""}
                        onChange={(e) => setShipAddr(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sApartment_suite" className="block mb-6">
                      <span className="text-darkText">
                        Apartment/Suite/Company
                      </span>
                      <input
                        id="sApartment_suite"
                        type="text"
                        value={shipAptSuite || ""}
                        onChange={(e) => setShipAptSuite(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sCountry" className="block mb-6">
                      <span className="text-darkText">Country</span>
                      <input
                        id="sCountry"
                        type="text"
                        value={shipCountry || ""}
                        onChange={(e) => setShipCountry(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sCity" className="block mb-6">
                      <span className="text-darkText">City</span>
                      <input
                        id="sCity"
                        type="text"
                        value={shipCity || ""}
                        onChange={(e) => setShipCity(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sState" className="block mb-6">
                      <span className="text-darkText">State/Province</span>
                      <input
                        id="sState"
                        type="text"
                        value={shipState || ""}
                        onChange={(e) => setShipState(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sZip_code" className="block mb-6">
                      <span className="text-darkText">Postal Code</span>
                      <input
                        id="sZip_code"
                        type="text"
                        value={shipZipCode || ""}
                        onChange={(e) => setShipZipCode(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sPhone_number" className="block mb-6">
                      <span className="text-darkText">Phone Number</span>
                      <input
                        id="sPhone_number"
                        type="text"
                        value={shipPhoneNum || ""}
                        onChange={(e) => setShipPhoneNum(e.target.value)}
                        className="inputField"
                        placeholder=""
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-800 px-6 pt-4 pb-6 rounded-2xl shadow-xl">
              <div className="text-darkText text-lg">
                {shownBooks.length > 0 ? (
                  <h1 className="text-draculaPink text-3xl pb-4 text-center">
                    Cart
                  </h1>
                ) : (
                  <h1 className="text-draculaRed text-3xl py-1 text-center">
                    Cart is empty
                  </h1>
                )}
                <ul className="list-decimal list-inside">
                  {shownBooks.map((book) => (
                    <li key={book.isbn}>{`${book.title} - (${book.isbn}) x${
                      book.purchase_quantity
                    } @ $${book.msrp.toFixed(2)}`}</li>
                  ))}
                </ul>
                <hr className="my-4 rounded border-draculaGreen border-2" />
                <div>
                  Total Price: $
                  {shownBooks
                    .reduce(
                      (acc, book) => acc + book.msrp * book.purchase_quantity,
                      0
                    )
                    .toFixed(2)}
                </div>
                <div>
                  Total Number of Books:{" "}
                  {shownBooks.reduce(
                    (acc, book) => acc + book.purchase_quantity,
                    0
                  )}
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="saveButton"
                    onClick={() => {}}
                    disabled={loading || shownBooks.length <= 0}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
