import { FC } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react"
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";
import { GoogleLogo } from "@/components/Icons";

import styles from "./Login.module.css";

const Login: FC<{ currentLocale: string }> = ({ currentLocale }) => {
  const { data: session, status } = useSession();
  const { t } = useTranslation("login");

  return (
    <section className={styles.root}>
      <h1>{t("heading")}</h1>
      <div className={styles.loginOptionsBox}>
            <Button
              style={{
                width: "100%",
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
              onClick={() => signIn('google', { callbackUrl: `${window.location.origin}/${currentLocale}/drive`})}
            >
              <GoogleLogo width={24} /> {t("btn")}
            </Button>
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
