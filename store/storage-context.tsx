// this context provides access of drive storage information for all the components inside LayoutDrive.
// Only created in final stages of building this app, this context is useful as updates the pie chart in
// the dashboard whenever there is a new update.

import {
  createContext,
  useContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type StorageInfoType = {
  freeSpace: number;
  usedSpace: number;
};

interface StorageInterface {
  driveInformation: StorageInfoType;
  setDriveInformation: Dispatch<SetStateAction<StorageInfoType>>;
}

const StorageContext = createContext<StorageInterface>({
  driveInformation: {
    freeSpace: 0,
    usedSpace: 0,
  },
  setDriveInformation: (state) => {},
});

const StorageProvider: FC = ({ children }) => {
  const [driveInformation, setDriveInformation] = useState({
    freeSpace: 0,
    usedSpace: 0,
  });

  return (
    <StorageContext.Provider
      value={{
        driveInformation,
        setDriveInformation,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;

export const useStorage = () => useContext(StorageContext);
