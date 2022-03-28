import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";
import { GoogleLogo } from "@/components/Icons";

import styles from "./Login.module.css";

const Login: FC = () => {
  const { t } = useTranslation("login");
  return (
    <section className={styles.root}>
      <h1>{t("heading")}</h1>
      <div className={styles.loginOptionsBox}>
        <Link passHref href="/">
          <a>
            <Button
              style={{
                width: "100%",
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
            >
              <GoogleLogo width={24} /> {t("btn")}
            </Button>
          </a>
        </Link>
        <br />
        <LoginForm />
      </div>
      <div className={styles.accountOptions}>
        <p>
          {t("forgot-pwd-message-part1")}
          <Link href="/">
            <a>{t("forgot-pwd-link")}</a>
          </Link>{" "}
          {t("forgot-pwd-message-part2")}
        </p>

        <p>
          {t("signup-message")}
          <Link href="/signup">
            <a>{t("signup-link")}</a>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
