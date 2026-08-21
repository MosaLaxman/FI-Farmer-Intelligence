import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultLanguage, translations } from "../utils/translations";

const LanguageContext = createContext(null);

function getStoredLanguage() {
  return localStorage.getItem("language") || defaultLanguage;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLanguage);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "language" && event.newValue) {
        setLanguageState(event.newValue);
      }
    };

    const handleLanguageChange = (event) => {
      if (event.detail?.language) {
        setLanguageState(event.detail.language);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  const setLanguage = (nextLanguage) => {
    localStorage.setItem("language", nextLanguage);
    setLanguageState(nextLanguage);
    window.dispatchEvent(
      new CustomEvent("languagechange", {
        detail: { language: nextLanguage },
      }),
    );
  };

  const t = useMemo(() => {
    return (key, replacements = {}) => {
      const activeTranslations =
        translations[language] || translations[defaultLanguage];

      let value =
        activeTranslations[key] ??
        translations[defaultLanguage][key] ??
        key;

      Object.entries(replacements).forEach(([replacementKey, replacementValue]) => {
        value = value.replace(
          new RegExp(`\\{${replacementKey}\\}`, "g"),
          String(replacementValue),
        );
      });

      return value;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, t],
  );

  return createElement(LanguageContext.Provider, { value }, children);
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
