import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  PieChart,
} from "recharts";
import {
  useGetOrderDeliveryStatsQuery,
  useGetSaleSummaryQuery,
  useGetTotalOrdersQuery,
} from "@/slices/orderApiSlice";
import LoadingSpinner from "@/Newcomponents/LoadingSpinner";
import { Package, ShoppingBag, Users } from "lucide-react";
import Error from "@/Newcomponents/Error";
import { useGetTotalUserQuery } from "@/slices/userApiSlice";
import { useGetTotalProductsQuery } from "@/slices/productApiSlice";
import { Link } from "react-router-dom";

function DashboardScreen() {
  const { data: saleSummary, isLoading, error } = useGetSaleSummaryQuery();
  const {
    data: deliveryStats,
    isLoading: loadingDeliveryStats,
    isError: errorDeliveryStats,
  } = useGetOrderDeliveryStatsQuery();
  const deliveryPieData = deliveryStats
    ? [
        { name: "Delivered", value: deliveryStats.delivered },
        { name: "Not Delivered", value: deliveryStats.notDelivered },
      ]
    : [];
  const COLORS = ["#00C49F", "#FF8042"]; // Green and Orange
  console.log(deliveryStats);
  const {
    data: totalOrders,
    isLoading: orderLoading,
    isError: errorLoading,
  } = useGetTotalOrdersQuery();
  const {
    data: totalProducts,
    isLoading: productLoading,
    isError: productErrorLoading,
  } = useGetTotalProductsQuery();
  console.log(totalProducts);
  const {
    data: totalUsers,
    isLoading: userLoading,
    isError: userErrorLoading,
  } = useGetTotalUserQuery();
  console.log(totalUsers);
  return (
    <div className="p-8 h-screen bg-blue-100">
      <h2 className="text-2xl font-semibold mb-6">Stats</h2>

      {isLoading && <LoadingSpinner />}
      {error && <p className="text-red-500">Error loading data.</p>}
      <div className="flex flex-row">
        {productLoading ? (
          <LoadingSpinner />
        ) : productErrorLoading ? (
          <Error />
        ) : (
          <div className="bg-blue-300 max-w-40 p-4 flex flex-col items-center rounded-2xl shadow-2xl m-10">
            <label>
              <Package size={100} />
            </label>
            <h1 className="text-4xl"> {totalProducts?.totalProducts}</h1>
            <h1 className="mt-4 ">Total Products</h1>
          </div>
        )}
        {userLoading ? (
          <LoadingSpinner />
        ) : userErrorLoading ? (
          <Error />
        ) : (
          <div className="bg-blue-300 max-w-40 p-4 flex flex-col items-center rounded-2xl shadow-2xl m-10">
            <label>
              <Users size={100} />
            </label>
            <h1 className="text-4xl"> {totalUsers?.totalUsers}</h1>
            <h1 className="mt-4 ">Total Users</h1>
          </div>
        )}
        {orderLoading ? (
          <LoadingSpinner />
        ) : errorLoading ? (
          <Error />
        ) : (
          <Link to={"/all-orders"}>
            <div className="bg-blue-300 max-w-40 p-4 flex flex-col items-center rounded-2xl shadow-2xl m-10 hover:cursor-pointer">
              <label>
                <ShoppingBag size={100} />
              </label>
              <h1 className="text-4xl"> {totalOrders?.totalOrders}</h1>
              <h1 className="mt-4 ">Total Orders</h1>
            </div>
          </Link>
        )}
      </div>
      <div className="flex flex-row justify-between ">
        <div className="m-10">
          {saleSummary && saleSummary.length > 0 && (
            <div className="bg-gray-100 p-4 rounded shadow-2xl mt-10 min-w-150 ">
              <h1 className="font-bold text-3xl">Total Sales</h1>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={saleSummary}>
                  <CartesianGrid strokeDasharray="5" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="totalSales" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="m-5 min-w-150">
          {deliveryPieData.length > 0 && (
            <div className="bg-gray-100 p-4 mt-10 max-w-150 rounded-2xl shadow-2xl">
              <h1 className="font-bold text-3xl mb-4">Delivery Status</h1>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deliveryPieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {deliveryPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardScreen;
