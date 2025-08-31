import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { ChevronDown, CircleUserRound, ShoppingCart } from "lucide-react"; // optional icon

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOut] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await logOut().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-blue-800 text-white shadow-md max-w-screen">
      <div className=" mx-auto flex flex-row items-center justify-around p-1 ">
        <Link to="/" className="hover:text-blue-400 ">
          <h1 className="md:text-4xl text-2xl font-mono font-bold cursor-pointer">
            Desigo
          </h1>
        </Link>

        <Link to="/" className="hover:text-blue-400 md:text-2xl">
          Home
        </Link>

        <Link
          to="/my-cart"
          className=" justify-center md:text-2xl  w-30 hidden md:flex items-center gap-1 hover:text-blue-400 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart {totalItems ? totalItems : ""}
        </Link>
        <Link
          to="/my-cart"
          className="flex justify-center relative md:hidden items-center  gap-1 hover:text-blue-400 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems && (
            <span className="bg-red-500 rounded-full text-[13px] p-1 absolute left-3 bottom-2 w-5 text-center h-5 flex justify-center items-center">
              {totalItems ? totalItems : ""}
            </span>
          )}
        </Link>
        {userInfo?.isAdmin && (
          <Link to={"/Admin-page"} className="hover:text-blue-400 md:text-2xl">
            Dashboard
          </Link>
        )}
        <Link to={"/myOrder"} className="hover:text-blue-400 md:text-2xl">
          Orders
        </Link>

        {/* Your existing user dropdown code continues below */}

        {userInfo ? (
          <div>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-1 hover:text-blue-400 transition"
            >
              <span className="block md:hidden hover:cursor-pointer">
                {userInfo.name.slice(0, 7)}...
              </span>
              <span className="hidden md:block hover:cursor-pointer">
                Hello {userInfo.name}
              </span>
              <span className="hover:cursor-pointer">
                <CircleUserRound />
              </span>
              <ChevronDown className="w-4 h-4  hover:text-blue-400 hover:cursor-pointer" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded shadow-lg z-50">
                <Link to="/my-profile">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2  hover:bg-gray-100 hover:cursor-pointer"
                  >
                    Profile
                  </button>
                </Link>
                {userInfo.isAdmin && (
                  <Link to="/Add-product">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/Add-product");
                      }}
                      className="block w-full text-left px-4 py-2  hover:bg-gray-100 hover:cursor-pointer"
                    >
                      Add product
                    </button>
                  </Link>
                )}
                {userInfo.isAdmin && (
                  <Link to="/Edit-product">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/Add-product");
                      }}
                      className="block w-full text-left px-4 py-2  hover:bg-gray-100 hover:cursor-pointer"
                    >
                      Edit product
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logoutHandler();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:block hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-blue-400">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
