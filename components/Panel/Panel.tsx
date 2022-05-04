import { FC } from "react";
import { Usernav, Footer } from "../common";
import { useTheme } from "store/theme-context";

import styles from "./Panel.module.css";

const Panel: FC = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <>
      <div
        className={styles.root}
        style={{ backgroundColor: isDark ? "#28282B" : "" }}
      >
        <Usernav />
        <div className={styles.dashboard}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Panel;
