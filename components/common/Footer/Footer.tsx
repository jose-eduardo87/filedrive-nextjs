import { FC } from "react";
import { Coffee } from "@/components/Icons";

import styles from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <h1>
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
      </h1>
    </footer>
  );
};

export default Footer;
