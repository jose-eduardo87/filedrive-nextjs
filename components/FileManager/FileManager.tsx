import { FC, CSSProperties } from "react";
import { Files } from "@/components/Files";
import { File, Trash } from "@/components/Icons";

import styles from "./FileManager.module.css";

export interface FileInterface {
  name: string;
  size: string;
  url: string;
}

interface FMProps {
  files: FileInterface[];
  trash: FileInterface[];
}

const headingStyle: CSSProperties = {
  color: "#7E7E7E",
  fontSize: "1.2rem",
  fontWeight: 400,
  letterSpacing: "1px",
};
const iconStyle: CSSProperties = {
  width: "1.2rem",
  fill: "#999999",
};

const FileManager: FC<FMProps> = ({ files, trash }) => {
  return (
    <section className={styles.root}>
      <div className={styles.filesPanel}>
        <h2 style={{ ...headingStyle }}>
          <File {...iconStyle} /> Filedrive
        </h2>
        <Files files={files} />
      </div>
      <div className={styles.trashPanel}>
        <h2 style={{ ...headingStyle }}>
          <Trash {...iconStyle} /> Trash
        </h2>
        <Files files={trash} />
      </div>
    </section>
  );
};

export default FileManager;
