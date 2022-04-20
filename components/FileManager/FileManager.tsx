import { FC, Dispatch, SetStateAction, useState, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Files } from "@/components/Files";
import useHttp from "hooks/use-http";
import { FileInterface } from "pages/drive/files";

import styles from "./FileManager.module.css";

interface FMProps {
  filesInDrive: FileInterface[];
  filesInTrash: FileInterface[];
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

const FileManager: FC<FMProps> = ({ filesInDrive, filesInTrash }) => {
  const { error, isLoading, sendRequest } = useHttp();
  const columns: DndType = {
    [Key.DRIVE]: {
      name: "drive",
      items: filesInDrive,
    },
    [Key.TRASH]: {
      name: "trash",
      items: filesInTrash,
    },
  };
  const [list, setList] = useState<DndType>(columns);

  const updateFileLocation = useCallback(
    async (fileID: string, locationID: string) => {
      const [, location] = locationID.split("-");

      await sendRequest({
        url: "/api/files/changeLocation",
        method: "PATCH",
        body: { id: fileID, location },
        headers: { "Content-Type": "application/json" },
      });
    },
    [sendRequest]
  );

  const onDragEnd = useCallback(
    async (
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

        await updateFileLocation(removed.id, destination.droppableId);

        setList({
          ...list,
          [source.droppableId]: { ...sourceList, items: sourceItems },
          [destination.droppableId]: {
            ...destinationList,
            items: destinationItems,
          },
        });
      }
    },
    [updateFileLocation]
  );

  return (
    <section className={styles.root}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, list, setList)}>
        {Object.entries(list).map(([columnId, column]) => (
          <div key={columnId}>
            <Files id={columnId} files={column} />
          </div>
        ))}
      </DragDropContext>
    </section>
  );
};

export default FileManager;
