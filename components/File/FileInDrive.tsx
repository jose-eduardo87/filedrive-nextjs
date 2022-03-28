import { FC, memo } from "react";
import { useRouter } from "next/router";
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
  const { locale } = useRouter();
  const { provided } = draggableConfig;
  const MediaIcon = getMediaIcon(file.name);

  const onDoubleClickHandler = () => {
    console.log("Download request must be done from here.");
  };

  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title={
        locale === "en"
          ? "Double-click me to download this file."
          : "Dê um duplo-clique para fazer o download deste arquivo."
      }
      onDoubleClick={onDoubleClickHandler}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span>
        <MediaIcon {...{ width: 16, fill: "#B4B4B4" }} /> {file.name}
      </span>
      <span>{file.size}</span>
    </li>
  );
};

export default memo(FileInDrive);
