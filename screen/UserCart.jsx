import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import UserCartProductCard from "@/Newcomponents/UserCartProductCard";

function UserCart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    const item = cartItems.find((x) => x._id === id);
    if (item && item.qty < item.countInStock) {
      dispatch(addToCart({ ...item, qty: item.qty + 1 }));
    }
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((x) => x._id === id);
    if (item && item.qty > 1) {
      dispatch(addToCart({ ...item, qty: item.qty - 1 }));
    }
  };

  return (
    <div className="container mx-auto p-6  min-h-screen min-w-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Cart Items List */}
        <div className="flex-1">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">
              Your cart is empty.{" "}
              <Link to="/" className="text-blue-500 underline">
                Go shopping
              </Link>
            </p>
          ) : (
            cartItems.map((item) => (
              <UserCartProductCard
                key={item._id}
                product={item}
                onRemove={handleRemove}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))
          )}
        </div>

        {/* Total Price Box */}
        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6 w-full max-w-sm self-start">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <p className="text-lg">Total Items: {cartItems.length}</p>
          <p className="text-xl font-bold mt-2">
            Total: ${totalPrice.toFixed(2)}
          </p>

          {userInfo ? (
            <Link to={"/secure-checkout"}>
              <button className="mt-4 w-full hover:cursor-pointer bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition">
                Proceed to Checkout
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="mt-4 w-full hover:cursor-pointer bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition">
                {" "}
                Please log in{" "}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCart;
