import { FC, memo } from "react";
import { FileInterface } from "@/components/FileManager/FileManager";

import styles from "./File.module.css";
import { DraggableProvided } from "react-beautiful-dnd";

const File: FC<{ file: FileInterface; provided: DraggableProvided }> = ({
  file,
  provided,
}) => {
  console.log("File render.");
  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {file.name} | {file.size}
    </li>
  );
};

File.displayName = "File";

export default memo(File);
