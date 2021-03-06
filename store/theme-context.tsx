// this context provides access to the theme configuration to all the components inside of LayoutDrive.

import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

interface ThemeInterface {
  readonly isDark: boolean;
  toggleTheme: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeInterface>({
  isDark: false,
  toggleTheme: (state) => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = useCallback((state) => setIsDark(state), []);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#FFFFFF";

      return;
    }

    document.body.style.backgroundColor = "#EDEADE";
    document.body.style.color = "#000000";
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
