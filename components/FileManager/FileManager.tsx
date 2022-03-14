import { FC, CSSProperties, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Files } from "@/components/Files";
import { File, Trash } from "@/components/Icons";

import styles from "./FileManager.module.css";

export interface FileInterface {
  id: string;
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
  const onDragEnd = useCallback((result) => console.log(result), []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={styles.root}>
        <div className={styles.filesPanel}>
          <h2 style={{ ...headingStyle }}>
            <File {...iconStyle} /> Filedrive
          </h2>
          <Files files={files} id="drive" />
        </div>
        <div className={styles.trashPanel}>
          <h2 style={{ ...headingStyle }}>
            <Trash {...iconStyle} /> Trash
          </h2>
          <Files files={trash} id="trash" />
        </div>
      </section>
    </DragDropContext>
  );
};

export default FileManager;
