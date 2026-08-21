import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Sprout,
  IndianRupee,
  CloudSun,
  ShieldPlus,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function FeaturePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      title: t("feature.analyzeFarm.title"),
      desc: t("feature.analyzeFarm.desc"),
      icon: <Leaf className="text-green-600" size={28} />,
      path: "/analyze",
      video: "/videos/animate.mp4",
    },
    {
      title: t("feature.cropPrediction.title"),
      desc: t("feature.cropPrediction.desc"),
      icon: <Sprout className="text-blue-600" size={28} />,
      path: "/crop-prediction",
      video: "/videos/animate.mp4",
    },
    {
      title: t("feature.costOptimization.title"),
      desc: t("feature.costOptimization.desc"),
      icon: <IndianRupee className="text-yellow-600" size={28} />,
      path: "/cost-optimization",
      video: "/videos/animate.mp4",
    },
    {
      title: t("feature.weatherAlerts.title"),
      desc: t("feature.weatherAlerts.desc"),
      icon: <CloudSun className="text-purple-600" size={28} />,
      path: "/weather-alerts",
      video: "/videos/animate.mp4",
    },
    {
      title: t("feature.disease.title"),
      desc: t("feature.disease.desc"),
      icon: <ShieldPlus className="text-emerald-600" size={28} />,
      path: "/disease",
      video: "/videos/animate.mp4",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t("features.title")}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-gray-600">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={feature.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-white/80 transition group-hover:bg-white/70" />
              <div className="relative z-10 flex h-full flex-col p-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="flex-grow text-sm text-gray-700">{feature.desc}</p>
                <div className="mt-6 text-sm font-medium text-green-600">
                  {t("common.explore")}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border bg-gray-50 p-10">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            {t("features.whyTitle")}
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-gray-600">
            {t("features.whyDescription")}
          </p>

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">💧 {t("features.optimized")}</p>
              <p className="mt-2 text-sm text-gray-700">{t("features.optimizedDesc")}</p>
            </div>
            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">💰 {t("features.costSaving")}</p>
              <p className="mt-2 text-sm text-gray-700">{t("features.costSavingDesc")}</p>
            </div>
            <div className="transition hover:-translate-y-1">
              <p className="text-3xl font-bold text-green-700">🌾 {t("features.sustainable")}</p>
              <p className="mt-2 text-sm text-gray-700">{t("features.sustainableDesc")}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">{t("features.ctaTitle")}</h2>
          <p className="mx-auto mb-6 max-w-xl text-gray-600">
            {t("features.ctaDescription")}
          </p>
          <button
            onClick={() => navigate("/analyze")}
            className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-700"
          >
            {t("features.ctaButton")}
          </button>
        </div>
      </main>
    </>
  );
}
