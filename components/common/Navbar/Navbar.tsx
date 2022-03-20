import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { Login } from "@/components/Icons";
import { useTheme } from "store/theme-context";

import styles from "./Navbar.module.css";

const iconStyles = {
  cursor: "pointer",
  height: "1.4rem",
  width: "1.4rem",
  fill: "#FFF",
  stroke: "#FFF",
  strokeWidth: "1.5px",
};

const Navbar: FC = () => {
  const { isDark } = useTheme();

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: isDark ? "#272640" : "#8800C7" }}
    >
      <div className={styles.container}>
        <Link passHref href="/">
          <h1>Capybara Drive</h1>
        </Link>
        <nav>
          <ul className={styles.navLinks}>
            <Link passHref href="/">
              <li className={styles.navLink}>Link 1</li>
            </Link>
            <Link passHref href="/">
              <li className={styles.navLink}>Link 2</li>
            </Link>
            <Link passHref href="/">
              <li className={styles.navLink}>Link 3</li>
            </Link>
          </ul>
          <div className={styles.iconsArea}>
            <Link passHref href="/login">
              <a>
                <Login {...iconStyles} />
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
