// layout configuration for the main page.

import { FC } from "react";
import { Navbar, Footer } from "@/components/common";

import styles from "./Layout.module.css";

const Layout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
