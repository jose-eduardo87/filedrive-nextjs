import { FC, FormEvent } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/";
import useInput from "hooks/use-input";
import { nameValidator, passwordValidator } from "helpers/functions";

import styles from "./SettingsForm.module.css";

const SettingsForm: FC = () => {
  const USER_NAME_FROM_BACKEND = "José Eduardo Oliveira de Araújo";
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
  const errorMessage = "Invalid field.";
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
      <h2>Basic information</h2>
      <div className={styles.formContainer}>
        <Input
          type="text"
          placeholder="Name"
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
          placeholder="Current Password"
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
          placeholder="New Password"
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
          placeholder="Confirm New Password"
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
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
