import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInBin } from "@/components/File";
import { Button } from "@/components/ui";
import useCheckbox from "hooks/use-checkbox";
import { FileInListInterface } from "@/components/FileManager/FileManager";
import { ToggleCheck, Trash } from "@/components/Icons";
import { getButtonStyleInBin } from "helpers/functions";
import { HEADING_STYLE_IN_FILES, ICON_STYLE_IN_FILES } from "helpers/constants"; // check these constant names

import styles from "../Files/Files.module.css";

const Bin: FC<{ files: FileInListInterface; id: string }> = ({ files, id }) => {
  const { registeredFiles, detectiveFunctions, toggleState } = useCheckbox();
  const { isTogglingCheckboxes, runUseEffect, onToggleFiles } = toggleState;
  const hasFilesInBin = files.items.length > 0;
  const hasRegisteredFiles = registeredFiles.some((file) => file?.isChecked);

  const renderEmptyPanel = (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    >
      <p style={{ textAlign: "center", color: "#A1A1A1" }}>
        Clean bin, congratulations!
      </p>
    </div>
  );

  const renderFilePanel = files.items.map((file, index) => (
    <Draggable key={file.id} draggableId={file.id} index={index}>
      {(provided) => (
        <FileInBin
          provided={provided}
          file={file}
          detectiveFunctions={detectiveFunctions}
          toggleState={{ isTogglingCheckboxes, runUseEffect }}
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
            {hasFilesInBin ? renderFilePanel : renderEmptyPanel}
            {provided.placeholder}
          </ul>
          <Button
            title={
              hasFilesInBin
                ? "Click this button to check/uncheck all the files in the bin."
                : "The bin is empty."
            }
            isDisabled={!hasFilesInBin}
            style={getButtonStyleInBin("toggle")}
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
            style={getButtonStyleInBin()}
          >
            Clear bin
          </Button>
        </>
      )}
    </Droppable>
  );
};

export default Bin;
