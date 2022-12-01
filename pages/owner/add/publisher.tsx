import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import Layout from "../../../components/Layout";
type Publishers = Database["public"]["Tables"]["publishers"]["Row"];
type PaymentInfo = Database["public"]["Tables"]["payment_info"]["Row"];
type PublisherAddress =
  Database["public"]["Tables"]["publisher_address"]["Row"];
type PublisherPhone = Database["public"]["Tables"]["publisher_phones"]["Row"];

export default function AddPublisher() {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [name, setName] = useState<Publishers["name"]>("");
  const [email, setEmail] = useState<Publishers["email"]>("");
  const [phoneNums, setPhoneNums] = useState([""]);
  const [addr, setAddr] = useState<PublisherAddress["address"]>("");
  const [aptSuite, setAptSuite] =
    useState<PublisherAddress["apartment_suite"]>("");
  const [country, setCountry] = useState<PublisherAddress["country"]>("");
  const [city, setCity] = useState<PublisherAddress["city"]>("");
  const [state, setState] = useState<PublisherAddress["state"]>("");
  const [zipCode, setZipCode] = useState<PublisherAddress["zip_code"]>("");
  const [transit, setTransit] = useState<PaymentInfo["transit_num"]>(0);
  const [institution, setInstitution] =
    useState<PaymentInfo["institution_num"]>(0);
  const [account, setAccount] = useState<PaymentInfo["account_num"]>(0);

  const inputNumMax = (e: any) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  async function createPublisher({
    address,
    apartment_suite,
    country,
    city,
    state,
    zip_code,
    phone_number,
  }: {
    address: PublisherAddress["address"];
    apartment_suite: PublisherAddress["apartment_suite"];
    country: PublisherAddress["country"];
    city: PublisherAddress["city"];
    state: PublisherAddress["state"];
    zip_code: PublisherAddress["address"];
    phone_number: PublisherPhone["number"];
  }) {
    try {
      if (!user) throw new Error("No user");
      if (!address || !country || !city || !state || !zip_code || !phone_number)
        throw new Error("Address Info Incomplete");

      const userAddrUpdate = {
        profile_id: user.id,
        address,
        apartment_suite,
        country,
        city,
        state,
        zip_code,
        phone_number,
      };

      let { error } = await supabase
        .from("user_address")
        .upsert(userAddrUpdate);

      if (error) throw error;
      alert("Address updated!");
    } catch (error) {
      alert("Error updating address data!");
      console.log(error);
    }
  }

  return (
    <Layout title="Add Publisher | Look-Inna-Book">
      <div className="flex flex-wrap flex-col items-center justify-around sm:my-14 sm:flex-row sm:items-start sm:justify-center">
        <div className="lg:w-2/5 sm:w-1/2">
          <div className="bg-neutral-800 pt-12 px-12 pb-6 rounded-3xl shadow-xl">
            <div className="form-widget">
              <h1 className="text-draculaPink text-3xl pb-4 text-center">
                Add Publisher
              </h1>
              <div className="form-widget">
                <div>
                  <label htmlFor="name" className="block mb-6">
                    <span className="text-darkText">Publisher Name</span>
                    <input
                      id="name"
                      type="text"
                      value={name || ""}
                      onChange={(e) => setName(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-6">
                    <span className="text-darkText">Publisher Email</span>
                    <input
                      id="email"
                      type="text"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="phone_nums" className="block mb-6">
                    <span className="text-darkText">Phone Numbers</span>
                    {phoneNums.map((num, index) => (
                      <input
                        id="phone_nums"
                        key={index}
                        type="text"
                        value={phoneNums[index] || ""}
                        onChange={(e) => e.target.value}
                        className="inputField"
                        placeholder=""
                      />
                    ))}
                    {(phoneNums.length > 1) ? (
                      <div>
                        <button
                          onClick={(e) =>
                            setPhoneNums((phoneNums) => [...phoneNums, ""])
                          }
                        >
                          Add Phone Number
                        </button>
                        <button
                          onClick={(e) =>
                            setPhoneNums((phoneNums) => phoneNums.slice(0, -1))
                          }
                        >
                          Remove Phone Number
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={(e) =>
                            setPhoneNums((phoneNums) => [...phoneNums, ""])
                          }
                        >
                          Add Phone Number
                        </button>
                      </div>
                    )}
                  </label>
                </div>
                <div>
                  <label htmlFor="address" className="block mb-6">
                    <span className="text-darkText">Address</span>
                    <input
                      id="address"
                      type="text"
                      value={addr || ""}
                      onChange={(e) => setAddr(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="apartment_suite" className="block mb-6">
                    <span className="text-darkText">
                      Apartment/Suite/Company
                    </span>
                    <input
                      id="apartment_suite"
                      type="text"
                      value={aptSuite || ""}
                      onChange={(e) => setAptSuite(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="country" className="block mb-6">
                    <span className="text-darkText">Country</span>
                    <input
                      id="country"
                      type="text"
                      value={country || ""}
                      onChange={(e) => setCountry(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="city" className="block mb-6">
                    <span className="text-darkText">City</span>
                    <input
                      id="city"
                      type="text"
                      value={city || ""}
                      onChange={(e) => setCity(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="state" className="block mb-6">
                    <span className="text-darkText">State/Province</span>
                    <input
                      id="state"
                      type="text"
                      value={state || ""}
                      onChange={(e) => setState(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="zip_code" className="block mb-6">
                    <span className="text-darkText">Postal Code</span>
                    <input
                      id="zip_code"
                      type="text"
                      value={zipCode || ""}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="inputField"
                      placeholder=""
                    />
                  </label>
                </div>
                <h2 className="text-draculaPink text-3xl pb-4 text-center">
                  Publisher Bank Account Info
                </h2>
                <div>
                  <label htmlFor="transit" className="block mb-6">
                    <span className="text-darkText">Transit Number</span>
                    <input
                      id="transit"
                      type="number"
                      value={transit || ""}
                      onChange={(e) => setTransit(Number(e.target.value))}
                      onInput={inputNumMax}
                      maxLength={5}
                      className="inputField"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="institution" className="block mb-6">
                    <span className="text-darkText">Institution Number</span>
                    <input
                      id="institution"
                      type="number"
                      value={institution || ""}
                      onChange={(e) => setInstitution(Number(e.target.value))}
                      onInput={inputNumMax}
                      maxLength={3}
                      className="inputField"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="account" className="block mb-6">
                    <span className="text-darkText">Account Number</span>
                    <input
                      id="account"
                      type="number"
                      value={account || ""}
                      onChange={(e) => setAccount(Number(e.target.value))}
                      onInput={inputNumMax}
                      maxLength={12}
                      className="inputField"
                    />
                  </label>
                </div>
                <div className="mb-6 flex justify-end">
                  <button
                    type="submit"
                    className="saveButton"
                    onClick={() =>
                      createPublisher({
                        address: addr,
                        apartment_suite: aptSuite,
                        country,
                        city,
                        state,
                        zip_code: zipCode,
                        phone_number: phoneNum,
                      })
                    }
                  >
                    Add Publisher
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
