import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.username) {
      toast.error("Please fill in the username.");
      return false;
    }
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
      setLoading(true);
      const res = await fetch("/server/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        toast.error(data.message || "Signup failed. Please try again.");
        return;
      }
      toast.success("Signup successful! Welcome aboard!");
    } catch (error) {
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#060111] via-[#120220] to-[#000000]">
      <div className="max-w-lg w-full bg-[#060303]/75 backdrop-blur-md rounded-2xl shadow-2xl p-10 relative">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>
        <form>
          <div className="mb-6">
            <label
              className="block text-[#d1d5db] text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg bg-[#343457] text-white focus:outline-none focus:ring-2 focus:ring-[#7e00ff] transition duration-300"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
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
              className="w-full px-4 py-3 rounded-lg bg-[#343457] text-white focus:outline-none focus:ring-2 focus:ring-[#7e00ff] transition duration-300"
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
              className="w-full px-4 py-3 rounded-lg bg-[#343457] text-white focus:outline-none focus:ring-2 focus:ring-[#7e00ff] transition duration-300"
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-[#d1d5db] text-center mt-6">
          Already have an account?{" "}
          <Link to={"/sign-in"}>
            <span className="text-[#b274ef] hover:text-[#ff0080]">Sign In</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
