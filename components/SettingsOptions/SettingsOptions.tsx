import { FC } from "react";
import Link from "next/link";
import { Selector } from "@/components/ui";
import { Dark, Light } from "@/components/Icons";

import styles from "./SettingsOptions.module.css";

const SettingsOptions: FC = () => {
  return (
    <div className={styles.root}>
      <h2>Additional options</h2>

      <p>
        Change theme:{" "}
        <Selector
          icons={{
            checked: <Dark />,
            unchecked: <Light />,
          }}
        />
      </p>
      <p>
        Change language:{" "}
        <Selector
          icons={{
            checked: <Dark />,
            unchecked: <Light />,
          }}
        />
      </p>

      <Link passHref href="/drive/upgrade">
        <p className={styles.upgradeLink}>Upgrade your account</p>
      </Link>
    </div>
  );
};

export default SettingsOptions;
