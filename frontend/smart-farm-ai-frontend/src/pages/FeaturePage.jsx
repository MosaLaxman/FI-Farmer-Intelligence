import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Sprout,
  IndianRupee,
  CloudSun,
} from "lucide-react";

export default function FeaturePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Analyze Farm",
      desc: "Get AI-based recommendations for water usage, fertilizer planning, and labor management based on farm data.",
      icon: <Leaf className="text-green-600" size={28} />,
      path: "/analyze",
      video: "/videos/animate.mp4",
    },
    {
      title: "Crop Prediction",
      desc: "Predict the most suitable crops based on soil conditions, season, location, and land area.",
      icon: <Sprout className="text-blue-600" size={28} />,
      path: "/crop-prediction",
      video: "/videos/animate.mp4",
    },
    {
      title: "Cost Optimization",
      desc: "Estimate farming costs and discover smart ways to reduce expenses while maintaining productivity.",
      icon: <IndianRupee className="text-yellow-600" size={28} />,
      path: "/cost-optimization",
      video: "/videos/animate.mp4",
    },
    {
      title: "Weather Alerts",
      desc: "Receive weather-based alerts and insights to take timely actions and protect crops.",
      icon: <CloudSun className="text-purple-600" size={28} />,
      path: "/weather-alerts",
      video: "/videos/animate.mp4",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Platform Features
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            AI-powered tools designed to help farmers make smarter,
            data-driven, and sustainable farming decisions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden
                         border border-gray-100 shadow-md
                         transition-all duration-300
                         hover:-translate-y-2 hover:shadow-xl hover:border-green-300"
            >
              {/* 🎥 Background Video */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={feature.video} type="video/mp4" />
              </video>

              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition"></div>

              {/* Card Content */}
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 
                                transition group-hover:scale-110 shadow-sm">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-700 text-sm flex-grow">
                  {feature.desc}
                </p>

                <div className="mt-6 text-green-600 font-medium text-sm">
                  Explore →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Use These Features */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-10 border">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Why Use Smart Farm AI?
          </h2>

          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Smart Farm AI combines farm data with artificial intelligence to help
            farmers reduce costs, improve productivity, and adopt sustainable
            farming practices with confidence.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">💧 Optimized</p>
              <p className="text-gray-700 text-sm mt-2">
                Efficient water and fertilizer usage based on real conditions
              </p>
            </div>

            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">💰 Cost Saving</p>
              <p className="text-gray-700 text-sm mt-2">
                Reduced operational expenses through smart planning
              </p>
            </div>

            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">🌾 Sustainable</p>
              <p className="text-gray-700 text-sm mt-2">
                Eco-friendly and data-driven farming decisions
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Start Making Smarter Farming Decisions
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Analyze your farm data with Smart Farm AI and receive actionable
            recommendations tailored to your field conditions.
          </p>

          <button
            onClick={() => navigate("/analyze")}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 
                       rounded-xl font-semibold transition-transform duration-300
                       hover:scale-105 shadow-md"
          >
            Start New Analysis
          </button>
        </div>
      </main>
    </>
  );
}
