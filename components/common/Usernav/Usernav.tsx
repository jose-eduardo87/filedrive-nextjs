import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUserInfo } from "store/user-context";
import { useTheme } from "store/theme-context";
import { Home, Dashboard, Filedrive, Gear, Logout } from "@/components/Icons";

import styles from "./Usernav.module.css";

const getIconStyles = (isDark: boolean) => {
  return { width: 20, fill: isDark ? "#FFFFFF" : "#000000" };
};

const Usernav: FC = () => {
  const { user } = useUserInfo();
  const { isDark } = useTheme();

  return (
    <div
      className={styles.usernav}
      style={{ backgroundColor: isDark ? "#272640" : "#FFFFFF" }}
    >
      <div className={styles.upperGroup}>
        <div className={styles.profileImg}>
          {/* <Image
            alt={'Eduardo'}
            width="250px"
            height="250px"
            layout="responsive"
            src={profileImage}
          /> */}
        </div>
        <small>{user!.name}</small>
        <nav>
          <ul className={styles.navLinks}>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <Home {...getIconStyles(isDark)} />
                </span>
                Homepage
              </li>
            </Link>
            <Link passHref href="/drive">
              <li>
                <span className={styles.icon}>
                  <Dashboard {...getIconStyles(isDark)} />
                </span>
                Dashboard
              </li>
            </Link>
            <Link passHref href="/drive/files">
              <li>
                <span className={styles.icon}>
                  <Filedrive {...getIconStyles(isDark)} />
                </span>
                File Manager
              </li>
            </Link>
            {/* <Link passHref href="/drive/trash">
              <li>
                <span className={styles.icon}>
                  <Trash {...getIconStyles(isDark)} />
                </span>
                Trash
              </li>
            </Link> */}
            <Link passHref href="/drive/settings">
              <li>
                <span className={styles.icon}>
                  <Gear {...getIconStyles(isDark)} />
                </span>
                Settings
              </li>
            </Link>
          </ul>
        </nav>
      </div>

      <Link passHref href="/drive/logout">
        <p className={styles.logout}>
          <span style={{ marginRight: ".5rem", verticalAlign: "middle" }}>
            <Logout width={16} fill="red" />
          </span>
          Logout
        </p>
      </Link>
    </div>
  );
};

export default Usernav;
