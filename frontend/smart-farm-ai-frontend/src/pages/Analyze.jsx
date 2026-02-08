import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { Droplets, Leaf, MapPin, Beaker, PlayCircle } from "lucide-react";

export default function Analyze() {
  const [form, setForm] = useState({
    crop: "",
    soilMoisture: "",
    soilPh: "",
    location: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/analyze", {
        username: localStorage.getItem("username"),
        crop: form.crop,
        soilMoisture: form.soilMoisture,
        soilPh: Number(form.soilPh),
        location: form.location,
      });

      setResult(res.data);
    } catch {
      setError("Failed to analyze farm data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Analysis</h1>
          <p className="text-gray-600 mt-1">
            Enter farm details to receive AI-powered recommendations
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crop Type
              </label>
              <div className="relative">
                <Leaf
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="crop"
                  onChange={handleChange}
                  placeholder="e.g. Paddy"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Soil Moisture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil Moisture Level
              </label>
              <div className="relative">
                <Droplets
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="soilMoisture"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select moisture level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Soil pH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil pH
              </label>
              <div className="relative">
                <Beaker
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  step="0.1"
                  name="soilPh"
                  onChange={handleChange}
                  placeholder="e.g. 6.5"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8">
            <button
              onClick={analyze}
              disabled={loading}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold transition shadow-md"
            >
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-green-700 mb-5 flex items-center gap-2">
              🌿 AI Recommendations
            </h3>

            <div className="grid gap-4">
              <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">
                  Water Recommendation
                </p>
                <p className="text-gray-800">
                  💧 <b>Water:</b> {result.water}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">
                  Fertilizer Recommendation
                </p>
                <p className="text-gray-800">
                  🌱 <b>Fertilizer:</b> {result.fertilizer}
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">
                  Labor Recommendation
                </p>
                <p className="text-gray-800">
                  👨‍🌾 <b>Labor:</b> {result.labor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 🎥 Analysis Video Section */}
        <div className="mt-12">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border">
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center gap-2">
              <PlayCircle className="text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Understanding the Analysis
              </h3>
            </div>

            {/* Video */}
            <div className="relative">
              <video className="w-full h-[320px] object-cover" controls muted>
                {/* 🔁 CHANGE VIDEO PATH HERE */}
                <source src="/videos/analysis-explainer.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Caption */}
            <div className="px-6 py-4 text-sm text-gray-600">
              This video explains how Smart Farm AI analyzes your farm data and
              generates recommendations for water usage, fertilizer planning,
              and labor management.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
