import {
  FC,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { DEFAULT_AVATAR } from "helpers/constants";

interface InfoInterface {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
}

const UserInfoContext = createContext<InfoInterface>({
  userName: "",
  profileImage: "",
  setUserName: (state) => {},
  setProfileImage: (state) => {},
});

const UserInfoProvider: FC = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_AVATAR);

  return (
    <UserInfoContext.Provider
      value={{
        userName,
        profileImage,
        setUserName,
        setProfileImage,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;

export const useUserInfo = () => useContext(UserInfoContext);
