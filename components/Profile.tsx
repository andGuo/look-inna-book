import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import { count } from "console";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
type Address = Database["public"]["Tables"]["user_address"]["Row"];

export default function Profile({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [fname, setFname] = useState<Profiles["first_name"]>(null);
  const [lname, setLname] = useState<Profiles["last_name"]>(null);
  const [addr, setAddr] = useState<Address["address"]>("");
  const [aptSuite, setAptSuite] = useState<Address["apartment_suite"]>(null);
  const [country, setCountry] = useState<Address["country"]>("");
  const [city, setCity] = useState<Address["city"]>("");
  const [state, setState] = useState<Address["state"]>("");
  const [zipCode, setZipCode] = useState<Address["zip_code"]>("");
  const [phoneNum, setPhoneNum] = useState<Address["phone_number"]>("");

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`first_name, last_name`)
        .eq("profile_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFname(data.first_name);
        setLname(data.last_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    first_name, last_name, address, apartment_suite, country, city, state, zip_code, phone_number
  }: {
    first_name: Profiles["first_name"];
    last_name: Profiles["last_name"];
    address: Address["address"];
    apartment_suite: Address["apartment_suite"];
    country: Address["country"];
    city: Address["city"];
    state: Address["state"];
    zip_code: Address["address"];
    phone_number: Address["phone_number"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");
      if (!fname || !lname) throw new Error("No fname or lname");

      const updates = {
        profile_id: user.id,
        first_name: fname,
        last_name: lname,
      };

      let { error } = await supabase.from("profiles").update(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="fname">First Name</label>
        <input
          id="fname"
          type="text"
          value={fname || ""}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lname">Last Name</label>
        <input
          id="lname"
          type="text"
          value={lname || ""}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={addr || ""}
          onChange={(e) => setAddr(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="apartment_suite">Apartment/Suite</label>
        <input
          id="apartment_suite"
          type="text"
          value={aptSuite || ""}
          onChange={(e) => setAptSuite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          value={country || ""}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">Last Name</label>
        <input
          id="city"
          type="text"
          value={city || ""}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="state">State/Province</label>
        <input
          id="state"
          type="text"
          value={state || ""}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="zip_code">Postal Code</label>
        <input
          id="zip_code"
          type="text"
          value={zipCode || ""}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone_number">Phone Number</label>
        <input
          id="phone_number"
          type="text"
          value={phoneNum || ""}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
      </div>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ fname, lname, addr, aptSuite, country, city, state, zipCode, phoneNum })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
