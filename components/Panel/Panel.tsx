import { FC } from "react";
import { Footer, Usernav } from "@/components/common";
import { useUserInfo } from "store/userinfo-context";

import styles from "./Panel.module.css";

const Panel: FC = ({ children }) => {
  const { profileImage, userName } = useUserInfo();

  return (
    <>
      <div className={styles.root}>
        <Usernav profileImage={profileImage} userName={userName} />
        <div className={styles.dashboard}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Panel;
