import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../utils/database.types";
import Layout from "../../../components/Layout";
type Publishers = Database["public"]["Tables"]["publishers"]["Row"];
type PaymentInfo = Database["public"]["Tables"]["publisher_payment"]["Row"];
type PublisherAddress =
  Database["public"]["Tables"]["publisher_address"]["Row"];
type PublisherPhone = Database["public"]["Tables"]["publisher_phones"]["Row"];
import { NumericFormat } from "react-number-format";

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
    name,
    email,
    address,
    apartment_suite,
    country,
    city,
    state,
    zip_code,
    transit_num,
    institution_num,
    account_num,
    phoneNumbers,
  }: {
    name: Publishers["name"];
    email: Publishers["email"];
    address: PublisherAddress["address"];
    apartment_suite: PublisherAddress["apartment_suite"];
    country: PublisherAddress["country"];
    city: PublisherAddress["city"];
    state: PublisherAddress["state"];
    zip_code: PublisherAddress["address"];
    transit_num: PaymentInfo["transit_num"];
    institution_num: PaymentInfo["institution_num"];
    account_num: PaymentInfo["account_num"];
    phoneNumbers: PublisherPhone["number"][];
  }) {
    try {
      if (!user) throw new Error("No user");
      if (!address || !country || !city || !state || !zip_code)
        throw new Error("Address Info Incomplete");
      if (!name || !email) throw new Error("Publisher Info Incomplete");
      if (!transit_num || !institution_num || !account_num)
        throw new Error("Bank Account Info Incomplete");

      const newPublisher = {
        name,
        email,
        address,
        country,
        city,
        state,
        zip_code,
        transit_num,
        institution_num,
        account_num,
        phonenumbers: phoneNumbers,
        apartment_suite,
      };

      let { data, error } = await supabase.rpc(
        "create_publisher",
        newPublisher
      );

      if (error) console.error(error);
      if (error) throw error;
      alert("Publisher added!");
    } catch (error) {
      alert("Error creating publisher!");
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
                    <span className="text-darkText">Publisher Name:</span>
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
                    <span className="text-darkText">Publisher Email:</span>
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
                    <span className="text-darkText">Phone Numbers:</span>
                    {phoneNums.map((num, index) => (
                      <input
                        id="phone_nums"
                        key={index}
                        type="text"
                        value={phoneNums[index] || ""}
                        onChange={(e) => {
                          const t = [...phoneNums];
                          t[index] = e.target.value;
                          setPhoneNums(t);
                        }}
                        className="inputField"
                        placeholder=""
                      />
                    ))}
                    {phoneNums.length > 1 ? (
                      <div className="flex justify-start">
                        <button
                          onClick={(e) =>
                            setPhoneNums((phoneNums) => [...phoneNums, ""])
                          }
                          className="addInput"
                        >
                          Add Phone Number
                        </button>
                        <button
                          onClick={(e) =>
                            setPhoneNums((phoneNums) => phoneNums.slice(0, -1))
                          }
                          className="addInput"
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
                          className="addInput"
                        >
                          Add Phone Number
                        </button>
                      </div>
                    )}
                  </label>
                </div>
                <div>
                  <label htmlFor="address" className="block mb-6">
                    <span className="text-darkText">Address:</span>
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
                      Apartment/Suite/Company:
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
                    <span className="text-darkText">Country:</span>
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
                    <span className="text-darkText">City:</span>
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
                    <span className="text-darkText">State/Province:</span>
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
                    <span className="text-darkText">Postal Code:</span>
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
                <h2 className="text-draculaPink text-3xl pb-4 pt-2 text-center">
                  Publisher Bank Account Info
                </h2>
                <div>
                  <label htmlFor="transit" className="block mb-6">
                    <span className="text-darkText">Transit Number:</span>
                    <NumericFormat
                      allowNegative={false}
                      id="transit"
                      value={transit || ""}
                      onValueChange={(v) => {
                        setTransit(Number(v.value));
                      }}
                      className="inputField"
                      decimalScale={0}
                      maxLength={5}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="institution" className="block mb-6">
                    <span className="text-darkText">Institution Number:</span>
                    <NumericFormat
                      allowNegative={false}
                      id="institution"
                      value={institution || ""}
                      onValueChange={(v) => {
                        setInstitution(Number(v.value));
                      }}
                      className="inputField"
                      decimalScale={0}
                      maxLength={3}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="account" className="block mb-6">
                    <span className="text-darkText">Account Number:</span>
                    <NumericFormat
                      allowNegative={false}
                      id="account"
                      value={account || ""}
                      onValueChange={(v) => {
                        setAccount(Number(v.value));
                      }}
                      className="inputField"
                      decimalScale={0}
                      maxLength={12}
                    />
                  </label>
                </div>
                <div className="mb-6 flex justify-end">
                  <button
                    type="submit"
                    className="saveButton"
                    onClick={() =>
                      createPublisher({
                        name,
                        email,
                        address: addr,
                        apartment_suite: aptSuite,
                        country,
                        city,
                        state,
                        zip_code: zipCode,
                        transit_num: transit,
                        institution_num: institution,
                        account_num: account,
                        phoneNumbers: phoneNums,
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
