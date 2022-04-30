import { FC, createContext, useContext, Dispatch, SetStateAction } from "react";
import { DndType } from "@/components/FileManager/FileManager";
import { FileInterface } from "pages/drive/files";

interface FileContextInterface {
  itemsDrive: FileInterface[];
  itemsTrash: FileInterface[];
  onDeleteFiles: (IDList: string[]) => void;
}

const FileContext = createContext<FileContextInterface>({
  itemsDrive: [{ fileName: "", id: "", key: "", size: 0, url: "" }],
  itemsTrash: [{ fileName: "", id: "", key: "", size: 0, url: "" }],
  onDeleteFiles: (IDList: string[]) => {},
});

const FileProvider: FC<{
  itemsDrive: FileInterface[];
  itemsTrash: FileInterface[];
  dispatch: Dispatch<SetStateAction<DndType>>;
}> = ({ itemsDrive, itemsTrash, dispatch, children }) => {
  const onDeleteFiles = (IDList: string[]) => {
    dispatch((currentState) => {
      const filteredTrashItems = currentState["list-trash"].items.filter(
        (file) => !IDList.includes(file.id)
      );

      return {
        ...currentState,
        "list-trash": { items: filteredTrashItems, name: "trash" },
      };
    });
  };

  return (
    <FileContext.Provider value={{ itemsDrive, itemsTrash, onDeleteFiles }}>
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;

export const useFile = () => useContext(FileContext);
