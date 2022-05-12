import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useTheme } from "store/theme-context";
import { useInterface } from "store/interface-context";
import { Home, Dashboard, Filedrive, Gear, Logout } from "@/components/Icons";
import { DEFAULT_AVATAR } from "helpers/constants";

import styles from "./Usernav.module.css";

const getIconStyles = (isDark: boolean) => {
  return { width: 20, fill: isDark ? "#FF7F50" : "#000000" };
};

const Usernav: FC = () => {
  const { t } = useTranslation("common");
  const { userName, profileImage } = useInterface();
  const { isDark } = useTheme();

  return (
    <div
      className={styles.usernav}
      style={{ backgroundColor: isDark ? "#181818" : "#FAF9F6" }}
    >
      <div className={styles.upperGroup}>
        <div className={styles.profileImg}>
          <Image
            alt={`${userName} profile image`}
            width={150}
            height={150}
            layout="responsive"
            quality={60}
            objectFit="cover"
            src={profileImage || DEFAULT_AVATAR}
            priority
          />
        </div>
        <small>{userName}</small>
        <nav>
          <ul className={styles.navLinks}>
            <Link passHref href="/">
              <li>
                <span className={styles.icon}>
                  <Home {...getIconStyles(isDark)} />
                </span>
                Home
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
                {t("usernav-file-manager")}
              </li>
            </Link>
            <Link passHref href="/drive/settings">
              <li>
                <span className={styles.icon}>
                  <Gear {...getIconStyles(isDark)} />
                </span>
                {t("usernav-settings")}
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <p
        className={styles.logout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <span style={{ marginRight: ".5rem", verticalAlign: "middle" }}>
          <Logout width={16} fill="red" />
        </span>
        {t("usernav-logout")}
      </p>
    </div>
  );
};

export default Usernav;
