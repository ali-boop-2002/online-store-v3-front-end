import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import { clearCart } from "@/slices/cartSlice";
import { useGetOrderByIdQuery } from "@/slices/orderApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function SuccessPage() {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);
  console.log(order);
  const orderItems = order?.orderItems || [];
  console.log(orderItems);
  useEffect(() => {
    if (!isLoading) {
      if (order) {
        dispatch(clearCart());
      } else {
        navigate("/");
      }
    }
  }, [order, isLoading, dispatch, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading order.</div>;
  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Order placed successfully
        </h1>
        <p className="text-lg">Thank you for your purchase.</p>
        <div className="bg-gray-200 p-3 rounded-2xl shadow-2xl">
          {orderItems.map((item) => {
            return (
              <div key={item.product} className="flex flex-row ">
                <img className="h-25 w-30" src={item.image} />
                <div>
                  <p>{item.name.slice(0, 50)}</p>
                  <h2 className="text-blue-600 font-bold">
                    Your order Id is {`${orderId}`}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
