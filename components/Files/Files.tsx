import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { File } from "@/components/File";
import { Filedrive, Trash } from "@/components/Icons";
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

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          {renderHeading}
          <ul
            ref={provided.innerRef}
            className={styles.root}
            {...provided.droppableProps}
          >
            {files.items.map((file, index) => (
              <Draggable key={file.id} draggableId={file.id} index={index}>
                {(provided, snapshot) => (
                  <File draggableConfig={{ provided, snapshot }} file={file} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        </>
      )}
    </Droppable>
  );
};

export default Files;
