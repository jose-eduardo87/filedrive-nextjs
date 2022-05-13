import { FC, FormEvent } from "react";
import { useTranslation } from "next-i18next";
import { Input } from "@/components/Input";
import { Button, PopupMessage } from "@/components/ui";
import { Error, Important } from "@/components/Icons";
import useInput from "hooks/use-input";
import useHttp from "hooks/use-http";
import {
  nameValidator,
  emailValidator,
  passwordValidator,
} from "helpers/functions";

import styles from "./SignUpForm.module.css";

const SignUpForm: FC = () => {
  const { t } = useTranslation("signupform");
  const {
    value: nameValue,
    onBlur: onNameBlur,
    onChange: onNameChange,
    reset: resetName,
    isValid: isNameValid,
    hasError: nameHasError,
  } = useInput(nameValidator);
  const {
    value: emailValue,
    onBlur: onEmailBlur,
    onChange: onEmailChange,
    reset: resetEmail,
    isValid: isEmailValid,
    hasError: emailHasError,
  } = useInput(emailValidator);
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
  const { error, isLoading, sendRequest, showError } = useHttp();

  const errorMessage = t("error-message");
  const passwordConfirmIsValid =
    !passwordConfirmHasError && passwordValue === passwordConfirmValue;
  const isFormValid =
    isNameValid && isEmailValid && isPasswordValid && passwordConfirmIsValid;
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";
  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const response = await sendRequest({
      url: "/api/users/sign-up",
      body: { nameValue, emailValue, passwordValue, passwordConfirmValue },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.success) {
      resetName();
      resetEmail();
      resetPassword();
      resetPasswordConfirm();
    }
  };

  return (
    <>
      {isLoading && (
        <PopupMessage
          type="loading"
          message="We are almost there..."
          SVG={<Important fill="#6A23AD" />}
        />
      )}
      {showError && (
        <PopupMessage
          type="error"
          message={error!}
          SVG={<Error fill="#7C4343" />}
        />
      )}
      <form className={styles.form} onSubmit={onSubmitHandler}>
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
          type="text"
          placeholder={t("placeholder-email")}
          value={emailValue}
          onBlur={onEmailBlur}
          onChange={onEmailChange}
          required
        />
        <p
          className={styles.errorMessage}
          style={{
            visibility: setVisibility(emailHasError),
            color: "red",
          }}
        >
          {errorMessage}
        </p>
        <Input
          type="password"
          placeholder={t("placeholder-pwd")}
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
          {t("btn")}
        </Button>
      </form>
    </>
  );
};

export default SignUpForm;
