import { FC } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "store/theme-context";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: { Layout?: FC; LayoutDrive?: FC };
}) {
  const Layout = Component.Layout ?? Component.LayoutDrive ?? Noop;

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
