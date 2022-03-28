import { FC, FormEvent } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/";
import useInput from "hooks/use-input";
import { nameValidator, passwordValidator } from "helpers/functions";

import styles from "./SettingsForm.module.css";

const SettingsForm: FC = () => {
  const USER_NAME_FROM_BACKEND = "José Eduardo Oliveira de Araújo";

  const { t } = useTranslation("settingsform");

  const {
    value: nameValue,
    onBlur: onNameBlur,
    onChange: onNameChange,
    reset: resetName,
    isValid: isNameValid,
    hasError: nameHasError,
  } = useInput(nameValidator, USER_NAME_FROM_BACKEND);
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
    isNameValid &&
    isCurrentPasswordValid &&
    isPasswordValid &&
    passwordConfirmIsValid;
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log(
      nameValue,
      currentPasswordValue,
      passwordValue,
      passwordConfirmValue
    );
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
