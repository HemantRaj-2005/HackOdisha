import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Please fill in the email.");
      return false;
    }
    if (!formData.password) {
      toast.error("Please fill in the password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
        dispatch(signInStart());
        const res = await fetch('/server/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (data.success === false) {
          dispatch(signInFailure(data));
          toast.error(data.message || "Sign-in failed. Please try again.");
          return;
        }
        dispatch(signInSuccess(data));
        toast.success("Sign-in successful!");
        navigate('/');
      } catch (error) {
        dispatch(signInFailure(error));
        toast.error("An unexpected error occurred. Please try again.");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#070614] via-[#121024] to-[#000000]">
      <div className="max-w-lg w-full bg-[#1c1c2c]/75 backdrop-blur-md rounded-2xl shadow-2xl p-10 relative">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Sign In
        </h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-[#d1d5db] text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#373757] text-white focus:outline-none focus:ring-2 focus:ring-[#7e00ff] transition duration-300"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-[#d1d5db] text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#373757] text-white focus:outline-none focus:ring-2 focus:ring-[#7e00ff] transition duration-300"
              onChange={handleChange}
              value={formData.password}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#7e00ff] to-[#ff0080] hover:from-[#7e00ff] hover:to-[#ff0080] text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-[#d1d5db] text-center mt-6">
          Don't have an account?{" "}
          <Link to={"/sign-up"}>
            <span className="text-[#b274ef] hover:text-[#ff0080]">Sign Up</span>
          </Link>
        </p>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
