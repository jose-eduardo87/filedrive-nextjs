import { FC, createContext, useContext, useEffect, useState } from "react";

interface ThemeInterface {
  readonly isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeInterface>({
  isDark: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => setIsDark((currentState) => !currentState);

  useEffect(() => {
    // FETCH PROCESS TO GET USER'S THEMING PREFERENCE, LET'S FAKE IT UNTIL WE HAVE A WORKING BACKEND:
    const isDarkFromBackend = false;

    setIsDark(isDarkFromBackend);
  }, []);

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
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
