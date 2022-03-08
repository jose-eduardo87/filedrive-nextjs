import { FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { LoginForm } from "@/components/LoginForm";
import { GoogleLogo } from "@/components/Icons";

import styles from "./Login.module.css";

const Login: FC = () => {
  return (
    <section className={styles.root}>
      <h1>Log in to your drive account.</h1>
      <div className={styles.loginOptionsBox}>
        <Link passHref href="/">
          <a>
            <Button
              style={{
                width: "100%",
                fontSize: "1rem",
                verticalAlign: "middle",
              }}
            >
              <GoogleLogo /> Continue with Google
            </Button>
          </a>
        </Link>
        <br />
        <LoginForm />
      </div>
      <div className={styles.accountOptions}>
        <p>
          Forgot your password?{" "}
          <Link href="/">
            <a>Click here</a>
          </Link>{" "}
          and we will send a recovery e-mail.
        </p>

        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <a>Click here.</a>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
