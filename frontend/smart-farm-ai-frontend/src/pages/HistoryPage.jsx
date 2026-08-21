import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { CalendarClock, Sparkles } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function HistoryPage() {
  const { t } = useLanguage();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get(`/history/${username}`);
      const sorted = [...response.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setHistory(sorted);
    } catch {
      setError(t("history.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("history.title")}</h1>
          <p className="mt-1 text-gray-600">{t("history.subtitle")}</p>
        </div>

        {loading && <p className="text-gray-600">{t("history.loading")}</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && history.length === 0 && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-blue-700">
            📭 {t("history.empty")}
          </div>
        )}

        <div className="space-y-6">
          {history.map((item, index) => {
            const failed = item.aiResult && item.aiResult.toLowerCase().includes("failed");
            return (
              <div
                key={index}
                className={`rounded-2xl border bg-white p-6 shadow-md ${
                  failed ? "border-red-200 bg-red-50" : "border-gray-200"
                }`}
              >
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarClock size={16} />
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : t("history.dateUnavailable")}
                </div>

                <div
                  className={`rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                    failed
                      ? "bg-red-100 text-red-700"
                      : "border border-green-200 bg-green-50 text-gray-800"
                  }`}
                >
                  <div className="mb-2 flex items-center gap-2 font-semibold">
                    <Sparkles size={16} />
                    {t("history.recommendation")}
                  </div>
                  {item.aiResult}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
