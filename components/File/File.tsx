import { FC, useState, memo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";
import { getFileExtensionType } from "helpers/functions";

import styles from "./File.module.css";

interface draggableConfig {
  provided: DraggableProvided;
}

const File: FC<{
  id: string;
  file: FileInterface;
  draggableConfig: draggableConfig;
  currentStatus: string;
  onChangeHandler?: null | ((id: string, isChecked: boolean) => void);
}> = ({ id, file, draggableConfig, currentStatus, onChangeHandler }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { provided } = draggableConfig;
  const isFileInDrive = id === "list-drive";
  const regex = new RegExp("[^.]+$");
  const extension = file.name.match(regex);
  const MediaIcon = getFileExtensionType(extension![0].toLowerCase());
  const iconStyles = { width: 16, fill: "#B4B4B4" };

  const changeHandler = () => {
    setIsChecked((currentState) => !currentState);

    onChangeHandler!(file.id, !isChecked);
  };

  const renderFileInDrive = (
    <>
      <span>
        <MediaIcon {...iconStyles} /> {file.name}
      </span>
      <span>{file.size}</span>
    </>
  );

  const renderFileInTrash = (
    <span className={styles.inputContainer}>
      <span style={{ width: "30%", padding: 0 }}>
        <input
          onChange={changeHandler}
          type="checkbox"
          id={file.name}
          checked={isChecked}
          name={file.name}
        />
        <span>
          <MediaIcon {...iconStyles} /> {file.name}
        </span>
      </span>
      <span>{file.size}</span>
    </span>
  );

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
      {currentStatus === "drive" ? renderFileInDrive : renderFileInTrash}
    </li>
  );
};

export default memo(File);
