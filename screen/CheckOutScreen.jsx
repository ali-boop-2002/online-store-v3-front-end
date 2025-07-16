import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import { useCreateOrderMutation } from "@/slices/orderApiSlice";
import { useCreateCheckoutSessionMutation } from "@/slices/paymentSlice";
// import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function CheckOutScreen() {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const [createOrder, { loading: creating, error: orderError }] =
    useCreateOrderMutation();
  const [createCheckoutSession, { loading, error }] =
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
      const createdOrder = await createOrder(orderData).unwrap();

      const { url } = await createCheckoutSession({
        ...orderData,
        orderId: createdOrder._id, // send full order data as metadata
      }).unwrap();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error", err);
      toast.error("Checkout error", err);
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
    <div className="md:flex md:flex-row min-h-screen min-w-screen">
      <div className="md:ml-5  ">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex rounded-2xl flex-row justify-evenly max-w-3xs mt-3 p-3 ml-4"
          >
            <img src={item.image} className="h-15 w-20 " />
            <div>
              <p> ${item.price}</p>
              <p>quantity {item.qty}</p>
              <p>{item.description.slice(0, 40)}...</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" rounded-2xl md:ml-16 mt-6 p-4 md:shadow-2xl bg-gray-100 m-2">
        <form className="flex flex-col sm:min-w-3xl gap-20  ">
          <h1 className="text-3xl">Shipping Address</h1>
          <input
            type="text"
            className="bg-white h-15 rounded-2xl sm:max-w-170 focus:outline-none focus:ring-4 focus:ring-blue-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="address"
          ></input>
          <input
            type="text"
            className="bg-white rounded focus:outline-none focus:ring-4 sm:max-w-170 focus:ring-blue-400"
            required
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <input
            type="text"
            className="bg-white focus:outline-none focus:ring-4 sm:max-w-170 focus:ring-blue-400"
            required
            placeholder="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
          <select
            className="bg-white rounded-2xl h-20 focus:outline-none sm:max-w-170 focus:ring-4 focus:ring-blue-400"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Select-Country</option>
            <option value={"US"}>US</option>
            <option value={"CA"}>CA</option>
          </select>
          <select
            className="bg-white rounded-2xl h-20 focus:outline-none focus:ring-4 sm:max-w-170 focus:ring-blue-400"
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
      <div className="max-w-70 m-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 p-5 text-xl bg-gray-100 rounded-2xl md:min-w-70">
            <p>Items: ${itemsPrice.toFixed(2)}</p>
            <p>Tax: ${(0.08 * itemsPrice).toFixed(2)}</p>
            <p>Shipping: ${shippingPrice || 0}</p>
            <p className="font-bold">
              Total: $
              {(itemsPrice + (shippingPrice || 0) + 0.08 * itemsPrice).toFixed(
                2
              )}
            </p>
            <button
              className="bg-amber-300 p-3 rounded-2xl hover:cursor-pointer shadow-2xl"
              onClick={async () => {
                const isFormValid =
                  address && city && postalCode && country && shippingPrice;

                if (!isFormValid) {
                  setFormError(true);
                  return;
                }

                // await handleSubmit(); // 1. Store order in DB
                await handleCheckout(); // 2. Redirect to Stripe
              }}
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckOutScreen;
