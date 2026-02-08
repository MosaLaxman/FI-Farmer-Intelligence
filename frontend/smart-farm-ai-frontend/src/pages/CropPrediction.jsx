import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import {
  Droplets,
  Beaker,
  MapPin,
  Calendar,
  Ruler,
  Sprout,
} from "lucide-react";

export default function CropPrediction() {
  const [form, setForm] = useState({
    soilMoisture: "",
    soilPh: "",
    location: "",
    season: "",
    landArea: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const predict = async () => {
    setError("");
    setResult("");
    setLoading(true);

    try {
      const res = await api.post("/crop-prediction", {
        username: localStorage.getItem("username"),
        soilMoisture: form.soilMoisture,
        soilPh: Number(form.soilPh),
        location: form.location,
        season: form.season,
        landArea: Number(form.landArea),
      });

      setResult(res.data);
    } catch {
      setError("Failed to get crop prediction");
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
            Crop Prediction
          </h1>
          <p className="text-gray-600 mt-1">
            Predict the most suitable crops based on soil, season, and land area
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soil Moisture */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil Moisture Level
              </label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                <Beaker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Season
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="season"
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-500 focus:outline-none"
                >
                  <option value="">Select season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Zaid">Zaid</option>
                </select>
              </div>
            </div>

            {/* Land Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Land Area (acres)
              </label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
          </div>

          {/* Action */}
          <div className="mt-8">
            <button
              onClick={predict}
              disabled={loading}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-xl font-semibold transition shadow-md flex items-center gap-2"
            >
              <Sprout />
              {loading ? "Predicting..." : "Predict Crops"}
            </button>

            {error && (
              <p className="text-red-600 text-sm mt-3">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Result */}
{result && (
  <div className="mt-8 bg-gradient-to-br from-green-50 to-lime-50 border border-green-200 rounded-2xl p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
        🌾 AI Crop Recommendations
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
