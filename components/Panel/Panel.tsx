import { FC } from "react";
import { Usernav, Footer } from "../common";

import styles from "./Panel.module.css";

const Panel: FC = ({ children }) => {
  return (
    <>
      <div className={styles.root}>
        <Usernav />
        <div className={styles.dashboard}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Panel;
