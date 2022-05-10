import { FC } from "react";
import { useTranslation } from "next-i18next";
import { Coffee } from "@/components/Icons";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  const { t } = useTranslation("common");

  return (
    <footer className={styles.footer}>
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
