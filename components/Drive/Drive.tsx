import { FC } from "react";
import { useRouter } from "next/router";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInDrive } from "@/components/File";
import { Filedrive } from "@/components/Icons"; // CHANGE THIS NAME?
import { FileInListInterface } from "../FileManager/FileManager";
import {
  HEADING_STYLE_IN_DRIVE_BIN,
  ICON_STYLE_IN_DRIVE_BIN,
} from "helpers/constants";

import styles from "../Files/Files.module.css";

const Drive: FC<{ files: FileInListInterface; id: string }> = ({
  files,
  id,
}) => {
  const { locale } = useRouter();
  const renderEmptyPanel = (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    >
      <p style={{ textAlign: "center", color: "#A1A1A1" }}>
        {locale === "en" ? "Empty drive." : "Drive vazio."}
      </p>
    </div>
  );

  const renderFilePanel = files.items.map((file, index) => (
    <Draggable key={file.id} draggableId={file.id} index={index}>
      {(provided) => <FileInDrive draggableConfig={{ provided }} file={file} />}
    </Draggable>
  ));
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          <h2 style={{ ...HEADING_STYLE_IN_DRIVE_BIN }}>
            <Filedrive {...ICON_STYLE_IN_DRIVE_BIN} /> Filedrive
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
        </>
      )}
    </Droppable>
  );
};

export default Drive;
