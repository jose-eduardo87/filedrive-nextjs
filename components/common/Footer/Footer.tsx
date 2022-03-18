import { FC } from "react";
import { useTheme } from "store/theme-context";
import { Coffee } from "@/components/Icons";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  const { isDark } = useTheme();
  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: isDark ? "#212f45" : "" }}
    >
      <small>
        Made solely for educational purposes. No commercial use. Built by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://portfolio-nextjs-theta-pink.vercel.app/"
        >
          José Eduardo
        </a>{" "}
        with NextJS, TypeScript, PostgreSQL, Prisma and LOTS of coffee!{" "}
        <Coffee width={16} />
      </small>
    </footer>
  );
};

export default Footer;
