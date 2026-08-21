import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";
import { useLanguage } from "../hooks/useLanguage";

const RESULT_META = [
  {
    key: "disease",
    label: "Disease",
    icon: "🌿",
    accent: "from-emerald-500/20 via-green-500/10 to-transparent",
  },
  {
    key: "cause",
    label: "Cause",
    icon: "⚠️",
    accent: "from-amber-500/20 via-orange-400/10 to-transparent",
  },
  {
    key: "treatment",
    label: "Treatment",
    icon: "💊",
    accent: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    key: "prevention",
    label: "Prevention",
    icon: "🛡️",
    accent: "from-teal-500/20 via-emerald-400/10 to-transparent",
  },
];

const EMPTY_RESULT = {
  disease: "",
  cause: "",
  treatment: "",
  prevention: "",
};

function parseDiseaseResponse(responseText) {
  const parsed = { ...EMPTY_RESULT };

  responseText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return;
      }

      const rawKey = line.slice(0, separatorIndex).trim().toLowerCase();
      const value = line.slice(separatorIndex + 1).trim();

      if (rawKey in parsed) {
        parsed[rawKey] = value;
      }
    });

  return parsed;
}

function isHealthyDisease(disease) {
  const normalizedDisease = disease.trim().toLowerCase();
  return (
    normalizedDisease === "healthy" ||
    normalizedDisease === "healthy crop" ||
    normalizedDisease.includes("no disease")
  );
}

export default function DiseaseDetection() {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(EMPTY_RESULT);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const hasImage = Boolean(image);
  const hasResult = Boolean(
    result.disease || result.cause || result.treatment || result.prevention,
  );
  const healthyResult = hasResult && isHealthyDisease(result.disease);

  const visibleCards = useMemo(() => {
    return RESULT_META.filter(({ key }) => result[key]).map((item) => ({
      ...item,
      label: t(`disease.${item.key}`),
    }));
  }, [result, t]);

  const updateImage = (file) => {
    if (!file) {
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
    setResult(EMPTY_RESULT);
  };

  const handleFileSelect = (event) => {
    const [file] = event.target.files || [];
    updateImage(file);
  };

  const handleAnalyze = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError("");
    setResult(EMPTY_RESULT);

    try {
      const response = await api.post("/disease/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const parsedResult = parseDiseaseResponse(String(response.data || ""));
      setResult(parsedResult);

      if (!Object.values(parsedResult).some(Boolean)) {
        setError(t("disease.parseFailed"));
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          t("disease.failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReplaceImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(110,231,183,0.28),_transparent_35%),linear-gradient(180deg,_#f7fcf8_0%,_#eef8f1_50%,_#f7fbf7_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_-32px_rgba(22,101,52,0.35)] backdrop-blur xl:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <span>{t("disease.badge")}</span>
                </span>

                <div className="space-y-4">
                  <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    {t("disease.title")}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                    {t("disease.subtitle")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3">
                    {t("disease.feature1")}
                  </div>
                  <div className="rounded-2xl border border-white bg-slate-50 px-4 py-3">
                    {t("disease.feature2")}
                  </div>
                  <div className="rounded-2xl border border-white bg-slate-50 px-4 py-3">
                    {t("disease.feature3")}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-500 via-green-600 to-lime-500 p-1 shadow-[0_24px_60px_-28px_rgba(22,163,74,0.55)]">
                <div className="rounded-[1.7rem] bg-slate-950/90 p-6 text-white">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-200">
                        {t("disease.pipelineLabel")}
                      </p>
                      <h2 className="text-xl font-semibold">
                        {t("disease.pipelineTitle")}
                      </h2>
                    </div>
                    <div className="h-12 w-12 rounded-2xl bg-white/10" />
                  </div>

                  <div className="space-y-4">
                    {[
                      t("disease.pipelineStep1"),
                      t("disease.pipelineStep2"),
                      t("disease.pipelineStep3"),
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur sm:p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    {t("disease.uploadLabel")}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                    {t("disease.uploadTitle")}
                  </h2>
                </div>

                {hasImage && (
                  <button
                    type="button"
                    onClick={handleReplaceImage}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                  >
                    {t("disease.replaceImage")}
                  </button>
                )}
              </div>

              <UploadBox
                fileInputRef={fileInputRef}
                fileName={image?.name || ""}
                onChange={handleFileSelect}
                onFileSelect={updateImage}
                preview={preview}
              />

              {error && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!hasImage || loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-500 px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_-18px_rgba(22,163,74,0.7)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-18px_rgba(22,163,74,0.8)] disabled:cursor-not-allowed disabled:from-slate-300 disabled:via-slate-300 disabled:to-slate-400 disabled:text-slate-500 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {t("common.analyzing")}
                  </>
                ) : (
                  t("disease.analyze")
                )}
              </button>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.25)] backdrop-blur sm:p-6">
              <div className="mb-5">
                <p className="text-sm font-medium text-emerald-700">
                  {t("disease.resultsLabel")}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  {t("disease.resultsTitle")}
                </h2>
              </div>

              {!hasResult && !loading && !error && (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-6 py-10 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white shadow-[0_20px_40px_-28px_rgba(16,185,129,0.7)]">
                    <span className="text-3xl">🌱</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("disease.emptyTitle")}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    {t("disease.emptyText")}
                  </p>
                </div>
              )}

              {loading && (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[1.75rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-6 py-10 text-center">
                  <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                    <span className="absolute h-20 w-20 animate-ping rounded-full bg-emerald-200/70" />
                    <span className="absolute h-16 w-16 animate-spin rounded-full border-[3px] border-emerald-200 border-t-emerald-600" />
                    <span className="relative text-3xl">🌿</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {t("disease.loadingTitle")}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                    {t("disease.loadingText")}
                  </p>
                </div>
              )}

              {healthyResult && !loading && (
                <div className="mb-5 overflow-hidden rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-500 via-green-500 to-lime-400 p-[1px] shadow-[0_24px_50px_-30px_rgba(22,163,74,0.65)]">
                  <div className="rounded-[1.65rem] bg-white px-6 py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-3xl">
                        🌱
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                          {t("disease.healthyLabel")}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                          {t("disease.healthyTitle")}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {t("disease.healthyText")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {hasResult && !loading && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {visibleCards.map((item) => (
                    <ResultCard
                      key={item.key}
                      accent={item.accent}
                      icon={item.icon}
                      title={item.label}
                      value={result[item.key]}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
