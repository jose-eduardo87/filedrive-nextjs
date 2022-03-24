/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, memo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";
import { getFileExtensionType } from "helpers/functions";

import styles from "./File.module.css";

interface draggableConfig {
  provided: DraggableProvided;
}

interface FileProps {
  file: FileInterface;
  draggableConfig: draggableConfig;
  isToggling: boolean;
  registerFile: (id: string, isChecked: boolean) => void;
  unregisterFile: (id: string) => void;
}

const FileInBin: FC<FileProps> = ({
  file,
  draggableConfig,
  isToggling,
  registerFile,
  unregisterFile,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const { provided } = draggableConfig;
  const regex = new RegExp("[^.]+$");
  const extension = file.name.match(regex);
  const MediaIcon = getFileExtensionType(extension![0].toLowerCase());
  const iconStyles = { width: 16, fill: "#B4B4B4" };

  // Responsible for registering current File component into Bin component.
  useEffect(() => {
    registerFile!(file.id, isChecked);
  }, [isChecked]);

  // Responsible for changing isChecked state whenever there is a change is toggle.
  useEffect(() => {
    if (hasToggledBefore) {
      setIsChecked(isToggling!);
    }

    setHasToggledBefore(true);
  }, [isToggling]);

  // Everytime this component ends its lifecycle, this unregisterFile cleanup function will run.
  // This function removes the file from the file's list by filtering its ID in the list.
  useEffect(() => {
    return () => unregisterFile!(file.id);
  }, []);

  const renderFile = (
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

  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title={"Drag this file to the left panel in order to download it."}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {renderFile}
    </li>
  );
};

export default memo(FileInBin);
