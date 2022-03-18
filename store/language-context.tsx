import { FC, createContext, useContext, useEffect, useState } from "react";

interface LanguageContextInterface {
  language: "EN" | "PTBR";
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextInterface>({
  language: "EN",
  toggleLanguage: () => {},
});

const LanguageProvider: FC = ({ children }) => {
  const [isEnglish, setIsEnglish] = useState<boolean>();

  useEffect(() => {
    const languageFromBackend = "PTBR";

    setIsEnglish(languageFromBackend === "EN" ? true : false); // CHECAR ESSE ERRO
  }, []);

  const toggleLanguage = () => setIsEnglish((currentState) => !currentState);

  return (
    <LanguageContext.Provider
      value={{ language: isEnglish ? "EN" : "PTBR", toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

export const useLanguageSelector = () => useContext(LanguageContext);
