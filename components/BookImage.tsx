import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
type Book = Database["public"]["Tables"]["books"]["Row"];

export default function BookImg({
  isbn,
  url,
  size,
  onUpload,
}: {
  isbn: string;
  url: Book["img_url"];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = useSupabaseClient<Database>();
  const [imgUrl, setImgUrl] = useState<Book["img_url"]>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("book-imgs")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImgUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadImage: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${isbn}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading image!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt="Book Image"
          className="image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="no-image flex justify-center border-2 border-draculaGreen"
          style={{ height: size, width: size }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            className="cp-svg icon-svg-book cp-format-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12,4.85018126 C13.4346383,3.36081884 15.3769278,2.02591908 17.5096559,2 C17.5576778,2 17.5575953,2 17.6056172,2.00019201 C19.6637363,2.02800451 21.3714604,3.1384592 22.7339217,4.48709478 C22.7339217,4.48709478 23,4.78725723 23,5.11964368 L23,17.9998192 C23,17.9998192 22.9983512,18.0234208 22.9983512,18.039242 C22.9983512,18.8562518 22.2267034,19.0156072 21.9515565,18.8935891 C21.1947275,18.5579943 19.0247773,17.2352662 17.6812569,17.222533 C15.6184387,17.2030021 14.1138079,18.7900191 12.9733603,20.3856586 C12.9389206,20.4342653 12.8848599,20.527388 12.7998838,20.626747 C12.6635882,20.8230588 12.425746,21 12.0112944,21 L12,21 L11.9887262,21 C11.5742747,21 11.3364324,20.8230588 11.2001368,20.626747 C11.1151607,20.527388 11.0611,20.4342653 11.0266603,20.3856586 C9.88621268,18.7900191 8.38158193,17.2030021 6.31876376,17.222533 C4.97524334,17.2352662 2.80529309,18.5579943 2.04850529,18.8935891 C1.77337905,19.0156072 1.00177248,18.8562518 1.00177248,18.039242 C1.00177248,18.0234208 1,17.9998192 1,17.9998192 L1,5.11964368 C1,4.78725723 1.26603712,4.48709478 1.26603712,4.48709478 C2.62856019,3.1384592 4.33628435,2.02800451 6.39440338,2.00019201 C6.44242526,2 6.44234282,2 6.49036471,2 C8.62309285,2.02591908 10.5653823,3.36081884 12,4.85018126 Z M6.4121282,3.80478244 C5.04136103,3.82336459 3.80717799,4.61811632 2.85822021,5.49285656 C2.85822021,5.49285656 2.85492257,16.3756053 2.85492257,16.3756053 C2.90576806,16.3491163 2.95684026,16.3230683 3.00801551,16.297241 C4.96485578,15.3205149 7.34270163,15.1320436 9.2394424,16.1835045 C9.89523997,16.5470522 10.463815,17.0773947 11.0179009,17.937597 C11.0179009,17.937597 11.0121919,6.48063145 11.0121919,6.48063145 C9.80418388,5.09331505 8.32358468,3.79515104 6.4121282,3.80478244 Z M17.5878924,3.80478244 C18.9586596,3.82336459 20.1928426,4.61811632 21.1418004,5.49285656 C21.1418004,5.49285656 21.145098,16.3756053 21.145098,16.3756053 C21.0942526,16.3491163 21.0431803,16.3230683 20.9920051,16.297241 C19.0351648,15.3205149 16.657319,15.1320436 14.7605782,16.1835045 C14.1047806,16.5470522 13.5362057,17.0773947 12.9821197,17.937597 C12.9821197,17.937597 12.9878287,6.48063145 12.9878287,6.48063145 C14.1958367,5.09331505 15.6764359,3.79515104 17.5878924,3.80478244 Z"
            ></path>
          </svg>
        </div>
      )}
      <div className="flex justify-start" style={{ width: size }}>
        <label className="text-draculaCyan hover:underline" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload New"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="uploadImg"
          accept="image/*"
          onChange={uploadImage}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
