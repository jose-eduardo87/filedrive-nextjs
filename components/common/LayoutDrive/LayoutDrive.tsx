// layout configuration for the pages inside of /drive.

import { FC } from "react";
import Panel from "@/components/Panel";
import {
  FilesInfoProvider,
  UserInfoProvider,
  ThemeProvider,
} from "@/store/index";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <FilesInfoProvider>
      <UserInfoProvider>
        <ThemeProvider>
          <div className={styles.layout}>
            <Panel>{children}</Panel>
          </div>
        </ThemeProvider>
      </UserInfoProvider>
    </FilesInfoProvider>
  );
};

export default LayoutDrive;
