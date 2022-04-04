import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react"
import UserProvider from "store/user-context";
import ThemeProvider from "store/theme-context";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps: {session, ...pageProps},
}: AppProps & {
  Component: { Layout?: FC; LayoutDrive?: FC };
}) {
  const Layout = Component.Layout ?? Component.LayoutDrive ?? Noop;

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
    <UserProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </UserProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
