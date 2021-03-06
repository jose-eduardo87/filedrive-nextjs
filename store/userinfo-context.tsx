// this context provides access of userName, profileImage and language states to all the components inside LayoutDrive.
// By providing access to the mentioned states, every time there is a update to the server the changes will be reflected
// instantly on the app.

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
  profileImage: string;
  language: string;
  setUserName: Dispatch<SetStateAction<string>>;
  setProfileImage: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const UserInfoContext = createContext<InfoInterface>({
  userName: "",
  profileImage: "",
  language: "",
  setUserName: (state) => {},
  setProfileImage: (state) => {},
  setLanguage: (state) => {},
});

const UserInfoProvider: FC = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_AVATAR);

  return (
    <UserInfoContext.Provider
      value={{
        userName,
        profileImage,
        language,
        setUserName,
        setProfileImage,
        setLanguage,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;

export const useUserInfo = () => useContext(UserInfoContext);
