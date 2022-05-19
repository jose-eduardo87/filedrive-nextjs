/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, memo } from "react";
import { useUserInfo } from "store/userinfo-context";
import { DraggableProvided } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";
import { getMediaIcon, roundFileSizeToCorrectUnit } from "helpers/functions";

import styles from "./File.module.css";

interface FileProps {
  file: FileInterface;
  provided: DraggableProvided;
  toggleState: { isTogglingCheckboxes: boolean; runUseEffect: number };
  trackerFunctions: {
    registerFile: (id: string, key: string, isChecked: boolean) => void;
    unregisterFile: (id: string) => void;
  };
}

const FileInBin: FC<FileProps> = ({
  file,
  provided,
  toggleState,
  trackerFunctions,
}) => {
  const { language } = useUserInfo();
  const [isChecked, setIsChecked] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const { isTogglingCheckboxes, runUseEffect } = toggleState;
  const { registerFile, unregisterFile } = trackerFunctions;
  const MediaIcon = getMediaIcon(file.fileName);

  useEffect(() => {
    registerFile(file.id, file.key, isChecked); // stores file information in Bin.

    return () => unregisterFile(file.id); // cleanup. Removes the current file from Bin when component unmounts.
  }, [runUseEffect, isChecked]);

  useEffect(() => {
    if (hasToggledBefore) {
      setIsChecked(isTogglingCheckboxes);
    }

    setHasToggledBefore(true);
  }, [runUseEffect]);

  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title={
        language === "en"
          ? "Drag this file to the drive panel in order to download it."
          : "Arraste este arquivo para o painel do drive para realizar o download."
      }
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span className={styles.inputContainer}>
        <span style={{ width: "30%", padding: 0 }}>
          <input
            type="checkbox"
            id={file.id}
            name={file.fileName}
            checked={isChecked}
            onChange={() => setIsChecked((currentState) => !currentState)}
          />
          <span>
            <MediaIcon {...{ width: 16, fill: "#B4B4B4" }} /> {file.fileName}
          </span>
        </span>
        <span>{roundFileSizeToCorrectUnit(file.size)}</span>
      </span>
    </li>
  );
};

export default memo(FileInBin);
