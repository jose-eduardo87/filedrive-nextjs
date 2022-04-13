import { FC } from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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

  return {
    props: {
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
} = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";

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
        {locale === "en" ? "Settings" : "Configurações"}
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
        <SettingsForm />
        <SettingsOptions />
      </Card>
    </>
  );
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
