import { FC, Dispatch, SetStateAction, useState, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Files } from "@/components/Files";
// import { File, Trash } from "@/components/Icons";
import { FileInterface } from "pages/drive/files";

// https://www.youtube.com/watch?v=Vqa9NMzF3wc&ab_channel=LogRocket

import styles from "./FileManager.module.css";

interface FMProps {
  files: FileInterface[];
  trash: FileInterface[];
}

enum Key {
  DRIVE = "list-drive",
  TRASH = "list-trash",
}

export interface FileInListInterface {
  name: "drive" | "trash";
  items: FileInterface[];
}

type DndType = {
  [key in Key]: FileInListInterface;
};

const onDragEnd = (
  result: DropResult,
  list: DndType,
  setList: Dispatch<SetStateAction<DndType>>
) => {
  const { source, destination } = result;

  if (!destination) {
    return;
  }
  if (source.droppableId !== destination.droppableId) {
    const sourceId: keyof DndType = source.droppableId as Key;
    const destinationId: keyof DndType = destination.droppableId as Key;
    const sourceList = list[sourceId];
    const destinationList = list[destinationId];
    const sourceItems = [...sourceList.items];
    const destinationItems = [...destinationList.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    setList({
      ...list,
      [source.droppableId]: { ...sourceList, items: sourceItems },
      [destination.droppableId]: {
        ...destinationList,
        items: destinationItems,
      },
    });
  }
  // else {
  //   const listStart = list[source.droppableId];
  //   const copiedItems = [...listStart.items];
  //   const [removed] = copiedItems.splice(source.index, 1);
  //   copiedItems.splice(destination.index, 0, removed);

  //   setList({
  //     ...list,
  //     [source.droppableId]: {
  //       ...listStart,
  //       items: copiedItems,
  //     },
  //   });
  // }
};

const FileManager: FC<FMProps> = ({ files, trash }) => {
  // const filesIdArray = Object.values(files).map((file) => file.id);
  // const trashIdArray = Object.values(trash).map((file) => file.id);
  const columns: DndType = {
    [Key.DRIVE]: {
      name: "drive",
      items: files,
    },
    [Key.TRASH]: {
      name: "trash",
      items: trash,
    },
  };
  const [list, setList] = useState<DndType>(columns);

  return (
    <section className={styles.root}>
      <DragDropContext
        onDragEnd={useCallback(
          (result) => onDragEnd(result, list, setList),
          [list]
        )}
      >
        {Object.entries(list).map(([columnId, column], index) => (
          <div key={columnId}>
            <Files id={columnId} files={column} />
          </div>
        ))}
      </DragDropContext>
    </section>
  );
};

export default FileManager;
