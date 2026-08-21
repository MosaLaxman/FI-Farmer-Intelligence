import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Sprout,
  User,
  Lock,
  Droplets,
  Leaf,
  CloudSun,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Login() {
  const navigate = useNavigate();
  const { t, setLanguage } = useLanguage();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const login = async () => {
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("username", response.data.username);
      setLanguage(response.data.preferredLanguage || "en");
      navigate("/dashboard");
    } catch {
      alert(t("login.invalidCredentials"));
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#f7fdf9] lg:grid-cols-2">
      <div className="hidden flex-col justify-center bg-gradient-to-br from-green-600 to-green-700 px-16 text-white lg:flex">
        <div>
          <h1 className="mb-4 text-4xl font-bold">{t("login.heroTitle")}</h1>
          <p className="mb-10 max-w-md text-green-100">{t("login.heroDescription")}</p>
          <div className="space-y-6 text-green-100">
            <div className="flex items-center gap-3"><Droplets /><span>{t("login.heroPoint1")}</span></div>
            <div className="flex items-center gap-3"><Leaf /><span>{t("login.heroPoint2")}</span></div>
            <div className="flex items-center gap-3"><CloudSun /><span>{t("login.heroPoint3")}</span></div>
          </div>
        </div>
      </div>

      <div className="relative flex items-center justify-center overflow-hidden px-6">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/videos/farming-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-8 flex flex-col items-center">
            <div className="rounded-2xl bg-green-600 p-4 text-white shadow">
              <Sprout size={32} />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">{t("login.welcomeBack")}</h1>
            <p className="text-sm text-gray-700">{t("login.subtitle")}</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">{t("common.username")}</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input name="username" onChange={handleChange} className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none" placeholder={t("login.usernamePlaceholder")} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">{t("common.password")}</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="password" name="password" onChange={handleChange} className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 focus:border-green-500 focus:outline-none" placeholder={t("login.passwordPlaceholder")} />
              </div>
            </div>

            <button onClick={login} className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg">
              {t("login.button")}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-700">
            {t("login.noAccount")}{" "}
            <Link to="/register" className="font-semibold text-green-700">
              {t("login.register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
