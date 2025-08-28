import { addToCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StarRating from "../Newcomponents/StarRating";
import { Check } from "lucide-react";

function Product({ product }) {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const cartProducts = cartItems.map((item) => {
    return item._id;
  });
  // console.log(cartProducts);
  // function handleIncreaseQuantity() {
  //   setQuantity((prev) => prev + 1);
  // }

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
      })
    );
  };
  return (
    <div>
      <div
        key={product._id}
        className="border rounded-lg p-4 shadow-sm  hover:shadow-md transition bg-orange-500"
      >
        <Link to={`/product/${product._id}`}>
          <img
            src={`${product.image[0]}`}
            alt={product.name}
            className="w-full h-48 object-contain mb-4 bg-purple-400"
          />
          <h2 className="text-lg font-semibold bg-amber-400 ">
            {product.name.slice(0, 145)}...
          </h2>
          <p className="text-gray-600 truncate bg-cyan-300">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-2 bg-red-500">
          <p className="text-indigo-600 font-bold text-lg">${product.price}</p>
          <div className="flex flex-row">
            <StarRating value={product.rating || 0} readOnly={true} />
            <span className="mt-0.5 ml-1">({product.numReviews})</span>
          </div>

          {product.countInStock > 0 ? (
            <button
              className={`${
                cartProducts.some((id) => id === product._id)
                  ? "bg-green-400"
                  : "bg-amber-300 active:bg-amber-500"
              }  shadow-lg transition-colors rounded-3xl px-3 py-1 cursor-pointer text-sm`}
              onClick={() => {
                handleAddToCart();
              }}
              disabled={cartProducts.some((id) => id === product._id)}
            >
              {cartProducts.some((id) => id === product._id) ? (
                <Check size={16} />
              ) : (
                "Add to cart"
              )}
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
