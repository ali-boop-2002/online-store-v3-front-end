import { useState } from "react";
import { useCreateProductMutation } from "@/slices/productApiSlice";
import { useUploadImageMutation } from "@/slices/uploadApiSlice";
import { toast } from "react-toastify";

function ProductUpload() {
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [images, setImages] = useState([]); // store all selected images

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      const uploadedUrls = [];

      for (let file of images) {
        const formData = new FormData();
        formData.append("image", file);

        const { url } = await uploadImage(formData).unwrap();
        uploadedUrls.push(url);
      }

      const productData = {
        name,
        price: Number(price),
        description,
        brand,
        category,
        countInStock: Number(countInStock),
        image: uploadedUrls, // Array of URLs
      };

      await createProduct(productData).unwrap();
      toast.success("Product created successfully!");

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setBrand("");
      setCategory("");
      setCountInStock("");
      setImages([]);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Upload New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full px-4 py-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full px-4 py-2 border rounded-lg"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand"
          className="w-full px-4 py-2 border rounded-lg"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full px-4 py-2 border rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock Count"
          className="w-full px-4 py-2 border rounded-lg"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full bg-blue-400 rounded-3xl p-4 hover:cursor-pointer hover:bg-blue-600 transition-colors"
          onChange={(e) => setImages(Array.from(e.target.files))}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          disabled={creating || uploading}
        >
          {creating || uploading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductUpload;
