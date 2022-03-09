import { FC } from "react";

import styles from "./DriveStorageInfo.module.css";

interface StorageInfoProps {
  totalSpace: number;
  usedSpace: number;
}

const DriveStorageInfo: FC<StorageInfoProps> = ({ totalSpace, usedSpace }) => {
  return (
    <section className={styles.root}>
      <p>
        You have used {usedSpace} from {totalSpace}.
      </p>
    </section>
  );
};

export default DriveStorageInfo;
