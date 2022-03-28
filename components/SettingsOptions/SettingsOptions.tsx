import { FC, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Selector } from "@/components/ui";
import { useTheme } from "store/theme-context";

import styles from "./SettingsOptions.module.css";

const selectorStyles = {
  height: 30,
  width: 66,
  handleDiameter: 20,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  onHandleColor: "#2693E6",
  onColor: "#E7FFFF",
  offColor: "#FDE4E8",
};

const iconsStyles = {
  fontSize: ".8rem",
  fontWeight: 600,
};

const SettingsOptions: FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const { t } = useTranslation("settingsoptions");
  const { isDark, toggleTheme } = useTheme();
  const isEnglish = locale === "en";

  const toggleThemeHandler = useCallback(() => toggleTheme(), [toggleTheme]);
  const toggleLanguageHandler = useCallback(() => {
    router.push({ pathname, query }, asPath, {
      locale: isEnglish ? "pt-BR" : "en",
    });
  }, [asPath, isEnglish, pathname, query, router]);

  return (
    <div className={styles.root}>
      <h2>{t("heading")}</h2>

      <div className={styles.selectionGroup}>
        <p>{t("theme-selector")}</p>
        <Selector
          isChecked={!isDark}
          icons={{
            checked: <p style={{ ...iconsStyles }}>{t("theme-light")}</p>,
            unchecked: <p style={{ ...iconsStyles }}>{t("theme-dark")}</p>,
          }}
          onChange={toggleThemeHandler}
          {...selectorStyles}
        />
      </div>
      <div className={styles.selectionGroup}>
        {t("language-selector")}
        <Selector
          isChecked={isEnglish}
          icons={{
            checked: <p style={{ ...iconsStyles }}>{t("language-en")}</p>,
            unchecked: <p style={{ ...iconsStyles }}>{t("language-ptbr")}</p>,
          }}
          onChange={toggleLanguageHandler}
          {...selectorStyles}
        />
      </div>

      <Link passHref href="/drive/upgrade">
        <p className={styles.upgradeLink}>{t("upgrade-link")}</p>
      </Link>
    </div>
  );
};

export default SettingsOptions;
