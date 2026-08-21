import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { ThermometerSun } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function WeatherAlerts() {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");
  const location = "Hyderabad";

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await api.get(`/alerts/${username}`, { params: { location } });
      setAlerts(response.data);
    } catch {
      setError(t("weather.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-4xl p-6">
        <h2 className="mb-6 text-2xl font-semibold">{t("weather.title")}</h2>
        {loading && <p>{t("weather.loading")}</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && alerts.length === 0 && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-blue-700">🌤️ {t("weather.empty")}</p>
          </div>
        )}

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="rounded-xl border-l-4 border-green-500 bg-white p-5 shadow">
              <div className="mb-2 flex items-center gap-3">
                <ThermometerSun className="text-green-600" />
                <h3 className="text-lg font-semibold">{alert.type}</h3>
              </div>
              <p className="text-gray-700">{alert.message}</p>
              {alert.createdAt && (
                <p className="mt-2 text-xs text-gray-500">
                  {new Date(alert.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
