import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { ThermometerSun } from "lucide-react";

export default function WeatherAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  // 🔹 keep it simple: fixed location for now
  const location = "Hyderabad";

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get(`/alerts/${username}`, {
        params: { location }
      });
      setAlerts(res.data);
    } catch (err) {
      setError("Failed to load weather alerts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">
          Weather Alerts
        </h2>

        {loading && <p>Loading alerts...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && alerts.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
            <p className="text-blue-700">
              🌤️ No alerts currently. Weather conditions are stable.
            </p>
          </div>
        )}

        {/* ALERT LIST */}
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-green-500 shadow rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <ThermometerSun className="text-green-600" />
                <h3 className="text-lg font-semibold">
                  {alert.type}
                </h3>
              </div>

              <p className="text-gray-700">
                {alert.message}
              </p>

              {alert.createdAt && (
                <p className="text-xs text-gray-500 mt-2">
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
