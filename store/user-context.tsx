import { createContext, FC, useState, useContext, Dispatch } from "react";

interface UserInterface {
  name: string;
  profileImgSrc: string;
}

interface UserContextInterface {
  user: UserInterface;
  setUser: Dispatch<UserInterface>;
}

const UserContext = createContext<Partial<UserContextInterface>>({});

const UserProvider: FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState<UserInterface>({
    name: "",
    profileImgSrc: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserInfo = () => useContext(UserContext);
