import { FC } from "react";
import Panel from "@/components/Panel";
import ThemeProvider from "store/theme-context";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <Panel>{children}</Panel>
      </div>
    </ThemeProvider>
  );
};

export default LayoutDrive;
