import { addToCart } from "@/slices/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "../Newcomponents/StarRating";

function Product({ product }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
        image: product.image[0],
        price: product.price,
        qty: quantity, // default qty
      })
    );
  };
  return (
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
          <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
          <div className="flex flex-row">
            <StarRating value={product.rating || 0} readOnly={true} />
            <span className="mt-0.5 ml-1">({product.numReviews})</span>
          </div>

          {product.countInStock > 0 ? (
            <button
              className="bg-amber-300 active:bg-amber-500 shadow-lg transition-colors rounded-3xl px-3 py-1 cursor-pointer text-sm"
              onClick={() => {
                handleIncreaseQuantity();
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="bg-amber-300 rounded-3xl px-3 py-1 cursor-pointer text-sm"
              disabled
            >
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
