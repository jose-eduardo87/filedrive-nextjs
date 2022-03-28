import { FC } from "react";
import { useRouter } from "next/router";
import { SignUpForm } from "@/components/SignUpForm";

import styles from "./SignUp.module.css";

const SignUp: FC = () => {
  const { locale } = useRouter();
  return (
    <section className={styles.root}>
      <h1>{locale === "en" ? "Create your account." : "Criar sua conta."}</h1>
      <div className={styles.formContainer}>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
