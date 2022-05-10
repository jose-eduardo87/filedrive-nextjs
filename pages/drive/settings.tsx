import { FC, useState, useEffect } from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import user from "models/User";
import { useInterface } from "store/interface-context";
import { useTheme } from "store/theme-context";
import { Card } from "@/components/ui";
import { SettingsForm } from "@/components/SettingsForm";
import { SettingsOptions } from "@/components/SettingsOptions";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

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
      isAccountFromGoogle: loggedUser.password === null,
      ...(await serverSideTranslations(locale!, [
        "common",
        "settingsform",
        "settingsoptions",
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
  isAccountFromGoogle,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [, setIsMounted] = useState(false);
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { setUserName, setProfileImage } = useInterface();
  const { toggleTheme } = useTheme();

  // this useEffect is required because if user switches theme this page will rerender and
  // thus running toggleTheme with outdated 'isDark' property coming from props. By letting
  // toggleTheme to be applied once, we avoid unnecessary updates to isDark property in
  // theme-context.
  useEffect(() => {
    toggleTheme(isDark);
    setUserName(name);
    setProfileImage(image);

    return () => setIsMounted(true);
  }, [image, isDark, name, setProfileImage, setUserName, toggleTheme]);

  return (
    <>
      <Head>
        <title>{isEnglish ? "Settings" : "Configurações"}</title>
        <meta
          name="description"
          content="Manage your user account preferences. Change theme or language. Cancel your account."
        />
      </Head>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {isEnglish ? "Settings" : "Configurações"}
      </h1>

      <Card
        style={{
          height: "500px",
          width: "70%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SettingsForm isAccountFromGoogle={isAccountFromGoogle} />
        <SettingsOptions />
      </Card>
    </>
  );
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
