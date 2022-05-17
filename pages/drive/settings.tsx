import { FC, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import user from "models/User";
import { useTheme } from "store/theme-context";
import { useInterface } from "store/interface-context";
import { BasicSettings } from "@/components/BasicSettings";
import { PreferenceSettings } from "@/components/PreferenceSettings";
import { LayoutDrive } from "@/components/common";
import { Card } from "@/components/ui";
import { getHeadingStyles } from "helpers/functions";
import { getCardStyles } from "helpers/functions";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const session = await getSession({ req });

  // protected page. In case an unauthenticated user tries to access this page, they will be redirected to the home page.
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const loggedUser = await user.login(session.user.id);
  const { image, name, theme } = loggedUser;

  return {
    props: {
      name,
      image,
      isDark: theme === "DARK" ? true : false,
      ...(await serverSideTranslations(locale!, [
        "common",
        "basicsettings",
        "preferencesettings",
      ])),
    },
  };
};

const Settings: NextPage & {
  LayoutDrive: FC;
} = ({
  name,
  image,
  isDark,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isMounted, setIsMounted] = useState(false);
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { setUserName, setProfileImage } = useInterface();
  const { isDark: isDarkTheme, toggleTheme } = useTheme();

  // this useEffect is required because if user switches theme this page will rerender and
  // thus running toggleTheme with outdated 'isDark' property coming from props. By letting
  // toggleTheme to be applied once, we avoid unnecessary updates to isDark property in
  // theme-context.
  useEffect(() => {
    if (!isMounted) {
      toggleTheme(isDark);
      setUserName(name);
      setProfileImage(image);
    }

    return () => setIsMounted(true);
  }, [
    image,
    isDark,
    isMounted,
    name,
    setProfileImage,
    setUserName,
    toggleTheme,
  ]);

  return (
    <>
      <Head>
        <title>{isEnglish ? "Settings" : "Configurações"}</title>
        <meta
          name="description"
          content="Manage your user account preferences. Change theme or language. Cancel your account."
        />
      </Head>
      <h1 style={getHeadingStyles()}>
        {isEnglish ? "Settings" : "Configurações"}
      </h1>

      <Card
        style={{
          height: "500px",
          width: "70%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
          ...getCardStyles(isDarkTheme),
        }}
      >
        <BasicSettings />
        <PreferenceSettings />
      </Card>
    </>
  );
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
