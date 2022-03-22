import {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  memo,
} from "react";
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
  registerFile?: (
    id: string,
    isChecked: boolean,
    setIsChecked: Dispatch<SetStateAction<boolean>>
  ) => void;
  cleanup: (id: string) => void;
}> = ({ id, file, draggableConfig, currentStatus, registerFile, cleanup }) => {
  const isFileFromTrash = useRef(id === "list-trash" ? true : false);
  const [isChecked, setIsChecked] = useState(false);
  const { provided } = draggableConfig;
  const isFileInDrive = id === "list-drive";
  const regex = new RegExp("[^.]+$");
  const extension = file.name.match(regex);
  const MediaIcon = getFileExtensionType(extension![0].toLowerCase());
  const iconStyles = { width: 16, fill: "#B4B4B4" };

  useEffect(() => {
    // IF FILE COMPONENT IS LIVING IN "BIN", IT WILL RECEIVE registerFile AS PROPS,
    // THEREFORE THIS IF-CONDITION WILL BE MET.
    if (isFileFromTrash.current) {
      registerFile!(file.id, isChecked, setIsChecked);
    }
  }, [isChecked]);

  // CLEAN-UP IN ORDER TO REMOVE THE COMPONENT FROM THE LIST OF ALL FILES IN TRASH COMPONENT.
  useEffect(() => {
    if (isFileFromTrash.current) {
      return () => cleanup(file.id);
    }
  }, []);

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
          type="checkbox"
          id={file.id}
          name={file.name}
          checked={isChecked}
          onChange={() => setIsChecked((currentState) => !currentState)}
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
