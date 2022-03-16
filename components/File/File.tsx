import { FC, memo } from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";

import styles from "./File.module.css";

interface draggableConfig {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const File: FC<{
  id: string;
  file: FileInterface;
  draggableConfig: draggableConfig;
}> = ({ id, file, draggableConfig }) => {
  const { provided, snapshot } = draggableConfig;
  const isFileInDrive = id === "list-drive";

  const onDoubleClickHandler = (isInDrive: boolean) => {
    if (!isInDrive) {
      return;
    }

    alert("Download request must be done from here.");
  };
  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title={
        isFileInDrive
          ? "Double-click me to download this file."
          : "Drag this file to the left panel in order to download it."
      }
      onDoubleClick={() => onDoubleClickHandler(isFileInDrive)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {file.name} | {file.size}
    </li>
  );
};

export default memo(File);
