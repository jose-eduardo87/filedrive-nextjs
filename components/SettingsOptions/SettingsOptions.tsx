import { FC, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Dropdown, Selector, PopupMessage } from "@/components/ui";
import { Options } from "@/components/ui/Dropdown/Dropdown";
import { Error, Important } from "@/components/Icons";
import { useTheme } from "store/theme-context";
import useHttp from "hooks/use-http";
import { SELECTOR_STYLES } from "helpers/constants";

import styles from "./SettingsOptions.module.css";

const SettingsOptions: FC = () => {
  const router = useRouter();
  const { locale, pathname } = router;
  const isEnglish = locale === "en";
  const [selectedOption, setSelectedOption] = useState<Options>({
    value: isEnglish ? "en" : "pt-BR",
    label: isEnglish ? "English" : "Português",
    disabled: false,
  });
  const { t } = useTranslation("settingsoptions");
  const { isDark, toggleTheme } = useTheme();
  const {
    error: errorTheme,
    isLoading: isLoadingTheme,
    sendRequest,
    showError: showErrorTheme,
  } = useHttp();
  const {
    error: errorLanguage,
    isLoading: isLoadingLanguage,
    showError: showErrorLanguage,
  } = useHttp();

  const toggleThemeHandler = async () => {
    const response = await sendRequest({
      url: "/api/users/preferences/theme",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: { isDark: !isDark },
    });

    if (response) {
      toggleTheme(!isDark);
    }
  };

  const toggleLanguageHandler = useCallback(async () => {
    const toggledLanguage = {
      value: isEnglish ? "pt-BR" : "en",
      label: isEnglish ? "Portuguese" : "Português",
      disabled: false,
    };

    const response = await sendRequest({
      url: "/api/users/preferences/language",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: { language: toggledLanguage.value },
    });

    if (response) {
      router.replace(pathname, pathname, {
        locale: toggledLanguage.value,
      });

      setSelectedOption(toggledLanguage);
    }
  }, [isEnglish, pathname, router, sendRequest]);

  return (
    <div className={styles.root}>
      {(isLoadingTheme || isLoadingLanguage) && (
        <PopupMessage
          type="loading"
          message="Saving preference..."
          SVG={<Important fill="#D11A2A" />}
        />
      )}
      {(showErrorTheme || showErrorLanguage) && (
        <PopupMessage
          type="error"
          message={errorTheme! || errorLanguage!}
          SVG={<Error fill="#7C4343" />}
        />
      )}
      <h2>{t("heading")}</h2>

      <div className={styles.selectionGroup}>
        <p>{t("theme-selector")}</p>
        <Selector onChange={toggleThemeHandler} {...SELECTOR_STYLES} />
      </div>
      <div className={styles.selectionGroup}>
        {t("language-selector")}
        <Dropdown
          defaultValue={selectedOption}
          onChange={toggleLanguageHandler}
        />
      </div>
      <div>
        <Link passHref href="/drive/upgrade">
          <p className={`${styles.link} ${styles.upgradeLink}`}>
            {t("upgrade-link")}
          </p>
        </Link>
        <Link passHref href="/drive/upgrade">
          <p className={`${styles.link} ${styles.removeLink}`}>
            {t("delete-account")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SettingsOptions;
