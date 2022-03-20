import { FileSharingIllustration } from "@/components/Icons";
import { Button } from "@/components/ui";
import { CSSProperties } from "react";
import { useTheme } from "store/theme-context";

import styles from "./Welcome.module.css";

const buttonStyle = (isDark: boolean): CSSProperties => {
  return isDark
    ? { backgroundColor: "#FFFFFF", color: "#000000" }
    : { backgroundColor: "#000000", color: "#FFFFFF" };
};

export default function Welcome() {
  const { isDark } = useTheme();

  return (
    <section className={styles.root}>
      <div className={styles.infoContainer}>
        <div className={styles.rowItems}>
          <div className={styles.leftPanel}>
            <h2>Your files, accessible from anywhere!</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
              nulla eaque molestias, dolores magni quaerat et modi illo sapiente
              sint nemo sequi doloribus, est quibusdam?
            </p>
            <div className={styles.buttonsGroup}>
              <Button title="Create a new account" style={buttonStyle(isDark)}>
                Create an account
              </Button>
              <Button
                title="Send your files right away!"
                style={buttonStyle(isDark)}
              >
                Send files!
              </Button>
            </div>
          </div>
          <div className={styles.rightPanel}>
            <FileSharingIllustration width="100%" height="100%" />
          </div>
        </div>
      </div>
    </section>
  );
}
