import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

// ✅ Image is served from public folder, no need to import
// Just reference it directly with /filename.ext

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axiosInstance.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/founder");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-4xl rounded-lg shadow overflow-hidden">
        {/* Left Image */}
        <div className="md:w-1/2 bg-white p-4 flex items-center justify-center">
          <img
            src="/login-illustration.png"
            alt="Login illustration"
            className="w-full h-auto max-w-sm"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-[#2D2E83] mb-4">
            FrameKit Admin Login
          </h2>
          {message && <p className="text-red-500 text-center">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D2E83]"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2D2E83]"
              required
            />
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="#" className="text-sm text-[#2D2E83] hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-[#2D2E83] hover:bg-[#1c1d6a] text-white py-2 rounded"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-[#2D2E83] hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
