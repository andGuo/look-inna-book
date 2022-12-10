import { useState, useEffect } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { Database } from "../../utils/database.types";
import Layout from "../../components/Layout";
import Select from "react-select";
import { NumericFormat } from "react-number-format";
type Tracking = Database["public"]["Tables"]["tracking_info"]["Row"];
import { v4 as uuidv4 } from "uuid";

export default function AddPublisher() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [orderId, setOrderId] = useState<Tracking["order_id"]>(0);
  const [shipStatus, setShipStatus] = useState<Tracking["shipping_status"]>(" ");
  const [creatDate, setCreatDate] = useState<Tracking["creation_date"]>(" ");
  const [deliveryDate, setDeliveryDate] =
    useState<Tracking["delivery_date"]>(" ");
  const [deliveredDate, setDelivered] =
    useState<Tracking["delivered_date"]>(" ");
  const [city, setCity] = useState<Tracking["city"]>(" ");
  const [state, setState] = useState<Tracking["state"]>(" ");
  const [country, setCountry] = useState<Tracking["country"]>(" ");

  async function getBookData({
    order_number,
  }: {
    order_number: Tracking["order_id"];
  }) {
    try {
      if (!user) throw new Error("No user");

      let { data, error } = await supabase.rpc("get_profile_order", {
        order_number,
      });

      if (data) {
        console.log(data);
        setShipStatus(data[0].shipping_status);
        setCreatDate(data[0].creation_date);
        setDeliveryDate(data[0].delivery_date);
        setDelivered(data[0].delivered_date);
        setCity(data[0].city);
        setState(data[0].state);
        setCountry(data[0].country);
      }

      if (error) throw error;
      alert("Success, order found!");
    } catch (error) {
      alert(
        "Error, unable to find order or you do not have permission to view that order!"
      );
      console.log(error);
    }
  }

  return (
    <Layout title={"Search Orders | Look-Inna-Book"}>
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
          <div className="p-2 m-4 mt-10 lg:w-2/5 sm:w-1/2">
            <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
              <div className="form-widget">
                <h1 className="text-draculaPink text-3xl pb-4 text-center">
                  Order Tracking
                </h1>
                <div>
                  <div>
                    <label htmlFor="orderId" className="block mb-6">
                      <span className="text-darkText">Order Number:</span>
                      <NumericFormat
                        allowNegative={false}
                        id="orderId"
                        value={orderId || ""}
                        onValueChange={(v) => {
                          setOrderId(Number(v.value));
                        }}
                        className="inputField"
                        decimalScale={0}
                      />
                    </label>
                  </div>
                  <div className="mb-6 flex justify-center">
                    <button
                      type="submit"
                      className="saveButton"
                      onClick={() => {
                        getBookData({ order_number: orderId });
                      }}
                      disabled={!orderId}
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
              <hr className="my-4 rounded border-draculaGreen border-2" />
              <div className="text-darkText flex flex-col pb-4">
                <div>
                  <span className="text-draculaYellow">Shipping Status:</span>
                  <span> {shipStatus || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">Order Placed Date:</span>
                  <span> {creatDate || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">
                    Expected Delivery Date:
                  </span>
                  <span> {deliveryDate || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">
                    Actual Delivery Date:
                  </span>
                  <span> {deliveredDate || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">City:</span>
                  <span> {city || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">State:</span>
                  <span> {state || "Unavailable"} </span>
                </div>
                <div>
                  <span className="text-draculaYellow">Country:</span>
                  <span> {country || "Unavailable"} </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
