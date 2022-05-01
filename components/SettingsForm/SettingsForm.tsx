import { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/";
import useInput from "hooks/use-input";
import useHttp from "hooks/use-http";
import { nameValidator, passwordValidator } from "helpers/functions";

import styles from "./SettingsForm.module.css";

const SettingsForm: FC<{
  userName: string;
  updateName: Dispatch<SetStateAction<string>>;
  isAccountFromGoogle: boolean;
}> = ({ userName, updateName, isAccountFromGoogle }) => {
  const { t } = useTranslation("settingsform");
  const { error, showError, isLoading, sendRequest } = useHttp();

  const {
    value: nameValue,
    onBlur: onNameBlur,
    onChange: onNameChange,
    reset: resetName,
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

    const data = await sendRequest({
      url: "/api/users",
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: {
        name: nameValue,
        currentPassword: currentPasswordValue,
        password: passwordValue,
      },
    });

    console.log(data);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h2>{t("heading")}</h2>
      <div className={styles.formContainer}>
        <Input
          type="text"
          placeholder={t("placeholder-name")}
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
