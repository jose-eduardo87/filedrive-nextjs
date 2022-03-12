import { FC } from "react";
import { File } from "@/components/File";

import styles from "./Files.module.css";

import { FileInterface } from "@/components/FileManager/FileManager";

const Files: FC<{ files: FileInterface[] }> = ({ files }) => {
  return (
    <ul className={styles.root}>
      {files.map((file) => (
        <File key={file.name} file={file} />
      ))}
    </ul>
  );
};

export default Files;
