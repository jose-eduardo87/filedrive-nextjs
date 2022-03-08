import { FC } from "react";
import { SignUpForm } from "@/components/SignUpForm";

import styles from "./SignUp.module.css";

const SignUp: FC = () => {
  return (
    <section className={styles.root}>
      <h1>Create your account.</h1>
      <div className={styles.formContainer}>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
