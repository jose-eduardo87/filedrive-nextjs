import { FC, FormEvent } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui";
import { Mail } from "../Icons";
import useInput from "hooks/use-input";
import { emailValidator, passwordValidator } from "helpers/functions";

import styles from "./LoginForm.module.css";

const LoginForm: FC = () => {
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
  const errorMessage = "Required field.";
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
        placeholder="Password"
        value={passwordValue}
        onBlur={onPasswordBlur}
        onChange={onPasswordChange}
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

      <Button style={{ width: "100%" }} isDisabled={!isFormValid}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
