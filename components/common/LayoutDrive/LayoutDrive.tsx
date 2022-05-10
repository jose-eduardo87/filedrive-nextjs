import { FC, useEffect, useState } from "react";
import Panel from "@/components/Panel";
import InterfaceProvider from "store/interface-context";
import ThemeProvider from "store/theme-context";
import useHttp from "hooks/use-http";

import styles from "../Layout/Layout.module.css";

const LayoutDrive: FC = ({ children }) => {
  // const [userTheme, setUserTheme] = useState<"DARK" | "CLEAR">("DARK");
  // const { sendRequest } = useHttp();

  // useEffect(() => {
  //   const fetchThemePreference = async () => {
  //     const response = await sendRequest({
  //       url: "/api/users/preferences/theme",
  //     });

  //     console.log(response);

  //     if (response.success) {
  //       setUserTheme(response.theme);
  //     }
  //   };

  //   fetchThemePreference();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log("theme", userTheme);

  return (
    <InterfaceProvider>
      <ThemeProvider>
        <div className={styles.layout}>
          <Panel>{children}</Panel>
        </div>
      </ThemeProvider>
    </InterfaceProvider>
  );
};

export default LayoutDrive;
