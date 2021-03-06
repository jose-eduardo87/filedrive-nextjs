import { FC } from "react";
import { useTranslation } from "next-i18next";
import { useTheme } from "store/theme-context";
import { Coffee } from "@/components/Icons";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  const { t } = useTranslation("common");
  const { isDark } = useTheme();

  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: isDark ? "#181818" : "#F9F6EE" }}
    >
      <small>
        {t("footer-small-part1")}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://portfolio-nextjs-theta-pink.vercel.app/"
        >
          José Eduardo
        </a>
        {t("footer-small-part2")}
        <Coffee width={16} />
      </small>
    </footer>
  );
};

export default Footer;
