import { useState } from "react";
import { UseFirebasecontext } from "../firebase/firebase";

export default function Listining() {
  const { addListing } = UseFirebasecontext();

  const [book, setBook] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    if (!book.trim() || !isbn.trim() || !price.trim() || !image) return;

    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "bookdekho_image_preset");
      data.append("cloud_name", "dqgfd4lhe");

      const upload = await fetch(
        "https://api.cloudinary.com/v1_1/dqgfd4lhe/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const imageRespose = await upload.json();
      const imageUrl =imageRespose.secure_url || imageRespose.url;
      console.log(imageRespose)

      await addListing({
        book,
        isbn,
        price,
        imageUrl,
      });

      setBook("");
      setIsbn("");
      setImage("");
      setPrice("");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <form onSubmit={handleClick} className="mt-36 max-w-sm mx-auto space-y-4">
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Enter book name
          </label>
          <input
            type="text"
            id="visitors"
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className=" border border-default-medium text-sm rounded-base block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder="Book name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            ISBN
          </label>
          <input
            type="text"
            id="visitors"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="border border-default-medium text-sm rounded-base block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder="ISBN number"
            required
          />
        </div>
        <div>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Price
          </label>
          <input
            type="text"
            id="visitors"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-default-medium text-sm rounded-base block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder="Enter price"
            required
          />
        </div>
        <div>
          <label
            className="block mb-2.5 text-sm font-medium text-heading"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-default-medium text-sm rounded-base block w-full px-2.5 py-2 shadow-xs placeholder:text-body cursor-pointer"
            id="file_input"
            type="file"
          />
        </div>
        <button className="border border-default-medium text-sm rounded-base block w-full mt-2 px-2.5 py-2 shadow-xs placeholder:text-body cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}
