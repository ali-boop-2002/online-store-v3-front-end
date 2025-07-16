import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screen/HomeScreen";
import ProductScreen from "../screen/ProductScreen";
import AppLayout from "../screen/AppLayout";
import LoginScreen from "../screen/LoginScreen";
import SignupScreen from "../screen/SignupScreen";
import VerifiedSuccessScreen from "../screen/VerifiedSuccessScreen";
import { Bounce, ToastContainer } from "react-toastify";
import ProfileScreen from "../screen/ProfileScreen";
import PrivateRoute from "@/Newcomponents/PrivateRoute";
import ProductUpload from "@/screen/ProductUpload";
import ProductEdit from "@/screen/ProductEdit";
import AdminProductPage from "@/screen/AdminProductPage";
import ProductEditScreen from "@/screen/ProductEditScreen";
import UserCart from "@/screen/UserCart";
import CheckOutScreen from "@/screen/CheckOutScreen";
import SuccessPage from "@/screen/Success";
import CancelPage from "@/screen/Cance";
import MyOrder from "@/screen/MyOrder";
import DashboardScreen from "@/screen/DashboardScreen";
import AdminRoutes from "@/Newcomponents/AdminRoutes";
import AdminOrderScreen from "@/screen/AdminOrderScreen";

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
