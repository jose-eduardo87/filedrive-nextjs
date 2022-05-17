import { FC, FormEvent, useRef } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { PopupMessage, Button } from "@/components/ui/";
import { Error, Important } from "@/components/Icons";
import useInput from "hooks/use-input";
import useHttp from "hooks/use-http";
import { useInterface } from "store/interface-context";
import { nameValidator } from "helpers/functions";

import styles from "./BasicSettings.module.css";

const BasicSettings: FC = () => {
  const inputFile = useRef<HTMLInputElement>(null);
  const { t } = useTranslation("basicsettings");
  const { error, showError, isLoading, sendRequest } = useHttp();
  const { userName, setUserName } = useInterface();
  const {
    value: nameValue,
    onBlur: onNameBlur,
    reset: resetName,
    onChange: onNameChange,
    isValid: isNameValid,
    hasError: nameHasError,
  } = useInput(nameValidator, userName);

  const onClickUploadPhoto = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };
  const onChangeInput = () => {
    // https://www.youtube.com/watch?v=7lhUsK-FxYI&ab_channel=ColbyFayock
    if (inputFile.current !== null && inputFile.current.files !== null) {
      const formData = new FormData();
      formData.append("file", inputFile.current.files[0]);

      console.log(formData.get("file"));
    }
  };

  const errorMessage = t("error-message");
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await sendRequest({
      url: "/api/users/update-account",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: {
        name: nameValue,
      },
    });

    if (response) {
      setUserName(nameValue);
      resetName();
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>{t("heading")}</h2>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        {isLoading && (
          <PopupMessage
            type="loading"
            message="Updating information..."
            SVG={<Important fill="#D11A2A" />}
          />
        )}
        {showError && (
          <PopupMessage
            type="error"
            message={error!}
            SVG={<Error fill="#7C4343" />}
          />
        )}
        <div className={styles.formContainer}>
          <Input
            type="text"
            placeholder={userName}
            value={nameValue}
            onBlur={onNameBlur}
            onChange={onNameChange}
            required
          />
          <p
            className={styles.errorMessage}
            style={{
              visibility: setVisibility(nameHasError),
              color: "red",
            }}
          >
            {errorMessage}
          </p>

          <Button
            style={{
              width: "100%",
              backgroundColor: isNameValid ? "#FF7F50" : "#FFAf7A",
            }}
            isDisabled={!isNameValid}
          >
            {t("btn-form")}
          </Button>
        </div>
      </form>
      <input
        type="file"
        accept="image/*"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onChangeInput}
      />
      <Button
        style={{ width: "80%", backgroundColor: "#23395D" }}
        onClick={onClickUploadPhoto}
      >
        {t("btn-change-image")}
      </Button>
    </div>
  );
};

export default BasicSettings;
