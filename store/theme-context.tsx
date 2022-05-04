import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useHttp from "hooks/use-http";

interface ThemeInterface {
  readonly isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeInterface>({
  isDark: false,
  setIsDark: (state) => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchData = async () => {
      const response = await sendRequest({ url: "/api/users/" });

      if (!response) {
        return setIsDark(false);
      }

      const { isThemeDark } = response;

      if (isThemeDark !== isDark) {
        setIsDark(isThemeDark);
      }
    };

    fetchData();
  }, [isDark, sendRequest]);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#28282B";
      document.body.style.color = "#FFFFFF";

      return;
    }

    document.body.style.backgroundColor = "#FFFFFF";
    document.body.style.color = "#000000";
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
