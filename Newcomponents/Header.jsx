import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { ChevronDown, CircleUserRound, ShoppingCart } from "lucide-react"; // optional icon

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
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
    <header className="bg-blue-800 text-white px-6 py-4 shadow-md min-w-screen">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold cursor-pointer">MyStore</h1>

        <nav className="space-x-6 relative flex items-center">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link
            to="/my-cart"
            className="inline-flex items-center gap-1 hover:text-blue-400 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart {totalItems ? totalItems : ""}
          </Link>
          {userInfo?.isAdmin && (
            <Link to={"/Admin-page"} className="hover:text-blue-400">
              Dashboard
            </Link>
          )}
          <Link to={"/myOrder"} className="hover:text-blue-400">
            Orders
          </Link>

          {/* Your existing user dropdown code continues below */}

          {userInfo ? (
            <div className="inline-block relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-1 hover:text-blue-400 transition"
              >
                <span className="hover:cursor-pointer">
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
        </nav>
      </div>
    </header>
  );
}

export default Header;
