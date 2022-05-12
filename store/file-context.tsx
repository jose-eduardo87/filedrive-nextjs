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
  onDeleteFiles: (IDList) => {},
});

const FileProvider: FC<{
  itemsDrive: FileInterface[];
  itemsTrash: FileInterface[];
  dispatch: Dispatch<SetStateAction<DndType>>; // will receive setList, responsible for list's state manipulation in FileManager
}> = ({ itemsDrive, itemsTrash, dispatch, children }) => {
  const onDeleteFiles = (IDList: string[]) => {
    dispatch((currentState) => {
      // removes deleted files from DOM by filtering their IDs
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

// ================================ ABOUT THIS CONTEXT ================================ //

// Before creating this context, files were passed to Drive and Bin via props.
// Everything worked well, including drag and drop functionality. I, however, faced a problem
// when I started implementing file deletion: when DELETE response was successfull, I wanted the
// deleted files to disappear from the Trash panel. I initially tried some hacky stuff,
// like cloning the prop files inside Bin and then manipulating the state. Even though
// it somehow worked, the said "solution" bled my eyes everytime I had to look at the
// code. It just looked so ugly having that 'filesCopy' staring at me. So, in order to make
// the code work the right way, I created this context. It shares files data for both Drive
// and Bin components. FileProvider receives three piece of information - the itemsDrive
// and itemsTrash array (the actual files) and a dispatch function. The former two are just
// passed to the value property in FileContext.Provider and the latter is used in
// onDeletedFiles, also exposed in Provider, to filter out the deleted files.

// A much better and cleaner solution that made me spent much less time compared to when I
// was figuring out hacky ways to overcome this situation.
