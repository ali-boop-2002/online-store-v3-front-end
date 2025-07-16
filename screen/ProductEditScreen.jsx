import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/slices/productApiSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "@/Newcomponents/Error";

function ProductEditScreen() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading: productUpdating, error: errorUpdating }] =
    useUpdateProductMutation();
  console.log(product);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success("Product updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      toast.error(errorUpdating);
      console.error(error);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
  return (
    <div>
      {error ? (
        <Error>{errorUpdating}</Error>
      ) : productUpdating ? (
        <LoadingSpinner />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center  text-gray-800 ">
            Edit Product
          </h2>

          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
            <input
              type="text"
              placeholder="Brand"
              className="w-full px-4 py-2 border rounded-lg"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2 border rounded-lg"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="number"
              placeholder="Stock Count"
              className="w-full px-4 py-2 border rounded-lg"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-2 border rounded-lg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductEditScreen;
