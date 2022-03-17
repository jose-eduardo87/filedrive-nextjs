import { FC } from "react";
import Link from "next/link";
import { Selector } from "@/components/ui";

import styles from "./SettingsOptions.module.css";

const selectorStyles = {
  height: 30,
  width: 66,
  handleDiameter: 20,
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
  activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
  onHandleColor: "#2693E6",
  onColor: "#E7FFFF",
  offColor: "#FDE4E8",
};

const iconsStyles = {
  fontSize: ".8rem",
  fontWeight: 600,
};

const SettingsOptions: FC = () => {
  return (
    <div className={styles.root}>
      <h2>Additional options</h2>

      <div className={styles.selectionGroup}>
        <p>Choose theme: </p>
        <Selector
          icons={{
            checked: <p style={{ ...iconsStyles }}>DARK</p>,
            unchecked: <p style={{ ...iconsStyles }}>LIGHT</p>,
          }}
          {...selectorStyles}
        />
      </div>
      <div className={styles.selectionGroup}>
        Choose language:{" "}
        <Selector
          icons={{
            checked: <p style={{ ...iconsStyles }}>EN</p>,
            unchecked: <p style={{ ...iconsStyles }}>PT</p>,
          }}
          {...selectorStyles}
        />
      </div>

      <Link passHref href="/drive/upgrade">
        <p className={styles.upgradeLink}>Upgrade plans</p>
      </Link>
    </div>
  );
};

export default SettingsOptions;
