import { useState } from "react";
import { Sprout, User, Lock, Languages, Droplets, Leaf, CloudSun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    preferredLanguage: "en",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch {
      setError("Registration failed");
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

      {/* RIGHT – Register with Video Background */}
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

        {/* Register Card */}
        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-green-600 text-white p-4 rounded-2xl shadow">
              <Sprout size={32} />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-gray-900">
              Create Account
            </h1>
            <p className="text-gray-700 text-sm">
              Join Smart Farm AI
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

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
                  placeholder="Choose a username"
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
                  placeholder="Create a password"
                />
              </div>
            </div>

            {/* Preferred Language */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Preferred Language
              </label>
              <div className="relative mt-1">
                <Languages
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="preferredLanguage"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="te">Telugu</option>
                  <option value="or">Odia</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-700 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-green-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
