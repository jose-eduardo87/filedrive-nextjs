import { FC } from "react";
import { Footer, Usernav } from "@/components/common";
import UserProvider from "store/user-context";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <UserProvider>
        <div className={styles.root}>
          <Usernav />
          <div className={styles.dashboard}>{children}</div>
        </div>
      </UserProvider>
      <Footer />
    </div>
  );
};

export default LayoutDrive;
