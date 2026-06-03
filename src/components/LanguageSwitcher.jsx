import { useTranslation } from "react-i18next";

const langs = ["en", "ru"];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith("ru") ? "ru" : "en";

  return (
    <div className="flex items-center rounded-lg border border-black-50 bg-black-100 p-1">
      {langs.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={`px-2.5 py-1 text-sm rounded-md uppercase transition-colors duration-300 cursor-pointer ${
            current === lng
              ? "bg-white text-black"
              : "text-white-50 hover:text-white"
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
