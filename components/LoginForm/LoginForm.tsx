import { FC, FormEvent } from "react";
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui";
import useInput from "hooks/use-input";
import { emailValidator, passwordValidator } from "helpers/functions";

import styles from "./LoginForm.module.css";

const LoginForm: FC = () => {
  const { t } = useTranslation("loginform");
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

  const isFormValid = isEmailValid && isPasswordValid;
  const errorMessage = t("error-message");
  const setVisibility = (hasError: boolean) =>
    hasError ? "visible" : "hidden";
  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    console.log(emailValue, passwordValue);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <Input
        type="text"
        placeholder="E-mail"
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

      <Button
        style={{ width: "100%" }}
        isDisabled={!isFormValid}
        onClick={() => console.log("Clicked.")}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
