import { useGetMyOrderQuery } from "@/slices/orderApiSlice";
import { Link } from "react-router-dom";

function MyOrder() {
  const { data: orders, isLoading, isError } = useGetMyOrderQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders.</div>;

  const allOrderItems = orders.flatMap((order) =>
    order.orderItems.map((item) => ({
      ...item,
      isDelivered: order.isDelivered,
      productId: item.product,
    }))
  );

  //   const allOrderItems = orders.flatMap((order) => order.orderItems);

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Ordered Items</h2>
      {allOrderItems.length === 0 ? (
        <p>You have no items yet.</p>
      ) : (
        allOrderItems.map((item, index) => (
          <div key={index} className="border p-2 rounded mb-2 w-2xl">
            <p>
              <strong>Name:</strong> {item.name}...
            </p>
            <p>
              <strong>Quantity:</strong> {item.qty}
            </p>
            <p>
              <strong>Price:</strong> ${item.price}
            </p>
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover mt-2"
            />
            <p>
              <strong>Delivery status:</strong>{" "}
              {item.isDelivered ? (
                <span className="bg-green-300 px-2 py-1 rounded">
                  Delivered
                </span>
              ) : (
                <span className="bg-red-400 px-2 py-1 rounded">
                  Not delivered
                </span>
              )}
              <button className="bg-amber-300 px-2 rounded-2xl ml-2 hover:cursor-pointer">
                <Link to={`/product/${item.productId}`}>View item</Link>
              </button>
              <button className="bg-blue-400 px-2 rounded-2xl hover:cursor-pointer ml-2">
                Report a problem?
              </button>
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrder;
