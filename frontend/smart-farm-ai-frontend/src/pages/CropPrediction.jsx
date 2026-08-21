import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import {
  ArrowRight,
  Beaker,
  Calendar,
  Droplets,
  FlaskConical,
  Leaf,
  MapPin,
  Ruler,
  Sparkles,
  Sprout,
  Waves,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function CropPrediction() {
  const { t } = useLanguage();
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

  const fieldConfig = [
    { label: t("analyze.soilMoisture"), name: "soilMoisture", icon: Droplets, type: "select", placeholder: t("analyze.moisturePlaceholder"), options: [{ value: "Low", label: t("option.low") }, { value: "Medium", label: t("option.medium") }, { value: "High", label: t("option.high") }], hint: t("crop.moistureHint") },
    { label: t("common.soilPh"), name: "soilPh", icon: Beaker, type: "number", step: "0.1", placeholder: t("analyze.phPlaceholder"), hint: t("crop.phHint") },
    { label: t("common.location"), name: "location", icon: MapPin, type: "text", placeholder: t("analyze.locationPlaceholder"), hint: t("crop.locationHint") },
    { label: t("common.season"), name: "season", icon: Calendar, type: "select", placeholder: t("crop.seasonPlaceholder"), options: [{ value: "Kharif", label: t("season.kharif") }, { value: "Rabi", label: t("season.rabi") }, { value: "Zaid", label: t("season.zaid") }], hint: t("crop.seasonHint") },
    { label: t("crop.landArea"), name: "landArea", icon: Ruler, type: "number", step: "0.1", placeholder: t("crop.landAreaPlaceholder"), hint: t("crop.landAreaHint") },
  ];

  const highlights = [
    { title: t("crop.climateAware"), value: t("crop.climateValue"), icon: Waves },
    { title: t("crop.soilIntelligence"), value: t("crop.soilValue"), icon: FlaskConical },
    { title: t("crop.yieldFocus"), value: t("crop.yieldValue"), icon: Leaf },
  ];

  const completedFields = Object.values(form).filter((value) => String(value).trim()).length;
  const fieldsComplete = completedFields === fieldConfig.length;

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const predict = async () => {
    setError("");
    setResult("");
    setLoading(true);
    try {
      const response = await api.post("/crop-prediction", {
        username: localStorage.getItem("username"),
        soilMoisture: form.soilMoisture,
        soilPh: Number(form.soilPh),
        location: form.location,
        season: form.season,
        landArea: Number(form.landArea),
      });
      setResult(response.data);
    } catch {
      setError(t("crop.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[28rem] max-w-6xl rounded-[3rem] bg-[radial-gradient(circle_at_top,_rgba(91,155,108,0.22),_transparent_58%),radial-gradient(circle_at_80%_20%,_rgba(232,188,80,0.18),_transparent_28%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(49,83,62,0.12)] backdrop-blur-xl sm:p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-amber-200/30 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                  <Sparkles size={16} />
                  {t("crop.badge")}
                </div>
                <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  {t("crop.title")}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  {t("crop.subtitle")}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {highlights.map(({ title, value, icon: Icon }) => (
                  <div key={title} className="rounded-2xl border border-slate-200/70 bg-slate-950/[0.03] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-900 p-2 text-emerald-300">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{title}</p>
                        <p className="text-sm text-slate-600">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_18px_60px_rgba(34,58,46,0.1)] backdrop-blur-xl sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{t("crop.predictionInputs")}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{t("crop.fieldConditions")}</h2>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  {t("crop.completeInputs")}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {fieldConfig.map(({ label, name, icon: Icon, type, placeholder, options, step, hint }) => (
                  <label key={name} className="group block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 transition duration-300 group-focus-within:border-emerald-400 group-focus-within:bg-white group-focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.14)]">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition duration-300 group-focus-within:text-emerald-600">
                        <Icon size={18} />
                      </div>
                      {type === "select" ? (
                        <select name={name} value={form[name]} onChange={handleChange} className="w-full appearance-none bg-transparent py-4 pl-11 pr-4 text-sm text-slate-900 outline-none">
                          <option value="">{placeholder}</option>
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input type={type} step={step} name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="w-full bg-transparent py-4 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400" />
                      )}
                    </div>
                    <span className="mt-2 block text-xs text-slate-500">{hint}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-500">{t("crop.liveProfile")}</div>
                <button onClick={predict} disabled={loading || !fieldsComplete} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300">
                  <Sprout size={18} />
                  {loading ? t("crop.generating") : t("crop.generate")}
                  <ArrowRight size={17} />
                </button>
              </div>
              {error && <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
            </div>

            <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_20px_80px_rgba(15,23,42,0.3)] sm:p-8">
              <div className="flex h-full flex-col">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  <Sparkles size={14} />
                  {t("crop.readiness")}
                </div>
                <h3 className="mt-6 text-2xl font-bold">{t("crop.readinessTitle")}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{t("crop.readinessText")}</p>
                <div className="mt-8 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("crop.inputCoverage")}</p>
                    <p className="mt-2 text-3xl font-bold">{completedFields}<span className="text-base font-medium text-slate-400">/{fieldConfig.length}</span></p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("crop.modelFocus")}</p>
                    <p className="mt-2 text-base font-medium text-white">{t("crop.modelFocusValue")}</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-100">
                    {t("crop.readinessNote")}
                  </div>
                </div>
                <div className="mt-8">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-300 to-amber-300 transition-all duration-500" style={{ width: `${(completedFields / fieldConfig.length) * 100}%` }} />
                  </div>
                </div>
              </div>
            </aside>
          </section>

          {result && (
            <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 shadow-[0_18px_70px_rgba(66,115,76,0.16)]">
              <div className="flex flex-col gap-5 border-b border-emerald-100/80 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">{t("crop.result")}</p>
                  <h3 className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-900">
                    <Sparkles className="text-emerald-600" size={22} />
                    {t("crop.resultTitle")}
                  </h3>
                </div>
                <span className="inline-flex w-fit items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                  {t("crop.resultPill")}
                </span>
              </div>
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="rounded-[1.5rem] border border-white bg-white/90 p-5 shadow-inner shadow-emerald-100/40">
                  <pre className="whitespace-pre-wrap text-sm leading-7 text-slate-700">{result}</pre>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
