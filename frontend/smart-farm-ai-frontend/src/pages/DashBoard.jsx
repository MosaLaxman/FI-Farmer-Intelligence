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
  ShieldPlus,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    crop: "Not Set",
    moisture: "Unknown",
    ph: "N/A",
    location: "Not Set",
  });

  useEffect(() => {
    fetchLatestHistory();
  }, []);

  const fetchLatestHistory = async () => {
    try {
      const res = await api.get(`/history/${username}`);
      if (!res.data || res.data.length === 0) return;
      const latest = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )[0];
      const text = latest.aiResult.toLowerCase();
      let moisture = "Unknown";
      if (text.includes("low")) moisture = "Low";
      else if (text.includes("medium")) moisture = "Medium";
      else if (text.includes("high")) moisture = "High";
      let ph = "N/A";
      const phMatch = text.match(/ph\s*[\:\=]?\s*(\d+(\.\d+)?)/);
      if (phMatch) ph = phMatch[1];
      let crop = "Not Set";
      if (text.includes("paddy")) crop = "Paddy";
      else if (text.includes("wheat")) crop = "Wheat";
      setStats({ crop, moisture, ph, location: "Paralakhemundi" });
    } catch {
      console.error("Failed to load stats");
    }
  };

  const features = [
    {
      title: t("feature.analyzeFarm.title"),
      desc: t("feature.analyzeFarm.desc"),
      icon: <Leaf className="text-green-600" />,
      path: "/analyze",
    },
    {
      title: t("feature.cropPrediction.title"),
      desc: t("feature.cropPrediction.desc"),
      icon: <Sprout className="text-blue-600" />,
      path: "/crop-prediction",
    },
    {
      title: t("feature.costOptimization.title"),
      desc: t("feature.costOptimization.desc"),
      icon: <IndianRupee className="text-yellow-600" />,
      path: "/cost-optimization",
    },
    {
      title: t("feature.weatherAlerts.title"),
      desc: t("feature.weatherAlerts.desc"),
      icon: <CloudSun className="text-purple-600" />,
      path: "/weather-alerts",
    },
    {
      title: t("feature.disease.title"),
      desc: t("feature.disease.desc"),
      icon: <ShieldPlus className="text-emerald-600" />,
      path: "/disease",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t("dashboard.welcome", { username })}
          </h1>
          <p className="mt-1 text-gray-600">{t("dashboard.subtitle")}</p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Leaf className="text-green-600" />} label={t("dashboard.temp")} value="33°C" />
          <StatCard icon={<Droplets className="text-blue-600" />} label={t("dashboard.weather")} value="Sunny" />
          <StatCard icon={<Beaker className="text-purple-600" />} label={t("dashboard.season")} value="Rabi" />
          <StatCard icon={<MapPin className="text-orange-600" />} label={t("dashboard.location")} value={stats.location} />
        </div>

        <div className="relative mb-12 overflow-hidden rounded-2xl shadow-lg">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
            <source src="/videos/farm-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-10 text-center text-white">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600">
                <TrendingUp className="text-white" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold">{t("dashboard.ctaTitle")}</h2>
            <p className="mx-auto mb-6 max-w-2xl text-white/90">
              {t("dashboard.ctaDescription")}
            </p>
            <button
              onClick={() => navigate("/analyze")}
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-semibold hover:bg-green-700"
            >
              <TrendingUp size={18} />
              {t("dashboard.ctaButton")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {features.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.path)}
              className="cursor-pointer rounded-2xl border bg-white p-6 shadow-md transition hover:border-green-300 hover:shadow-xl"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border shadow-lg">
            <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
              <source src="/videos/farming-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative p-10">
              <div className="rounded-2xl bg-white/70 p-8">
                <h3 className="mb-4 text-center text-2xl font-bold text-gray-900">
                  🌱 {t("dashboard.aboutTitle")}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-800">
                  {t("dashboard.aboutDescription1")}
                </p>
                <p className="mb-8 leading-relaxed text-gray-800">
                  {t("dashboard.aboutDescription2")}
                </p>
                <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="rounded-xl border border-green-200 bg-green-50/80 p-5 text-sm">
                    💧 <b>{t("dashboard.waterOptimization")}</b>
                    <p className="mt-1 text-gray-700">{t("dashboard.waterOptimizationDesc")}</p>
                  </div>
                  <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-5 text-sm">
                    🌱 <b>{t("dashboard.soilHealth")}</b>
                    <p className="mt-1 text-gray-700">{t("dashboard.soilHealthDesc")}</p>
                  </div>
                  <div className="rounded-xl border border-purple-200 bg-purple-50/80 p-5 text-sm">
                    🌍 <b>{t("dashboard.farmerAi")}</b>
                    <p className="mt-1 text-gray-700">{t("dashboard.farmerAiDesc")}</p>
                  </div>
                </div>
                <div className="text-center text-lg font-semibold text-green-800">
                  {t("dashboard.tagline")} 🌾
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
          {icon}
        </div>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
