import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import { useCreateOrderMutation } from "@/slices/orderApiSlice";
import { useCreateCheckoutSessionMutation } from "@/slices/paymentSlice";
// import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CheckOutScreen() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  console.log("Cart items:", cartItems);
  console.log("User info:", userInfo);

  const [createOrder] = useCreateOrderMutation();
  const [createCheckoutSession, { loading }] =
    useCreateCheckoutSessionMutation();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [formError, setFormError] = useState(false);

  const itemsPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  const handleCheckout = async () => {
    // Check if user is authenticated
    if (!userInfo) {
      toast.error("Please log in to proceed with checkout");
      return;
    }

    console.log("User is authenticated:", userInfo);
    console.log("Checking cookies...");

    // Check if JWT cookie exists
    const cookies = document.cookie.split(";");
    const jwtCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("jwt=")
    );
    console.log("JWT cookie found:", !!jwtCookie);

    const isFormValid =
      address && city && postalCode && country && shippingPrice;

    if (!isFormValid) {
      setFormError(true);
      return;
    }

    const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
    }));

    // Prepare order data to send to backend
    const orderData = {
      orderItems,
      shippingAddress: { address, city, postalCode, country },
      paymentMethod: "Card",
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      console.log("Creating order with data:", orderData);
      console.log("User info:", userInfo);
      const createdOrder = await createOrder(orderData).unwrap();
      console.log("Order created successfully:", createdOrder);

      const result = await createCheckoutSession({
        ...orderData,
        orderId: createdOrder._id, // send full order data as metadata
      }).unwrap();
      console.log("Checkout session created:", result);

      if (result && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error("Failed to create checkout session - no URL received");
      }
    } catch (err) {
      console.error("Checkout error", err);
      console.error("Error details:", {
        status: err.status,
        data: err.data,
        message: err.message,
      });

      if (err.status === 401) {
        toast.error("Authentication failed. Please log in again.");
      } else if (err.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(err?.data?.message || err.message || "Checkout failed");
      }
    }
  };

  // const handleSubmit = async () => {
  //   const isFormValid =
  //     address && city && postalCode && country && shippingPrice;

  //   if (!isFormValid) {
  //     setFormError(true);
  //     return;
  //   }

  //   const taxPrice = Number((0.08 * itemsPrice).toFixed(2));
  //   const totalPrice = itemsPrice + taxPrice + shippingPrice;
  //   const orderItems = cartItems.map((item) => ({
  //     name: item.name,
  //     qty: item.qty,
  //     image: item.image,
  //     price: item.price,
  //     product: item._id,
  //   }));
  //   const orderData = {
  //     orderItems,
  //     shippingAddress: { address, city, postalCode, country },
  //     paymentMethod: "Card",
  //     itemsPrice,
  //     taxPrice,
  //     shippingPrice,
  //     totalPrice,
  //   };

  //   try {
  //     await createOrder(orderData).unwrap();
  //   } catch (error) {
  //     console.error("Order creation error:", error);
  //   }
  // };
  return (
    <div className="md:flex md:flex-row justify-around min-w-screen min-h-screen  ">
      <div className="md:hidden flex flex-row items-center space-x-4 bg-gray-200 overflow-x-auto w-full p-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col border border-gray-500 rounded-lg min-w-[200px] p-3"
          >
            <div className="flex justify-center items-center h-32">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <p className="font-bold">${item.price}</p>
              <p>x {item.qty}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" hidden md:flex flex-col bg-gray-200 justify-center items-center space-y-1 overflow-y-scroll max-w-[200px] w-full p-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col  border border-gray-300 max-w-[200px] min-w-[200px] p-1"
          >
            <div className="flex justify-center items-center h-32">
              <img
                src={item.image}
                alt={item.name}
                className="object-contain h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2">
              <p className="font-bold">${item.price}</p>
              <p>x {item.qty}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" p-4">
        {!userInfo && (
          <div className="bg-gray-100 border border-gray-400  px-4 py-3 rounded mb-4">
            Please log in to proceed with checkout
          </div>
        )}
        <form className="flex flex-col space-y-2">
          <div>
            <h1 className="md:text-3xl text-xl font-bold">Delivery</h1>
          </div>
          <div className=" space-y-2">
            <input
              type="text"
              className="border-2 border-gray-200 rounded-2xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="address"
            ></input>
            <input
              type="text"
              className="border-2 border-gray-200 rounded-2xl p-4 w-full focus:outline-none focus:ring-2  focus:ring-blue-400"
              required
              placeholder="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <input
              type="text"
              className="border-gray-200 border-2 rounded-2xl focus:outline-none focus:ring-2 w-full p-4 focus:ring-blue-400"
              required
              placeholder="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></input>
          </div>
          <select
            className="bg-white p-4 focus:outline-none w-full focus:ring-2 border-2 border-gray-200 rounded-2xl focus:ring-blue-400"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Select-Country</option>
            <option value={"US"}>US</option>
            <option value={"CA"}>CA</option>
          </select>
          <select
            className="bg-white  focus:outline-none focus:ring-2 border-2 border-gray-200 rounded-2xl p-4 w-full focus:ring-blue-400"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(Number(e.target.value))} // Convert to number
          >
            <option value="">Shipping</option>
            <option value={10}>NORMAL</option>
            <option value={20}>EXPRESS 3 day delivery</option>
          </select>
        </form>
        {formError && (
          <div className="text-red-600 mt-5 font-semibold">
            Please fill all fields
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="p-5 md:text-xl ">
            <p className="border-b-2 pb-2 border-gray-300">
              Items: ${itemsPrice.toFixed(2)}
            </p>
            <p className="border-b-2 pb-2 border-gray-300">
              Tax: ${(0.08 * itemsPrice).toFixed(2)}
            </p>
            <p className="border-b-2 pb-2 border-gray-300">
              Shipping: ${shippingPrice || 0}
            </p>
            <p className="font-bold">
              Total: $
              {(itemsPrice + (shippingPrice || 0) + 0.08 * itemsPrice).toFixed(
                2
              )}
            </p>
            <button
              className={`p-3 rounded-2xl w-full ${
                !userInfo
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-300 hover:cursor-pointer"
              }`}
              onClick={async () => {
                if (!userInfo) {
                  toast.error("Please log in to proceed with checkout");
                  return;
                }

                const isFormValid =
                  address && city && postalCode && country && shippingPrice;

                if (!isFormValid) {
                  setFormError(true);
                  return;
                }

                // await handleSubmit(); // 1. Store order in DB
                await handleCheckout(); // 2. Redirect to Stripe
              }}
              disabled={!userInfo}
            >
              {!userInfo ? "Please Log In" : "Proceed to Payment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckOutScreen;
