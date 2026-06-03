import { useTranslation } from "react-i18next";

import { socialImgs } from "../constants";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Kirill Molev — {t("footer.role")}</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg) => (
            <a
              key={socialImg.name}
              href={socialImg.url}
              target="_blank"
              rel="noreferrer"
              aria-label={socialImg.name}
              className="icon"
            >
              <img
                src={socialImg.imgPath}
                alt={socialImg.name}
                className="size-6 md:size-7"
              />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Kirill Molev. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
