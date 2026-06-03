import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

import { projects } from "../constants";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const projectText = t("projects", { returnObjects: true });
  const allProjects = projects.map((p, i) => ({
    ...p,
    ...(Array.isArray(projectText) ? projectText[i] : {}),
  }));

  const [featured, ...rest] = allProjects;
  const sideProjects = rest.slice(0, 2);
  const gridProjects = rest.slice(2);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
    );

    gsap.utils.toArray(".showcase-animate").forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.15 * (index % 3),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        },
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase lg:scroll-mt-5">
      <div className="w-full">
        <div className="showcaselayout">
          {/* Featured project */}
          <div className="first-project-wrapper showcase-animate card-border rounded-xl">
            <div className="image-wrapper bg-[#1c1c21]">
              <img src={featured.imgPath} alt={featured.title} />
            </div>
            <div className="text-content p-3 lg:p-6">
              {featured.tags?.length > 0 && (
                <div className="badges">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-white-50 border border-black-50 bg-black-100 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h2>{featured.title}</h2>
              <p className="text-white-50 md:text-xl">{featured.desc}</p>
              {featured.link && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white-50 hover:text-white transition-colors duration-300"
                >
                  {t("work.view")} &rarr;
                </a>
              )}
            </div>
          </div>

          {/* Two highlighted projects */}
          <div className="project-list-wrapper overflow-hidden">
            {sideProjects.map((project) => (
              <div
                className="project showcase-animate card-border rounded-xl"
                key={project.title}
              >
                <div className="image-wrapper bg-[#1c1c21]">
                  <img src={project.imgPath} alt={project.title} />
                </div>

                <div className="py-6 flex flex-col gap-3 flex-1 p-3 lg:p-6">
                  <h2 className="mt-0">{project.title}</h2>
                  <p className="text-white-50 text-sm flex-1 text-[16px]">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-white-50 border border-black-50 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-white-50 text-[16px] hover:text-white transition-colors duration-300 mt-1"
                    >
                      {t("work.view")} &rarr;
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining projects in a responsive grid */}
        {gridProjects.length > 0 && (
          <div className="mt-16 md:mt-22">
            <h3 className="text-white text-2xl md:text-3xl font-semibold mb-10">
              {t("work.more")}
            </h3>
            <div className="grid-3-cols">
              {gridProjects.map((project) => (
                <div
                  key={project.title}
                  className="showcase-animate card-border rounded-xl overflow-hidden flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-[#1c1c21]">
                    <img
                      src={project.imgPath}
                      alt={project.title}
                      className={clsx(
                        "w-full h-full",
                        project.mobile ? "object-contain" : "object-cover",
                      )}
                    />
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h4 className="text-white text-xl font-semibold">
                      {project.title}
                    </h4>
                    <p className="text-white-50 text-sm flex-1">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-white-50 border border-black-50 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-white-50 text-sm hover:text-white transition-colors duration-300 mt-1"
                      >
                        {t("work.view")} &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppShowcase;
