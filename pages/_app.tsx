import { FC } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

const Noop: FC = ({ children }) => <>{children}</>;

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: { Layout?: FC; LayoutDrive?: FC };
}) {
  const Layout = Component.Layout ?? Component.LayoutDrive ?? Noop;

  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <title>Capybara Drive - Your files, everywhere!</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
