import AdminRoutes from "@/Newcomponents/AdminRoutes";
import PrivateRoute from "@/Newcomponents/PrivateRoute";
import AdminOrderScreen from "@/screen/AdminOrderScreen";
import AdminProductPage from "@/screen/AdminProductPage";
import CheckOutScreen from "@/screen/CheckOutScreen";
import DashboardScreen from "@/screen/DashboardScreen";
import MyOrder from "@/screen/MyOrder";
import ProductEditScreen from "@/screen/ProductEditScreen";
import ProductUpload from "@/screen/ProductUpload";
import SuccessPage from "@/screen/Success";
import UserCart from "@/screen/UserCart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import AppLayout from "../screen/AppLayout";
import HomeScreen from "../screen/HomeScreen";
import LoginScreen from "../screen/LoginScreen";
import ProductScreen from "../screen/ProductScreen";
import ProfileScreen from "../screen/ProfileScreen";
import SignupScreen from "../screen/SignupScreen";
import VerifiedSuccessScreen from "../screen/VerifiedSuccessScreen";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomeScreen /> },
      { path: "/product/:id", element: <ProductScreen /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/signup", element: <SignupScreen /> },
      { path: "/verified-success", element: <VerifiedSuccessScreen /> },
      { path: "/my-cart", element: <UserCart /> },

      // ✅ Protected route
      {
        element: <PrivateRoute />,
        children: [
          { path: "/my-profile", element: <ProfileScreen /> },
          { element: <ProductUpload />, path: "/Add-product" },
          { element: <AdminProductPage />, path: "/Edit-product" },
          { element: <ProductEditScreen />, path: "/Edit-product/:id" },
          { element: <CheckOutScreen />, path: "/secure-checkout" },
          { element: <SuccessPage />, path: "/success/:orderId" },
          { element: <HomeScreen />, path: "/cancel" },
          { element: <MyOrder />, path: "/myOrder" },
        ],
      },
      {
        element: <AdminRoutes />,
        children: [
          { element: <DashboardScreen />, path: "/Admin-page" },
          { element: <AdminOrderScreen />, path: "/all-orders" },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <div className="min-h-screen min-w-screen ">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
