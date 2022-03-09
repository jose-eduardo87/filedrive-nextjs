import { FC } from "react";
import Link from "next/link";

import styles from "./Usernav.module.css";

const Usernav: FC = () => {
  return (
    <div className={styles.usernav}>
      <div className={styles.upperGroup}>
        <div className={styles.profileImg}></div>
        <nav>
          <ul className={styles.navLinks}>
            <Link passHref href="/">
              <li>Link 1</li>
            </Link>
            <Link passHref href="/">
              <li>Link 2</li>
            </Link>
            <Link passHref href="/">
              <li>Link 3</li>
            </Link>
            <Link passHref href="/">
              <li>Link 4</li>
            </Link>
            <Link passHref href="/">
              <li>Link 5</li>
            </Link>
          </ul>
        </nav>
      </div>

      <Link passHref href="/logout">
        <p className={styles.logout}>LOGOUT</p>
      </Link>
    </div>
  );
};

export default Usernav;
