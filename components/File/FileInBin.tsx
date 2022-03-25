/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState, memo } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { FileInterface } from "pages/drive/files";
import { getMediaIcon } from "helpers/functions";

import styles from "./File.module.css";

interface FileProps {
  file: FileInterface;
  provided: DraggableProvided;
  toggleState: { isTogglingCheckboxes: boolean; keepRendering: number };
  detectiveFunctions: {
    registerFile: (id: string, isChecked: boolean) => void;
    unregisterFile: (id: string) => void;
  };
}

const FileInBin: FC<FileProps> = ({
  file,
  provided,
  toggleState,
  detectiveFunctions,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const { isTogglingCheckboxes, keepRendering } = toggleState;
  const { registerFile, unregisterFile } = detectiveFunctions;
  const MediaIcon = getMediaIcon(file.name);
  const iconStyles = { width: 16, fill: "#B4B4B4" };

  useEffect(() => {
    registerFile(file.id, isChecked);

    // cleanup function.
    return () => unregisterFile(file.id);
  }, [isChecked]);

  useEffect(() => {
    if (hasToggledBefore) {
      setIsChecked(isTogglingCheckboxes);
    }

    setHasToggledBefore(true);
  }, [keepRendering, isTogglingCheckboxes]);

  return (
    <li
      ref={provided.innerRef}
      className={styles.root}
      title="Drag this file to the left panel in order to download it."
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
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
    </li>
  );
};

export default memo(FileInBin);
