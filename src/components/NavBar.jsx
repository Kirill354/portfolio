import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { navLinks } from "../constants";
import LanguageSwitcher from "./LanguageSwitcher";

const NavBar = () => {
  const { t } = useTranslation();

  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo">
          Kirill Molev
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, key }) => (
              <li key={key} className="group">
                <a href={link}>
                  <span>{t(`nav.${key}`)}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <LanguageSwitcher />

          <a href="#contact" className="contact-btn group">
            <div className="inner">
              <span>{t("nav.contact")}</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
