import { FC } from "react";
import Panel from "@/components/Panel";
import InterfaceProvider from "store/interface-context";
import ThemeProvider from "store/theme-context";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <InterfaceProvider>
      <ThemeProvider>
        <div className={styles.layout}>
          <Panel>{children}</Panel>
        </div>
      </ThemeProvider>
    </InterfaceProvider>
  );
};

export default LayoutDrive;
