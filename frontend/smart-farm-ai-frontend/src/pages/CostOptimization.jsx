import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Ruler,
  Droplets,
  FlaskConical,
  Users,
  IndianRupee,
} from "lucide-react";

export default function CostOptimization() {
  const [form, setForm] = useState({
    crop: "",
    landArea: "",
    irrigationType: "",
    fertilizerType: "",
    laborDays: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyzeCost = async () => {
    setError("");
    setResult("");
    setLoading(true);

    try {
      const res = await api.post("/cost-optimization", {
        username: localStorage.getItem("username"),
        crop: form.crop,
        landArea: Number(form.landArea),
        irrigationType: form.irrigationType,
        fertilizerType: form.fertilizerType,
        laborDays: Number(form.laborDays),
      });

      setResult(res.data);
    } catch {
      setError("Failed to analyze cost");
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
          <h1 className="text-3xl font-bold text-gray-900">
            Cost Optimization
          </h1>
          <p className="text-gray-600 mt-1">
            Estimate farming costs and discover ways to reduce expenses
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

            {/* Land Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Area (acres)
              </label>
              <div className="relative">
                <Ruler
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  step="0.1"
                  name="landArea"
                  onChange={handleChange}
                  placeholder="e.g. 2.5"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Irrigation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Irrigation Type
              </label>
              <div className="relative">
                <Droplets
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="irrigationType"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select irrigation type</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip">Drip</option>
                  <option value="Borewell">Borewell</option>
                  <option value="Rainfed">Rainfed</option>
                </select>
              </div>
            </div>

            {/* Fertilizer Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fertilizer Type
              </label>
              <div className="relative">
                <FlaskConical
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <select
                  name="fertilizerType"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select fertilizer type</option>
                  <option value="Organic">Organic</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>

            {/* Labor Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Labor Days
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  name="laborDays"
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8">
            <button
              onClick={analyzeCost}
              disabled={loading}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold transition shadow-md flex items-center gap-2"
            >
              <IndianRupee />
              {loading ? "Analyzing..." : "Analyze Cost"}
            </button>

            {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          </div>
        </div>

        {/* Result */}
{result && (
  <div className="mt-8 bg-gradient-to-br from-emerald-50 to-green-50 border border-green-200 rounded-2xl p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        💰 AI Cost Analysis
      </h3>
      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
        AI Generated
      </span>
    </div>

    <div className="h-px bg-green-200 mb-4" />

    <div className="bg-white border border-green-100 rounded-xl p-5 shadow-sm">
      <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
        {result}
      </pre>
    </div>
  </div>
)}

      </main>
    </>
  );
}
