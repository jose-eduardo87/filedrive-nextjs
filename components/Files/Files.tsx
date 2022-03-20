import { FC, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { File } from "@/components/File";
import { Button } from "@/components/ui";
import { Filedrive, Trash } from "@/components/Icons";
import { FileInListInterface } from "../FileManager/FileManager";
import { HEADING_STYLE_IN_FILES, ICON_STYLE_IN_FILES } from "helpers/constants";

import styles from "./Files.module.css";

// COMPONENT GOT TOO BIG, SPLIT IT IN TWO: DRIVE AND BIN

const Files: FC<{ files: FileInListInterface; id: string }> = ({
  files,
  id,
}) => {
  const [checkedItems, setCheckedItems] = useState<Partial<{ id: string }[]>>(
    []
  );
  const [toggleSelection, setToggleSelection] = useState(false);
  const hasFilesInTrash = files.items.length > 0;
  const hasCheckedItems = checkedItems.length > 0;

  const renderHeading =
    files.name === "drive" ? (
      <h2 style={{ ...HEADING_STYLE_IN_FILES }}>
        <Filedrive {...ICON_STYLE_IN_FILES} /> Filedrive
      </h2>
    ) : (
      <h2 style={{ ...HEADING_STYLE_IN_FILES }}>
        <Trash {...ICON_STYLE_IN_FILES} /> Trash
      </h2>
    );

  const renderEmptyPanel = (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    >
      <p style={{ textAlign: "center", color: "#A1A1A1" }}>
        {files.name === "drive"
          ? "Empty drive."
          : "Clean bin, congratulations!"}
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
          onChangeHandler={files.name === "trash" ? onChangeInputHandler : null}
        />
      )}
    </Draggable>
  ));

  const onChangeInputHandler = (id: string, isChecked: boolean) => {
    if (!isChecked) {
      return setCheckedItems(checkedItems!.filter((item) => item!.id !== id));
    }

    if (checkedItems.length === 0) {
      return setCheckedItems([{ id }]);
    }

    setCheckedItems((currentState) => [...currentState!, { id }]);
  };

  const toggleCheckAllFilesHandler = () => {
    setToggleSelection((currentState) => !currentState);

    const filesInTrashArray = files.items.map((file) => {
      return { id: file.id };
    });

    // !toggleSelection &&
  };

  console.log(checkedItems);

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          {renderHeading}
          <ul
            ref={provided.innerRef}
            className={styles.root}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#ebfced" : "",
              border: snapshot.isDraggingOver ? "2px dotted #CECECE" : "",
            }}
            {...provided.droppableProps}
          >
            {files.items.length === 0 ? renderEmptyPanel : renderFilePanel}
            {provided.placeholder}
          </ul>

          {files.name === "trash" && (
            <>
              <Button
                title={
                  hasFilesInTrash
                    ? "Click this button to check all the files in the bin."
                    : "The bin is empty."
                }
                isDisabled={!hasFilesInTrash}
                onClick={toggleCheckAllFilesHandler}
                style={{
                  width: "15%",
                  backgroundColor: "#F2D2BD",
                  color: "#B3B3B3",
                  border: "none",
                }}
              >
                Click
              </Button>
              <Button
                title={
                  hasCheckedItems
                    ? "Click this button to permanently delete the selected files."
                    : "You must check at least one file in order to clean the bin."
                }
                isDisabled={!hasCheckedItems}
                onClick={() =>
                  alert(
                    `A POST request will be sent to the server to delete the following files: ${JSON.stringify(
                      checkedItems
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
        </>
      )}
    </Droppable>
  );
};

export default Files;
