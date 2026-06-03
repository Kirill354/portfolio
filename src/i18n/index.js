import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

const STORAGE_KEY = "lang";
const supported = ["en", "ru"];

const saved =
  typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
const initialLng = supported.includes(saved) ? saved : "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: initialLng,
  fallbackLng: "en",
  supportedLngs: supported,
  interpolation: { escapeValue: false },
  // Allow t() to return arrays/objects (used for projects, experience, words).
  returnObjects: true,
});

// Reflect the active language on <html lang> and persist user choice.
if (typeof document !== "undefined") {
  document.documentElement.lang = i18n.language;
}

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
