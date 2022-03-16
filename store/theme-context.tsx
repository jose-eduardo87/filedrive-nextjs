import {
  FC,
  MouseEventHandler,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeInterface {
  isDark: boolean;
  toggleTheme: MouseEventHandler<HTMLButtonElement>;
}

const ThemeContext = createContext<ThemeInterface>({
  isDark: false,
  toggleTheme: () => {},
});

const ThemeProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => setIsDark((currentState) => !currentState);

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#000000";
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
