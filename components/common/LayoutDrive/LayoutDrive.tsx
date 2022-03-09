import { FC } from "react";
import { Navbar, Footer, Usernav } from "@/components/common";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.root}>
        <Usernav />
        <div className={styles.dashboard}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutDrive;
