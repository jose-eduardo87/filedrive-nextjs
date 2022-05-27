import { FC, Dispatch, SetStateAction, useState, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import FileProvider from "store/file-context";
import { Files } from "@/components/Files";
import { PopupMessage } from "@/components/ui";
import { useHttp } from "@/hooks/index";
import { Important, Error } from "@/components/Icons";
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

export type DndType = {
  [key in Key]: FileInListInterface;
};

const FileManager: FC<FMProps> = ({ filesInDrive, filesInTrash }) => {
  const { error, showError, isLoading, sendRequest } = useHttp();
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

      const response = await sendRequest({
        url: "/api/files/change-location",
        method: "PATCH",
        body: { id: fileID, location },
        headers: { "Content-Type": "application/json" },
      });

      return response ? true : undefined;
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
        const response = await updateFileLocation(
          removed.id,
          destination.droppableId
        );

        if (!response) {
          return; // if there is no response it means that some asynchronous error happened, execution stops here and no files will be moved.
        }

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
      {isLoading && (
        <PopupMessage
          type="loading"
          message="Moving file..."
          SVG={<Important fill="#6A23AD" />}
        />
      )}
      {showError && (
        <PopupMessage
          type="error"
          message={error!}
          SVG={<Error fill="#7C4343" />}
        />
      )}
      <DragDropContext onDragEnd={(result) => onDragEnd(result, list, setList)}>
        <FileProvider
          itemsDrive={list["list-drive"].items}
          itemsTrash={list["list-trash"].items}
          dispatch={setList}
        >
          {Object.entries(list).map(([columnId, column]) => (
            <div key={columnId}>
              <Files id={columnId} location={column.name} />
            </div>
          ))}
        </FileProvider>
      </DragDropContext>
    </section>
  );
};

export default FileManager;
