import { Outlet } from "react-router-dom";
import Header from "../Newcomponents/Header";
import Footer from "../Newcomponents/Footer";

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
