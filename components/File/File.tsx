import { FC, memo } from "react";
import { FileInterface } from "pages/drive/files";

import styles from "./File.module.css";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface draggableConfig {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const File: FC<{
  file: FileInterface;
  draggableConfig: draggableConfig;
}> = ({ file, draggableConfig }) => {
  const { provided, snapshot } = draggableConfig;
  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      style={{
        userSelect: "none",
        backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
        ...provided.draggableProps.style,
      }}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {file.name} | {file.size}
    </li>
  );
};

export default memo(File);
