import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/constants";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  // const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  console.log(API_ENDPOINTS.BASE);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/");
    } catch (err) {
      setError(err?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded text-sm mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 hover:cursor-pointer rounded transition duration-200"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <Link
          to="/signup"
          className="block text-center w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 rounded transition duration-200 mt-5"
        >
          Sign Up
        </Link>
      </form>
    </div>
  );
}

export default LoginScreen;
