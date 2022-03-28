import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import UserProvider from "store/user-context";
import ThemeProvider from "store/theme-context";
import LanguageProvider from "store/language-context";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: { Layout?: FC; LayoutDrive?: FC };
}) {
  const Layout = Component.Layout ?? Component.LayoutDrive ?? Noop;

  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
