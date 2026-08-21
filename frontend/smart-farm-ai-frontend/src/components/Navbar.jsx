import {
  Sprout,
  LogOut,
  Languages,
  LayoutDashboard,
  History,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useLanguage } from "../hooks/useLanguage";
import { languageOptions } from "../utils/translations";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { language, setLanguage, t } = useLanguage();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const changeLanguage = async (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    try {
      await api.put("/user/language", {
        username,
        preferredLanguage: selectedLanguage,
      });
    } catch {
      alert(t("nav.updateLanguageFailed"));
    }
  };

  const navItem = (path, label, icon) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
          active
            ? "bg-green-600 text-white shadow"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-600 p-2 text-white">
            <Sprout />
          </div>
          <span className="text-xl font-bold text-gray-900">{t("app.name")}</span>
        </div>

        <nav className="flex gap-2">
          {navItem("/dashboard", t("nav.dashboard"), <LayoutDashboard size={16} />)}
          {navItem("/features", t("nav.features"), <LayoutDashboard size={16} />)}
          {navItem("/analyze", t("nav.newAnalysis"), <Sprout size={16} />)}
          {navItem("/disease", t("nav.diseaseDetection"), <Sprout size={16} />)}
          {navItem("/history", t("nav.history"), <History size={16} />)}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Languages size={18} className="text-gray-500" />
            <select
              value={language}
              onChange={changeLanguage}
              className="bg-transparent text-sm focus:outline-none"
              aria-label={t("nav.language")}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <span className="hidden text-sm text-gray-600 sm:block">{username}</span>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <LogOut size={16} />
            {t("nav.logout")}
          </button>
        </div>
      </div>
    </header>
  );
}
