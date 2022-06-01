// this context provides access to drive storage and the top-five biggest files information for all the components inside LayoutDrive.
// Only created in final stages of building this app, this context is useful as updates the charts in the dashboard whenever
// there is a new update.

import {
  createContext,
  useContext,
  FC,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

type StorageInfoType = {
  freeSpace: number;
  usedSpace: number;
};

type SortedFilesType = { fileName: string; size: number };

interface FilesInfoInterface {
  driveInformation: StorageInfoType;
  topFiveBiggestFiles: SortedFilesType[];
  setDriveInformation: Dispatch<SetStateAction<StorageInfoType>>;
  setTopFiveBiggestFiles: Dispatch<SetStateAction<SortedFilesType[]>>;
}

const FilesInfoContext = createContext<FilesInfoInterface>({
  driveInformation: {
    freeSpace: 0,
    usedSpace: 0,
  },
  topFiveBiggestFiles: [{ fileName: "", size: 0 }],
  setDriveInformation: (state) => {},
  setTopFiveBiggestFiles: (state) => {},
});

const FilesInfoProvider: FC = ({ children }) => {
  const [driveInformation, setDriveInformation] = useState({
    freeSpace: 0,
    usedSpace: 0,
  });
  const [topFiveBiggestFiles, setTopFiveBiggestFiles] = useState([
    {
      fileName: "",
      size: 0,
    },
  ]);

  return (
    <FilesInfoContext.Provider
      value={{
        driveInformation,
        topFiveBiggestFiles,
        setDriveInformation: useCallback(
          (state) => setDriveInformation(state),
          []
        ),
        setTopFiveBiggestFiles: useCallback(
          (state) => setTopFiveBiggestFiles(state),
          []
        ),
      }}
    >
      {children}
    </FilesInfoContext.Provider>
  );
};

export default FilesInfoProvider;

export const useFilesInfo = () => useContext(FilesInfoContext);
