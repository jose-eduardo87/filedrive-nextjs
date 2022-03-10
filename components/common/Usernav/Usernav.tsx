import { FC } from "react";
import Link from "next/link";
import { Home, File, Trash, Gear, Logout } from "@/components/Icons";

import styles from "./Usernav.module.css";

const iconStyles = { width: 20 };

const Usernav: FC = () => {
  return (
    <div className={styles.usernav}>
      <div className={styles.upperGroup}>
        <div className={styles.profileImg}></div>
        <nav>
          <ul className={styles.navLinks}>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <Home {...iconStyles} />
                </span>
                Homepage
              </li>
            </Link>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <File {...iconStyles} />
                </span>
                Files
              </li>
            </Link>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <Trash {...iconStyles} />
                </span>
                Trash
              </li>
            </Link>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <Gear {...iconStyles} />
                </span>
                Settings
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <Link passHref href="/logout">
        <p className={styles.logout}>
          <span style={{ marginRight: ".5rem", verticalAlign: "middle" }}>
            <Logout width={16} fill="red" />
          </span>
          LOGOUT
        </p>
      </Link>
    </div>
  );
};

export default Usernav;
