import { FC, memo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";
import { getMediaIcon } from "helpers/functions";

import styles from "./File.module.css";

interface draggableConfig {
  provided: DraggableProvided;
}

interface FileProps {
  file: FileInterface;
  draggableConfig: draggableConfig;
}

const FileInDrive: FC<FileProps> = ({ file, draggableConfig }) => {
  const { provided } = draggableConfig;
  const MediaIcon = getMediaIcon(file.name);
  const iconStyles = { width: 16, fill: "#B4B4B4" };

  const onDoubleClickHandler = () => {
    console.log("Download request must be done from here.");
  };

  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title={"Double-click me to download this file."}
      onDoubleClick={onDoubleClickHandler}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span>
        <MediaIcon {...iconStyles} /> {file.name}
      </span>
      <span>{file.size}</span>
    </li>
  );
};

export default memo(FileInDrive);
