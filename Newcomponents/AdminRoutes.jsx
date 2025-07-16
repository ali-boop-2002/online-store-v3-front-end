import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AdminRoutes() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default AdminRoutes;
