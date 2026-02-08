import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Analyze from "./pages/Analyze";
import CropPrediction from "./pages/CropPrediction";
import CostOptimization from "./pages/CostOptimization";
import WeatherAlerts from "./pages/WeatherAlerts";
import HistoryPage from "./pages/HistoryPage";
import Dashboard from "./pages/DashBoard";
import FeaturePage from "./pages/FeaturePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyze"
          element={
            <ProtectedRoute>
              <Analyze />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cost-optimization"
          element={
            <ProtectedRoute>
              <CostOptimization />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather-alerts"
          element={
            <ProtectedRoute>
              <WeatherAlerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-prediction"
          element={
            <ProtectedRoute>
              <CropPrediction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/features"
          element={
            <ProtectedRoute>
              <FeaturePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
