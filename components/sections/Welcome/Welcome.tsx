import { useTranslation } from "next-i18next";
import { FileSharingIllustration } from "@/components/Icons";
import { Button } from "@/components/ui";
import { CSSProperties } from "react";
import { useTheme } from "store/theme-context";

import styles from "./Welcome.module.css";

const buttonStyle = (isDark: boolean): CSSProperties => {
  return isDark
    ? { backgroundColor: "#FFFFFF", color: "#000000" }
    : { backgroundColor: "#000000", color: "#FFFFFF" };
};

export default function Welcome() {
  const { t } = useTranslation("welcome");
  const { isDark } = useTheme();

  return (
    <section className={styles.root}>
      <div className={styles.infoContainer}>
        <div className={styles.rowItems}>
          <div className={styles.leftPanel}>
            <h2>{t("heading")}</h2>
            <p>{t("main-text")}</p>
            <div className={styles.buttonsGroup}>
              <Button
                title={t("btn-create-account")}
                style={buttonStyle(isDark)}
              >
                {t("btn-create-account")}
              </Button>
              <Button
                title={t("btn-send-files-title")}
                style={buttonStyle(isDark)}
              >
                {t("btn-send-files")}
              </Button>
            </div>
          </div>
          <div className={styles.rightPanel}>
            <FileSharingIllustration width="100%" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
}
