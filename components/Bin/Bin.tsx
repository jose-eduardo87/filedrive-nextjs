import { FC, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInBin } from "@/components/File";
import { Button } from "@/components/ui";
import { ToggleCheck, Trash } from "@/components/Icons";
import useControlledInput from "hooks/use-controlled-checkbox";
import { FileInListInterface } from "@/components/FileManager/FileManager";
import { HEADING_STYLE_IN_FILES, ICON_STYLE_IN_FILES } from "helpers/constants";

import styles from "../Files/Files.module.css";

const Bin: FC<{ files: FileInListInterface; id: string }> = ({ files, id }) => {
  const {
    registeredFiles,
    isTogglingCheckboxes,
    registerFile,
    unregisterFile,
    onToggleFiles,
  } = useControlledInput();
  const hasFilesInTrash = files.items.length > 0;
  const hasRegisteredFiles = registeredFiles.length > 0;

  const renderEmptyPanel = (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    >
      <p style={{ textAlign: "center", color: "#A1A1A1" }}>
        Clean bin, congratulations!
      </p>
    </div>
  );

  // file,
  // draggableConfig,
  // isToggling,
  // registerFile,
  // unregisterFile,

  console.log("id", id);
  console.log("status", files.name);

  const renderFilePanel = files.items.map((file, index) => (
    <Draggable key={file.id} draggableId={file.id} index={index}>
      {(provided) => (
        <FileInBin
          draggableConfig={{ provided }}
          file={file}
          registerFile={registerFile}
          unregisterFile={unregisterFile}
          isToggling={isTogglingCheckboxes}
        />
      )}
    </Draggable>
  ));

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          <h2 style={{ ...HEADING_STYLE_IN_FILES }}>
            <Trash {...ICON_STYLE_IN_FILES} /> Trash
          </h2>
          <ul
            ref={provided.innerRef}
            className={styles.root}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#EBFCED" : "",
              border: snapshot.isDraggingOver ? "2px dotted #CECECE" : "",
            }}
            {...provided.droppableProps}
          >
            {hasFilesInTrash ? renderFilePanel : renderEmptyPanel}
            {provided.placeholder}
          </ul>
          <Button
            title={
              hasFilesInTrash
                ? "Click this button to check/uncheck all the files in the bin."
                : "The bin is empty."
            }
            isDisabled={!hasFilesInTrash}
            style={{
              width: "15%",
              backgroundColor: "#F2D2BD",
              color: "#B3B3B3",
              border: "none",
              padding: 0,
            }}
            onClick={onToggleFiles}
          >
            <ToggleCheck width="2rem" height="1rem" />
          </Button>
          <Button
            title={
              hasRegisteredFiles
                ? "Click this button to permanently delete the selected files."
                : "You must check at least one file in order to clean the bin."
            }
            isDisabled={!hasRegisteredFiles}
            onClick={() =>
              alert(
                `A POST request will be sent to the server to delete the following files: ${JSON.stringify(
                  registeredFiles
                )}`
              )
            }
            style={{
              width: "85%",
              backgroundColor: "#FFFFE0",
              color: "#CECECE",
              border: "none",
            }}
          >
            Clear bin
          </Button>
        </>
      )}
    </Droppable>
  );
};

export default Bin;
