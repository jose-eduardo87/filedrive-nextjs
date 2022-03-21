import { Dispatch, FC, SetStateAction, useState, useCallback } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { File } from "@/components/File";
import { Button } from "@/components/ui";
import { ToggleCheck, Trash } from "@/components/Icons";
import { FileInListInterface } from "../FileManager/FileManager";
import { HEADING_STYLE_IN_FILES, ICON_STYLE_IN_FILES } from "helpers/constants";

import styles from "../Files/Files.module.css";

const Bin: FC<{ files: FileInListInterface; id: string }> = ({ files, id }) => {
  const [toggleSelection, setToggleSelection] = useState(true);
  const [registeredItems, setRegisteredItems] = useState<
    Partial<
      {
        id: string;
        isChecked: boolean;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
      }[]
    >
  >([]);
  const hasFilesInTrash = files.items.length > 0;
  const hasRegisteredItems = registeredItems.length > 0;

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
        <File
          draggableConfig={{ provided }}
          file={file}
          id={id}
          currentStatus={files.name}
          registerFile={onRegisterFile}
        />
      )}
    </Draggable>
  ));

  // FUNCTION RESPONSIBLE TO REGISTER ALL THE INFORMATION REGARDING FILES LIVING IN Bin.tsx. BY ARCHITECTURING THIS WAY, BIN WILL CONTROL THE ITS CHILDREN, MAKING IT REALLY SIMPLE
  // DOING STATE CHANGES (eg: onToggleFiles() TO TOGGLE ON/OFF INPUT SELECTION).
  const onRegisterFile = useCallback(
    (
      id: string,
      isChecked: boolean,
      setIsChecked: Dispatch<SetStateAction<boolean>>
    ) => {
      const index = registeredItems.findIndex((item) => item?.id === id);

      if (index < 0) {
        setRegisteredItems((currentState) => [
          ...currentState,
          { id, isChecked, setIsChecked },
        ]);

        return;
      }

      const updatedItems = [...registeredItems];
      updatedItems[index] = { id, isChecked, setIsChecked };

      setRegisteredItems(updatedItems);
    },
    [registeredItems]
  );

  const onToggleFiles = () => {
    setToggleSelection((currentState) => !currentState);

    registeredItems.map((file) => file?.setIsChecked(toggleSelection));
  };

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
            {files.items.length === 0 ? renderEmptyPanel : renderFilePanel}
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
              hasRegisteredItems
                ? "Click this button to permanently delete the selected files."
                : "You must check at least one file in order to clean the bin."
            }
            isDisabled={!hasRegisteredItems}
            onClick={() =>
              alert(
                `A POST request will be sent to the server to delete the following files: ${JSON.stringify(
                  registeredItems
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
