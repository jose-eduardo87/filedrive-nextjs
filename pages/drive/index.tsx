import { FC } from "react";
import { useRouter } from "next/router";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Grid, Card } from "@/components/ui";
import { Slider } from "@/components/ui";
import { FileUploader } from "@/components/FileUploader";
import { StorageInfo } from "@/components/StorageInfo";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

export const getServerSideProps: GetServerSideProps = async ({ req ,locale }) => {
  const session = await getSession({ req });

  // protected page. In case an unauthenticated user tries to access this page, they will be redirected to the home page.
  if(!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "fileuploader"])),
    },
  };
};

const MainPage: NextPage & {
  LayoutDrive: FC;
} = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter();
  const componentsArray = [
    {
      title: locale === "en" ? "Drive Information" : "Informação do Drive",
      Component: StorageInfo,
      freeSpace: 976,
      usedSpace: 48,
    },
    {
      title: locale === "en" ? "Trash Information" : "Informação da Lixeira",
      Component: StorageInfo,
      freeSpace: 480,
      usedSpace: 32,
    },
  ];

  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {locale === "en"
          ? "Welcome to your Dashboard."
          : "Bem-vindo ao seu Dashboard."}
      </h1>

      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card style={{ width: "400px" }}>
          <Slider components={componentsArray} />
        </Card>
        <Card>
          <FileUploader />
        </Card>
        <Card>
          <small style={{ textAlign: "center", color: "#000000" }}>Test</small>
        </Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
