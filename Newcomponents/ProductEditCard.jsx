import { useDeleteProductMutation } from "@/slices/productApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductEditCard({ product }) {
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  //   const [updateProduct, { isLoading: productLoading, error: errorUpdate }] =
  //     useUpdateProductMutation();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    if (error) console.log(error);
    try {
      await deleteProduct(product._id).unwrap();
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error?.data?.message || "Delete failed");
      console.log(error);
    }
  };
  //   const handleUpdate = async () => {};
  return (
    <div>
      <div>
        <div
          key={product._id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-200"
        >
          <Link to={`/product/${product._id}`}>
            <img
              src={`${product.image[0]}`}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold ">{product.name}</h2>
            <p className="text-gray-600 truncate">{product.description}</p>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <p className="text-indigo-600 font-bold text-lg">
              ${product.price}
            </p>
            <Link to={`/Edit-product/${product._id}`}>
              <button className="bg-red-300 rounded-3xl px-6 py-1 cursor-pointer text-sm ">
                Edit
              </button>
            </Link>
            <button
              className="bg-red-500 rounded-3xl px-3 py-1 cursor-pointer text-sm "
              onClick={handleDelete}
            >
              {isLoading ? "Deleting..." : "DELETE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEditCard;
