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
