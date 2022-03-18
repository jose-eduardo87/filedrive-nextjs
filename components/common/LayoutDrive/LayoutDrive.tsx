import { FC } from "react";
import { Footer, Usernav } from "@/components/common";
import { useTheme } from "store/theme-context";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <div className={styles.layout}>
      <div
        className={styles.root}
        style={{ backgroundColor: isDark ? "#312244" : "" }}
      >
        <Usernav />
        <div className={styles.dashboard}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutDrive;
