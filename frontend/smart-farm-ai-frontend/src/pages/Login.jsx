import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Sprout,
  User,
  Lock,
  Droplets,
  Leaf,
  CloudSun,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("language", res.data.preferredLanguage);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f7fdf9]">

      {/* LEFT – Brand / Value Section */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Smart Farm AI
          </h1>
          <p className="text-green-100 mb-10 max-w-md">
            AI-powered decision support system helping farmers improve yield,
            reduce cost, and adopt sustainable farming practices.
          </p>

          <div className="space-y-6 text-green-100">
            <div className="flex items-center gap-3">
              <Droplets />
              <span>Smart irrigation & water optimization</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf />
              <span>Crop & soil health recommendations</span>
            </div>
            <div className="flex items-center gap-3">
              <CloudSun />
              <span>Weather-aware farming insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT – Login with Video Background */}
      <div className="relative flex items-center justify-center px-6 overflow-hidden">

        {/* 🎥 Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* 🔁 CHANGE VIDEO PATH HERE */}
          <source src="/videos/farming-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/35"></div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-600 text-white p-4 rounded-2xl shadow">
              <Sprout size={32} />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-gray-900">
              Welcome Back
            </h1>
            <p className="text-gray-700 text-sm">
              Login to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative mt-1">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="username"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none bg-white"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={login}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-700 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-700 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
