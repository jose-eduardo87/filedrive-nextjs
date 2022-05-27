import { FC, useState, useEffect } from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { file, user } from "@/models/index";
import { useTheme } from "store/theme-context";
import { useUserInfo } from "store/userinfo-context";
import { useFilesInfo } from "store/filesinfo-context";
import { FileUploader } from "@/components/FileUploader";
import { LayoutDrive } from "@/components/common";
import { Card, Grid, Slider } from "@/components/ui";
import { getLocale, getHeadingStyles, getCardStyles } from "helpers/functions";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // protected page. In case an unauthenticated user tries to access this page, they will be redirected to the home page.

  // in a perfect world, I would transform this entire piece of code in a middleware, but due to some reasons (getSession needs
  // req to be of the type IncomingMessage and _middleware.ts has access to req of the type NextRequest), there's not much I
  // can do about this. Also tried to use Next-auth's own middleware, but currently it only supports JWT session.
  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const loggedUser = await user.login(session!.user.id);
  const sortedFiles = await file.sortBySize(session!.user.id);
  const { files, getAvailableSpace, image, language, name, theme } = loggedUser;

  // getAvailableSpace is a method only available to logged in users. It calculates the available space in the storage.
  const driveSpaceInfo = getAvailableSpace(
    files.filter(({ location }) => location === "DRIVE")
  );
  const trashSpaceInfo = getAvailableSpace(
    files.filter(({ location }) => location === "TRASH")
  );

  return {
    props: {
      name,
      image,
      language,
      isDarkTheme: theme === "DARK" ? true : false,
      sortedFiles,
      driveSpaceInfo,
      trashSpaceInfo,
      ...(await serverSideTranslations(getLocale(language!), [
        "common",
        "fileuploader",
      ])),
    },
  };
};

const MainPage: NextPage & {
  LayoutDrive: FC;
} = ({
  name,
  image,
  language,
  isDarkTheme,
  sortedFiles,
  driveSpaceInfo,
  trashSpaceInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isMounted, setIsMounted] = useState(false);
  const isEnglish = language === "en";
  const { toggleTheme } = useTheme();
  const { setUserName, setProfileImage, setLanguage } = useUserInfo();
  const {
    driveInformation,
    topFiveBiggestFiles,
    setDriveInformation,
    setTopFiveBiggestFiles,
  } = useFilesInfo();

  // this useEffect will only run when user first sees this page. It will update the states inside the if check. This is especially useful as it avoids
  // unnecessary re-rendering of page because of state updates.
  useEffect(
    () => {
      if (!isMounted) {
        toggleTheme(isDarkTheme);
        setUserName(name);
        setProfileImage(image);
        setDriveInformation(driveSpaceInfo);
        setLanguage(language === "ptBR" ? "pt-BR" : "en");
        setTopFiveBiggestFiles(sortedFiles);
      }

      return () => setIsMounted(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log("index");

  const sliderStorageChart = [
    {
      type: "Pie",
      title: isEnglish ? "Drive Information" : "Informação do Drive",
      freeSpace: +(driveInformation.freeSpace * 0.00000095367432).toFixed(2), // values converted from bytes to Mb.
      usedSpace: +(driveInformation.usedSpace * 0.00000095367432).toFixed(2),
    },
    {
      type: "Doughnut",
      title: isEnglish ? "Trash Information" : "Informação da Lixeira",
      freeSpace: +(trashSpaceInfo.freeSpace * 0.00000095367432).toFixed(2),
      usedSpace: +(trashSpaceInfo.usedSpace * 0.00000095367432).toFixed(2),
    },
  ];
  const sliderFileChart = [
    {
      type: "PolarArea",
      title: isEnglish ? "Top-five biggest files" : "Top-5 maiores arquivos",
      files: topFiveBiggestFiles.slice(0, 5),
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta
          name="description"
          content="Capybara Dashboard. Upload your files here, have access to your drive/bin information in one place!"
        />
      </Head>
      <h1 style={getHeadingStyles()}>
        {isEnglish
          ? "Welcome to your Dashboard."
          : "Bem-vindo ao seu Dashboard."}
      </h1>
      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card
          style={{
            width: "400px",
            ...getCardStyles(isDarkTheme),
          }}
        >
          <Slider
            chartInfo={sliderStorageChart}
            axis="horizontal"
            chartType="storage"
          />
        </Card>
        <Card style={getCardStyles(isDarkTheme)}>
          <FileUploader />
        </Card>
        <Card style={{ width: "400px", ...getCardStyles(isDarkTheme) }}>
          <Slider
            chartInfo={sliderFileChart}
            axis="vertical"
            chartType="file"
          />
        </Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
