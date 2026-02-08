import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { CalendarClock, Sparkles } from "lucide-react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get(`/history/${username}`);

      // newest first
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setHistory(sorted);
    } catch {
      setError("Failed to load analysis history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analysis History
          </h1>
          <p className="text-gray-600 mt-1">
            Review your past AI-powered farm recommendations
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-600">Loading history...</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-blue-700">
            📭 No analysis history yet. Start by analyzing your farm data.
          </div>
        )}

        {/* History Cards */}
        <div className="space-y-6">
          {history.map((item, index) => {
            const failed =
              item.aiResult &&
              item.aiResult.toLowerCase().includes("failed");

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-md p-6 border ${
                  failed
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <CalendarClock size={16} />
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Date not available"}
                </div>

                {/* Result */}
                <div
                  className={`rounded-xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${
                    failed
                      ? "text-red-700 bg-red-100"
                      : "text-gray-800 bg-green-50 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-semibold">
                    <Sparkles size={16} />
                    AI Recommendation
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
