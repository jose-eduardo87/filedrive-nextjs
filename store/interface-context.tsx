import {
  createContext,
  useContext,
  FC,
  useEffect,
  useState,
  useReducer,
  Dispatch,
  SetStateAction,
} from "react";

interface Interface {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  profileImage: string | null;
  setProfileImage: Dispatch<SetStateAction<string | null>>;
}

const InterfaceContext = createContext<Interface>({
  userName: "",
  setUserName: (state) => {},
  profileImage: "",
  setProfileImage: (state) => {},
  //   driveSpaceFree: 0,
  //   driveSpaceUsed: 0,
  //   trashSpaceFree: 0,
  //   trashSpaceUsed: 0,
});

interface State {
  drive: {
    freeSpace: number;
    usedSpace: number;
  };
  trash: {
    freeSpace: number;
    usedSpace: number;
  };
}

interface Action {
  type: "CHANGE_VALUE";
  value: number;
}

const initialValue = {
  drive: {
    freeSpace: 0,
    usedSpace: 0,
  },
  trash: {
    freeSpace: 0,
    usedSpace: 0,
  },
};

// const storageReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "CHANGE_VALUE":
//       return {};
//   }
// };

const InterfaceProvider: FC = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  //   const [storage, dispatch] = useReducer(storageReducer, initialValue);

  return (
    <InterfaceContext.Provider
      value={{ userName, setUserName, profileImage, setProfileImage }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;

export const useInterface = () => useContext(InterfaceContext);
