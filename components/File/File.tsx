import { FC } from "react";
import { FileInterface } from "@/components/FileManager/FileManager";

import styles from "./File.module.css";

const File: FC<{ file: FileInterface }> = ({ file }) => {
  return (
    <li className={styles.root}>
      {file.name} | {file.size}
    </li>
  );
};

export default File;
