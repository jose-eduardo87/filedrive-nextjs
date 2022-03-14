import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { File } from "@/components/File";
import { FileInterface } from "@/components/FileManager/FileManager";

import styles from "./Files.module.css";

const Files: FC<{ files: FileInterface[]; id: string }> = ({ files, id }) => {
  return (
    <Droppable droppableId={`list-${id}`}>
      {(provided, snapshot) => (
        <ul
          ref={provided.innerRef}
          className={styles.root}
          {...provided.droppableProps}
        >
          {files.map((file, index) => (
            <Draggable key={file.id} draggableId={file.id} index={index}>
              {(provided, snapshot) => <File provided={provided} file={file} />}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default Files;
