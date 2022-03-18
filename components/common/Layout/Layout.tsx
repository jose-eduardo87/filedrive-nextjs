import { FC } from "react";
import { Navbar, Footer } from "@/components/common";
import { useTheme } from "store/theme-context";

import styles from "./Layout.module.css";

const Layout: FC = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={styles.layout}
      // style={{ backgroundColor: isDark ? "#312244" : "#E9EDF1" }}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
