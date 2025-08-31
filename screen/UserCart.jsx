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
    <div className="container mx-auto  flex flex-col md:p-6  min-h-screen min-w-screen">
      <div className=" flex justify-center  items-center text-center">
        <h1 className="md:text-3xl my-4 font-bold md:mb-6 text-blue-800">
          Shopping Cart
        </h1>
      </div>

      <div className="flex flex-col justify-between items-center gap-6  ">
        {/* Cart Items List */}
        <div className="  flex flex-col justify-center items-center">
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
        <div className="bg-blue-500  text-white md:rounded-xl p-6 w-full md:max-w-2xl">
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
