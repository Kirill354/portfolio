import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

// How long the user has to wait between submissions.
const COOLDOWN_HOURS = 1;
const COOKIE_NAME = "contact_form_sent";

// --- tiny cookie helpers ---
const getCookie = (name) => {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
};

const setCookie = (name, value, hours) => {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Map internal status -> locale key.
const STATUS_KEY = {
  success: "contact.status.success",
  rate_limited: "contact.status.rateLimited",
  invalid: "contact.status.invalid",
  error: "contact.status.error",
};

const STATUS_COLOR = {
  success: "text-green-400",
  rate_limited: "text-amber-400",
  invalid: "text-red-400",
  error: "text-red-400",
};

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [botField, setBotField] = useState("");

  useEffect(() => {
    if (getCookie(COOKIE_NAME)) {
      setCooldown(true);
      setStatus("rate_limited");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (botField.trim() !== "") {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      return;
    }

    if (getCookie(COOKIE_NAME)) {
      setCooldown(true);
      setStatus("rate_limited");
      return;
    }

    if (
      form.name.trim().length < 2 ||
      !isValidEmail(form.email) ||
      form.message.trim().length < 10
    ) {
      setStatus("invalid");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

      setForm({ name: "", email: "", message: "" });
      setCookie(COOKIE_NAME, String(Date.now()), COOLDOWN_HOURS);
      setCooldown(true);
      setStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding mb-100">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title={t("contact.title")} sub={t("contact.sub")} />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">{t("contact.name")}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t("contact.namePlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">{t("contact.email")}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t("contact.emailPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">{t("contact.message")}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact.messagePlaceholder")}
                    rows="5"
                    required
                  />
                </div>

                {/* Honeypot anti-spam field — hidden from real users. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    top: "auto",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="company">Company (leave this empty)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    tabIndex="-1"
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </div>

                {status && STATUS_KEY[status] && (
                  <p className={`${STATUS_COLOR[status]} text-sm`}>
                    {t(STATUS_KEY[status])}
                  </p>
                )}

                <button type="submit" disabled={loading || cooldown}>
                  <div
                    className={`cta-button group ${
                      loading || cooldown
                        ? "opacity-60 pointer-events-none"
                        : ""
                    }`}
                  >
                    <div className="bg-circle" />
                    <p className="text">
                      {loading
                        ? t("contact.sending")
                        : cooldown
                          ? t("contact.sent")
                          : t("contact.send")}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-black-50">
                <p className="text-white-50 text-center">
                  {t("contact.telegramPrompt")}
                </p>
                <a
                  href="https://t.me/k_moler"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full flex items-center justify-center gap-3 py-4 rounded-md bg-[#229ED9] text-white font-semibold transition-all duration-300 hover:opacity-90"
                >
                  <img
                    src="/images/telegram.svg"
                    alt="Telegram"
                    className="size-6"
                  />
                  @k_moler
                </a>
                <a
                  className="mt-2 block py-4 text-white font-semibold transition-all duration-300 hover:opacity-90"
                  href="tel:+79258210034"
                >
                  <span className="font-medium">{t("contact.phone")}:</span> +7
                  (925) 821 00 34
                </a>
              </div>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
