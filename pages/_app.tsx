import { FC } from "react";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react"
import ThemeProvider from "store/theme-context";

import "../styles/globals.css";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps & {
  Component: { Layout?: FC; LayoutDrive?: FC };
}) {
  const Layout = Component.Layout ?? Component.LayoutDrive ?? Noop;

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
