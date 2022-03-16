import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { File } from "@/components/File";
import { Filedrive, Empty, Trash } from "@/components/Icons";
import { FileInListInterface } from "../FileManager/FileManager";
import { HEADING_STYLE_IN_FILES, ICON_STYLE_IN_FILES } from "helpers/constants";

import styles from "./Files.module.css";

const Files: FC<{ files: FileInListInterface; id: string }> = ({
  files,
  id,
}) => {
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
      {(provided, snapshot) => (
        <File draggableConfig={{ provided, snapshot }} file={file} id={id} />
      )}
    </Draggable>
  ));

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          {renderHeading}
          <ul
            ref={provided.innerRef}
            className={styles.root}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#f3f3f3" : "",
              border: snapshot.isDraggingOver ? "3px dotted #CECECE" : "",
            }}
            {...provided.droppableProps}
          >
            {files.items.length === 0 ? renderEmptyPanel : renderFilePanel}

            {provided.placeholder}
          </ul>
        </>
      )}
    </Droppable>
  );
};

export default Files;
