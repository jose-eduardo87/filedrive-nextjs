import { FC } from "react";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/ui";
import { GoogleLogo } from "@/components/Icons";

import styles from "./Login.module.css";

const Login: FC<{ currentLocale: string }> = ({ currentLocale }) => {
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
          onClick={() =>
            signIn("google", {
              callbackUrl: `${window.location.origin}/${currentLocale}/drive`,
            })
          }
        >
          <GoogleLogo width={24} /> {t("btn")}
        </Button>
        <br />
      </div>
    </section>
  );
};

export default Login;
