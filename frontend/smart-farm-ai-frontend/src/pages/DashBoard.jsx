import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Droplets,
  Beaker,
  MapPin,
  TrendingUp,
  Sprout,
  IndianRupee,
  CloudSun,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [stats, setStats] = useState({
    crop: "Not Set",
    moisture: "Unknown",
    ph: "N/A",
    location: "Not Set",
  });

  useEffect(() => {
    fetchLatestHistory();
    // eslint-disable-next-line
  }, []);

  const fetchLatestHistory = async () => {
    try {
      const res = await api.get(`/history/${username}`);
      if (!res.data || res.data.length === 0) return;

      // latest entry
      const latest = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )[0];

      const text = latest.aiResult.toLowerCase();

      // 🔍 Soil Moisture
      let moisture = "Unknown";
      if (text.includes("low") || text.includes("कम")) moisture = "Low";
      else if (text.includes("medium") || text.includes("ठीक"))
        moisture = "Medium";
      else if (text.includes("high") || text.includes("ज्यादा"))
        moisture = "High";

      // 🔍 Soil pH
      let ph = "N/A";
      const phMatch = text.match(/ph\s*[\:\=]?\s*(\d+(\.\d+)?)/);
      if (phMatch) ph = phMatch[1];

      // 🔍 Crop Type
      let crop = "Not Set";
      if (text.includes("धान") || text.includes("paddy")) crop = "Paddy";
      else if (text.includes("गेहूं") || text.includes("wheat")) crop = "Wheat";

      setStats({
        crop,
        moisture,
        ph,
        location: "Not Set", // not available in backend
      });
    } catch (err) {
      console.error("Failed to load stats");
    }
  };

  const features = [
    {
      title: "Analyze Farm",
      desc: "Get AI-based water, fertilizer & labor advice",
      icon: <Leaf className="text-green-600" />,
      path: "/analyze",
    },
    {
      title: "Crop Prediction",
      desc: "Find best crops based on soil & land",
      icon: <Sprout className="text-blue-600" />,
      path: "/crop-prediction",
    },
    {
      title: "Cost Optimization",
      desc: "Estimate cost & reduce farming expenses",
      icon: <IndianRupee className="text-yellow-600" />,
      path: "/cost-optimization",
    },
    {
      title: "Weather Alerts",
      desc: "Get smart weather-based farming alerts",
      icon: <CloudSun className="text-purple-600" />,
      path: "/weather-alerts",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {username}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Optimize your farm resources with AI-powered insights
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<Leaf className="text-green-600" />}
            label="Temp"
            value="29°C"
          />
          <StatCard
            icon={<Droplets className="text-blue-600" />}
            label="Weather"
            value="Sunny"
          />
          <StatCard
            icon={<Beaker className="text-purple-600" />}
            label="Season"
            value="Rabi"
          />
          <StatCard
            icon={<MapPin className="text-orange-600" />}
            label="Location"
            value="Paralakhemundi"
          />
        </div>

        {/* AI CTA */}
        {/* 🎥 AI CTA with Video Background */}
<div className="relative rounded-2xl overflow-hidden shadow-lg mb-12">
  
  {/* Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    muted
    loop
    playsInline
  >
    {/* 👇 CHANGE THIS PATH */}
    <source src="/videos/farm-bg.mp4" type="video/mp4" />
  </video>

  {/* Dark Overlay for readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 p-10 text-center text-white">
    <div className="flex justify-center mb-4">
      <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
        <TrendingUp className="text-white" />
      </div>
    </div>

    <h2 className="text-2xl font-bold mb-2">
      Get AI-Powered Recommendations
    </h2>

    <p className="max-w-2xl mx-auto mb-6 text-white/90">
      Analyze your farm data to receive personalized AI recommendations.
    </p>

    <button
      onClick={() => navigate("/analyze")}
      className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
    >
      <TrendingUp size={18} />
      Analyze Farm Data
    </button>
  </div>
</div>


        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition border hover:border-green-300"
            >
              <div className="mb-4 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      {/* 🌱 About Section with Lighter Background */}
<div className="mt-16">
  <div className="relative overflow-hidden rounded-2xl shadow-lg border">

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

    {/* 🌑 Light overlay for contrast (NOT blocking video) */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Content */}
    <div className="relative p-10">
      
      {/* Semi-transparent content container */}
      <div className="bg-white/70 rounded-2xl p-8">

        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          🌱 About Smart Farm AI
        </h3>

        <p className="text-gray-800 leading-relaxed mb-4">
          <span className="font-semibold">Smart Farm AI</span> is an
          AI-powered decision support platform that helps farmers make
          <span className="text-green-700 font-medium">
            {" "}smarter, sustainable, and cost-effective farming decisions
          </span>.
        </p>

        <p className="text-gray-800 leading-relaxed mb-8">
          By analyzing <b>soil conditions</b>, <b>weather</b>, <b>season</b>, and
          <b> location</b>, the platform delivers personalized recommendations for
          irrigation, fertilizer planning, labor management, and cost reduction.
        </p>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50/80 border border-green-200 rounded-xl p-5 text-sm">
            💧 <b>Water Optimization</b>
            <p className="text-gray-700 mt-1">
              Reduce water wastage with AI-driven irrigation insights
            </p>
          </div>

          <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-5 text-sm">
            🌱 <b>Soil & Crop Health</b>
            <p className="text-gray-700 mt-1">
              Improve yield through data-backed soil analysis
            </p>
          </div>

          <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-5 text-sm">
            🌍 <b>Farmer-Friendly AI</b>
            <p className="text-gray-700 mt-1">
              Regional language support for easy adoption
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center text-green-800 font-semibold text-lg">
          Kisan Ka Faisla, AI Ka Sahara 🌾
        </div>
      </div>
    </div>
  </div>
</div>



      </main>
    </>
  );
}

/* ---------- Reusable ---------- */
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
