import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { heroWordIcons } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";
import clsx from "clsx";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
    );
  });

  const lang = i18n.language?.startsWith("ru") ? "ru" : "en";

  // Build the slider words from the locale (4 items) and duplicate them to 8
  // so the CSS word-slider animation loops seamlessly.
  const wordTexts = t("hero.words", { returnObjects: true });
  const safeWords = (Array.isArray(wordTexts) ? wordTexts : []).filter(
    (word, index) => (isMobile ? index !== 3 : index !== 4),
  );
  const words = [...safeWords, ...safeWords].map((text, index) => ({
    text,
    imgPath: heroWordIcons[index % heroWordIcons.length],
  }));

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header
          className={clsx(
            "flex flex-col justify-center md:w-full w-screen md:px-20 px-5",
            isMobile && "z-1000",
          )}
        >
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                {t("hero.building")}
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>{t("hero.line2")}</h1>
              <h1>{t("hero.line3")}</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none max-w-[580px] lg:max-w-[740px] min-[1440px]:max-w-[800px]!">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                text={t("hero.seeWork")}
                className="md:w-80 md:h-16 w-60 h-12"
                id="counter"
              />

              <a
                href={`/info/resume.${lang}.pdf`}
                download={`Kirill-Molev-CV-${lang.toUpperCase()}.pdf`}
                aria-label={t("hero.downloadCv")}
                className="relative z-20 flex items-center justify-center gap-3 w-60 h-12 md:w-72 md:h-16 rounded-lg border border-black-50 bg-black-100 text-white-50 font-semibold uppercase md:text-lg cursor-pointer transition-all duration-300 hover:bg-black-50 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t("hero.downloadCv")}
              </a>
            </div>
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout hover:cursor-grab">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
