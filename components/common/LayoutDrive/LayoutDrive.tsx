// layout configuration for the pages inside of /drive.

import { FC } from "react";
import Panel from "@/components/Panel";
import StorageProvider from "store/storage-context";
import UserInfoProvider from "store/userinfo-context";
import ThemeProvider from "store/theme-context";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <StorageProvider>
      <UserInfoProvider>
        <ThemeProvider>
          <div className={styles.layout}>
            <Panel>{children}</Panel>
          </div>
        </ThemeProvider>
      </UserInfoProvider>
    </StorageProvider>
  );
};

export default LayoutDrive;
