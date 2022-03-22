import { Dispatch, SetStateAction, useCallback, useState } from "react";

const useControlledInput = () => {
  const [toggleSelection, setToggleSelection] = useState(!false);
  const [registeredFiles, setRegisteredFiles] = useState<
    Partial<
      {
        id: string;
        isChecked: boolean;
        setIsChecked: Dispatch<SetStateAction<boolean>>;
      }[]
    >
  >([]);

  const onToggleFiles = () => {
    setToggleSelection((currentState) => !currentState);

    registeredFiles.map((file) => file!.setIsChecked(toggleSelection));
  };

  // FUNCTION RESPONSIBLE TO REGISTER ALL THE INFORMATION REGARDING FILES LIVING IN Bin.tsx.
  // BY ARCHITECTURING THIS WAY, BIN WILL CONTROL ITS CHILDREN (File.tsx) STATE, MAKING IT
  // REALLY SIMPLE DOING STATE CHANGES (eg: onToggleFiles() TO TOGGLE ON/OFF INPUT SELECTION).
  const registerFile = useCallback(
    (
      id: string,
      isChecked: boolean,
      setIsChecked: Dispatch<SetStateAction<boolean>>
    ) => {
      const index = registeredFiles.findIndex((item) => item?.id === id);

      if (index < 0) {
        setRegisteredFiles((currentState) => [
          ...currentState,
          { id, isChecked, setIsChecked },
        ]);

        return;
      }

      const updatedFiles = [...registeredFiles];
      updatedFiles[index] = { id, isChecked, setIsChecked };

      setRegisteredFiles(updatedFiles);
    },
    [registeredFiles]
  );

  const FileCleanup = useCallback(
    (id: string) => {
      const filteredRegisteredFiles = registeredFiles.filter(
        (file) => file!.id !== id
      );

      setRegisteredFiles(filteredRegisteredFiles);
    },
    [registeredFiles]
  );

  return { registeredFiles, onToggleFiles, registerFile, FileCleanup };
};

export default useControlledInput;
