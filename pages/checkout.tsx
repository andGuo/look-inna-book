import { useState, useEffect } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
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
  const [loading, setLoading] = useState(true);
  const [shipFname, setShipFname] = useState<ShipAddress["first_name"]>("");
  const [shipLname, setShipLname] = useState<ShipAddress["last_name"]>("");
  const [shipAddr, setShipAddr] = useState<ShipAddress["address"]>("");
  const [shipAptSuite, setShipAptSuite] = useState<ShipAddress["apartment_suite"]>(null);
  const [shipCountry, setShipCountry] = useState<ShipAddress["country"]>("");
  const [shipCity, setShipCity] = useState<ShipAddress["city"]>("");
  const [shipState, setShipState] = useState<ShipAddress["state"]>("");
  const [shipZipCode, setShipZipCode] = useState<ShipAddress["zip_code"]>("");
  const [shipPhoneNum, setShipPhoneNum] = useState<ShipAddress["phone_number"]>("");
  const [billFname, setBillFname] = useState<BillAddress["first_name"]>("");
  const [billLname, setBillLname] = useState<BillAddress["last_name"]>("");
  const [billAddr, setBillAddr] = useState<BillAddress["address"]>("");
  const [billAptSuite, setBillAptSuite] = useState<BillAddress["apartment_suite"]>(null);
  const [billCountry, setBillCountry] = useState<BillAddress["country"]>("");
  const [billCity, setBillCity] = useState<BillAddress["city"]>("");
  const [billState, setBillState] = useState<BillAddress["state"]>("");
  const [billZipCode, setBillZipCode] = useState<BillAddress["zip_code"]>("");

  useEffect(() => {
    getProfileAddr();
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
      alert("Error loading default user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title={"Cart | Look-Inna-Book"}>
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        {!session ? (
          <div className="lg:w-2/5 sm:w-1/2">
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
          <div className="col-span-3 grid grid-cols-3 items-center p-2 m-4 lg:w-4/5 sm:w-2/3">
            <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
              <div>
                <h1 className="text-draculaPink text-3xl pb-4 text-center">
                  User Info
                </h1>
                <Profile session={session} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
