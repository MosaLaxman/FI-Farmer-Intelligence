import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { Droplets, Leaf, MapPin, Beaker, PlayCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Analyze() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    crop: "",
    soilMoisture: "",
    soilPh: "",
    location: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const analyze = async () => {
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/analyze", {
        username: localStorage.getItem("username"),
        crop: form.crop,
        soilMoisture: form.soilMoisture,
        soilPh: Number(form.soilPh),
        location: form.location,
      });

      setResult(response.data);
    } catch {
      setError(t("analyze.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("analyze.title")}</h1>
          <p className="mt-1 text-gray-600">{t("analyze.subtitle")}</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("common.cropType")}
              </label>
              <div className="relative">
                <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="crop"
                  onChange={handleChange}
                  placeholder={t("analyze.cropPlaceholder")}
                  className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("analyze.soilMoisture")}
              </label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  name="soilMoisture"
                  onChange={handleChange}
                  className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none"
                >
                  <option value="">{t("analyze.moisturePlaceholder")}</option>
                  <option value="Low">{t("option.low")}</option>
                  <option value="Medium">{t("option.medium")}</option>
                  <option value="High">{t("option.high")}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("common.soilPh")}
              </label>
              <div className="relative">
                <Beaker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="number"
                  step="0.1"
                  name="soilPh"
                  onChange={handleChange}
                  placeholder={t("analyze.phPlaceholder")}
                  className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                {t("common.location")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="location"
                  onChange={handleChange}
                  placeholder={t("analyze.locationPlaceholder")}
                  className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={analyze}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 px-10 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto"
            >
              {loading ? t("common.analyzing") : t("analyze.run")}
            </button>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
            <h3 className="mb-5 text-xl font-semibold text-green-700">
              {t("analyze.results")}
            </h3>

            <div className="grid gap-4">
              <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("analyze.waterRecommendation")}</p>
                <p className="text-gray-800">
                  <b>{t("analyze.waterLabel")}:</b> {result.water}
                </p>
              </div>
              <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("analyze.fertilizerRecommendation")}</p>
                <p className="text-gray-800">
                  <b>{t("analyze.fertilizerLabel")}:</b> {result.fertilizer}
                </p>
              </div>
              <div className="rounded-xl border border-green-100 bg-white p-4 shadow-sm">
                <p className="mb-1 text-sm text-gray-500">{t("analyze.laborRecommendation")}</p>
                <p className="text-gray-800">
                  <b>{t("analyze.laborLabel")}:</b> {result.labor}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">
            <div className="flex items-center gap-2 border-b px-6 py-4">
              <PlayCircle className="text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t("analyze.videoTitle")}
              </h3>
            </div>

            <div className="relative">
              <video className="h-[320px] w-full object-cover" controls muted>
                <source src="/videos/analysis-explainer.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="px-6 py-4 text-sm text-gray-600">
              {t("analyze.videoCaption")}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
