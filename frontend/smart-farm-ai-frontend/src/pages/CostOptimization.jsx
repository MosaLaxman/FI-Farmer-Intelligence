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
import { useLanguage } from "../hooks/useLanguage";

export default function CostOptimization() {
  const { t } = useLanguage();
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

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const analyzeCost = async () => {
    setError("");
    setResult("");
    setLoading(true);

    try {
      const response = await api.post("/cost-optimization", {
        username: localStorage.getItem("username"),
        crop: form.crop,
        landArea: Number(form.landArea),
        irrigationType: form.irrigationType,
        fertilizerType: form.fertilizerType,
        laborDays: Number(form.laborDays),
      });

      setResult(response.data);
    } catch {
      setError(t("cost.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("cost.title")}</h1>
          <p className="mt-1 text-gray-600">{t("cost.subtitle")}</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field icon={<Leaf className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />} label={t("common.cropType")}>
              <input name="crop" onChange={handleChange} placeholder={t("analyze.cropPlaceholder")} className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none" />
            </Field>
            <Field icon={<Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />} label={t("cost.landArea")}>
              <input type="number" step="0.1" name="landArea" onChange={handleChange} placeholder={t("crop.landAreaPlaceholder")} className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none" />
            </Field>
            <Field icon={<Droplets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />} label={t("cost.irrigationType")}>
              <select name="irrigationType" onChange={handleChange} className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none">
                <option value="">{t("cost.irrigationPlaceholder")}</option>
                <option value="Canal">{t("irrigation.canal")}</option>
                <option value="Drip">{t("irrigation.drip")}</option>
                <option value="Borewell">{t("irrigation.borewell")}</option>
                <option value="Rainfed">{t("irrigation.rainfed")}</option>
              </select>
            </Field>
            <Field icon={<FlaskConical className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />} label={t("cost.fertilizerType")}>
              <select name="fertilizerType" onChange={handleChange} className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none">
                <option value="">{t("cost.fertilizerPlaceholder")}</option>
                <option value="Organic">{t("fertilizer.organic")}</option>
                <option value="Chemical">{t("fertilizer.chemical")}</option>
                <option value="Mixed">{t("fertilizer.mixed")}</option>
              </select>
            </Field>
            <Field icon={<Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />} label={t("cost.laborDays")}>
              <input type="number" name="laborDays" onChange={handleChange} placeholder={t("cost.laborPlaceholder")} className="w-full rounded-xl border py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none" />
            </Field>
          </div>

          <div className="mt-8">
            <button onClick={analyzeCost} disabled={loading} className="flex w-full items-center gap-2 rounded-xl bg-green-600 px-10 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 md:w-auto">
              <IndianRupee />
              {loading ? t("common.analyzing") : t("cost.analyze")}
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </div>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl border border-green-200 bg-gradient-to-br from-emerald-50 to-green-50 p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-green-700">{t("cost.resultTitle")}</h3>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">{t("common.generated")}</span>
            </div>
            <div className="mb-4 h-px bg-green-200" />
            <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{result}</pre>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">{icon}{children}</div>
    </div>
  );
}
