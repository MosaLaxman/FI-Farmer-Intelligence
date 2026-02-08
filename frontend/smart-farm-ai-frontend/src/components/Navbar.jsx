import {
  Sprout,
  LogOut,
  Languages,
  LayoutDashboard,
  History,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const changeLanguage = async (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    try {
      await api.put("/user/language", {
        username,
        preferredLanguage: selectedLang,
      });
      localStorage.setItem("language", selectedLang);
    } catch {
      alert("Failed to update language");
    }
  };

  const navItem = (path, label, icon) => {
    const active = location.pathname === path;

    return (
      <Link
        to={path}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
          ${
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
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600 text-white p-2 rounded-xl">
            <Sprout />
          </div>
          <span className="text-xl font-bold text-gray-900">
            Smart Farm AI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-2">
          {navItem(
            "/dashboard",
            "Dashboard",
            <LayoutDashboard size={16} />
          )}
          {navItem(
            "/features",
            "Features",
            <LayoutDashboard size={16} />
          )}
          {navItem(
            "/analyze",
            "New Analysis",
            <Sprout size={16} />
          )}
          {navItem(
            "/history",
            "History",
            <History size={16} />
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Language Selector */}
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Languages size={18} className="text-gray-500" />
            <select
              value={language}
              onChange={changeLanguage}
              className="text-sm bg-transparent focus:outline-none"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="or">Odia</option>
            </select>
          </div>

          {/* Username */}
          <span className="hidden sm:block text-sm text-gray-600">
            {username}
          </span>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
