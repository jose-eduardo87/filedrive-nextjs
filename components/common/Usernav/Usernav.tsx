import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Dashboard, File, Trash, Gear, Logout } from "@/components/Icons";
import { useUserInfo } from "store/user-context";

import styles from "./Usernav.module.css";

const iconStyles = { width: 20 };

const Usernav: FC = () => {
  const { user } = useUserInfo();

  return (
    <div className={styles.usernav}>
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
                  <Home {...iconStyles} />
                </span>
                Homepage
              </li>
            </Link>
            <Link passHref href="/drive">
              <li>
                <span className={styles.icon}>
                  <Dashboard {...iconStyles} />
                </span>
                Dashboard
              </li>
            </Link>
            <Link passHref href="/drive/files">
              <li>
                <span className={styles.icon}>
                  <File {...iconStyles} />
                </span>
                File Manager
              </li>
            </Link>
            {/* <Link passHref href="/drive/trash">
              <li>
                <span className={styles.icon}>
                  <Trash {...iconStyles} />
                </span>
                Trash
              </li>
            </Link> */}
            <Link passHref href="/drive/settings">
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
