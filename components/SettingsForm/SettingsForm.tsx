import { FC, FormEvent } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { PopupMessage, Button } from "@/components/ui/";
import { Error, Important } from "@/components/Icons";
import useInput from "hooks/use-input";
import useHttp from "hooks/use-http";
import { useInterface } from "store/interface-context";
import { nameValidator, passwordValidator } from "helpers/functions";

import styles from "./SettingsForm.module.css";

const SettingsForm: FC<{
  isAccountFromGoogle: boolean;
}> = ({ isAccountFromGoogle }) => {
  const { t } = useTranslation("settingsform");
  const { error, showError, isLoading, sendRequest } = useHttp();
  const { userName, setUserName } = useInterface();

  const {
    value: nameValue,
    onBlur: onNameBlur,
    onChange: onNameChange,
    isValid: isNameValid,
    hasError: nameHasError,
  } = useInput(nameValidator, userName);
  const {
    value: currentPasswordValue,
    onBlur: onCurrentPasswordBlur,
    onChange: onCurrentPasswordChange,
    reset: resetCurrentPassword,
    isValid: isCurrentPasswordValid,
    hasError: currentPasswordHasError,
  } = useInput(passwordValidator);
  const {
    value: passwordValue,
    onBlur: onPasswordBlur,
    onChange: onPasswordChange,
    reset: resetPassword,
    isValid: isPasswordValid,
    hasError: passwordHasError,
  } = useInput(passwordValidator);
  const {
    value: passwordConfirmValue,
    onBlur: onPasswordConfirmBlur,
    onChange: onPasswordConfirmChange,
    reset: resetPasswordConfirm,
    isValid: isPasswordConfirmValid,
    hasError: passwordConfirmHasError,
  } = useInput(passwordValidator);

  const errorMessage = t("error-message");
  const passwordConfirmIsValid =
    !passwordConfirmHasError && passwordValue === passwordConfirmValue;
  const isFormValid =
    isNameValid ||
    (isCurrentPasswordValid && isPasswordValid && passwordConfirmIsValid);
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { success } = await sendRequest({
      url: "/api/users",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: {
        name: nameValue,
        password: passwordValue,
        passwordConfirm: passwordConfirmValue,
      },
    });

    if (success) {
      setUserName(nameValue);
      resetPassword();
      resetCurrentPassword();
      resetPasswordConfirm();
    }
  };

  return (
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
      <h2>{t("heading")}</h2>
      <div className={styles.formContainer}>
        <Input
          type="text"
          // placeholder={t("placeholder-name")}
          placeholder={userName}
          // value={userName}
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
        <Input
          type="password"
          placeholder={t("placeholder-curr-pwd")}
          title={
            isAccountFromGoogle
              ? t("title-pwd-!google-acc")
              : t("title-curr-pwd-google-acc")
          }
          disabled={isAccountFromGoogle}
          value={currentPasswordValue}
          onBlur={onCurrentPasswordBlur}
          onChange={onCurrentPasswordChange}
          autoComplete="off"
          required
        />
        <p
          className={styles.errorMessage}
          style={{
            visibility: setVisibility(passwordHasError),
            color: "red",
          }}
        >
          {errorMessage}
        </p>
        <Input
          type="password"
          placeholder={t("placeholder-new-pwd")}
          title={
            isAccountFromGoogle
              ? t("title-pwd-!google-acc")
              : t("title-new-pwd-google-acc")
          }
          disabled={isAccountFromGoogle}
          value={passwordValue}
          onBlur={onPasswordBlur}
          onChange={onPasswordChange}
          autoComplete="off"
          required
        />
        <p
          className={styles.errorMessage}
          style={{
            visibility: setVisibility(passwordHasError),
            color: "red",
          }}
        >
          {errorMessage}
        </p>
        <Input
          type="password"
          placeholder={t("placeholder-confirm-pwd")}
          title={
            isAccountFromGoogle
              ? t("title-pwd-!google-acc")
              : t("title-pwd-confirm-google-acc")
          }
          disabled={isAccountFromGoogle}
          value={passwordConfirmValue}
          onBlur={onPasswordConfirmBlur}
          onChange={onPasswordConfirmChange}
          autoComplete="off"
          required
        />
        <p
          className={styles.errorMessage}
          style={{
            visibility: setVisibility(!passwordConfirmIsValid),
            color: "red",
          }}
        >
          {errorMessage}
        </p>

        <Button style={{ width: "100%" }} isDisabled={!isFormValid}>
          {t("btn-form")}
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
