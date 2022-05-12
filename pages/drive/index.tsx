import { FC, useEffect } from "react";
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
import { FileUploader } from "@/components/FileUploader";
import { StorageInfo } from "@/components/StorageInfo";
import { LayoutDrive } from "@/components/common";
import { Card, Grid, Slider } from "@/components/ui";
import { getHeadingStyles, getCardStyles } from "helpers/functions";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
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
      driveSpaceInfo,
      trashSpaceInfo,
      ...(await serverSideTranslations(locale!, ["common", "fileuploader"])),
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
  driveSpaceInfo,
  trashSpaceInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const isEnglish = language === "en";
  const { toggleTheme } = useTheme();
  const { setUserName, setProfileImage } = useInterface();

  // changes to locale according to user's preference.
  useEffect(() => {
    router.replace(router.pathname, router.pathname, {
      locale: (language === "ptBR" && "pt-BR") || language,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  toggleTheme(isDarkTheme);
  setUserName(name);
  setProfileImage(image);

  const sliderComponents = [
    {
      title: isEnglish ? "Drive Information" : "Informação do Drive",
      Component: StorageInfo,
      freeSpace: driveSpaceInfo.freeSpace.toFixed(2),
      usedSpace: driveSpaceInfo.usedSpace.toFixed(2),
    },
    {
      title: isEnglish ? "Trash Information" : "Informação da Lixeira",
      Component: StorageInfo,
      freeSpace: trashSpaceInfo.freeSpace.toFixed(2),
      usedSpace: trashSpaceInfo.usedSpace.toFixed(2),
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
          <Slider components={sliderComponents} />
        </Card>
        <Card style={getCardStyles(isDarkTheme)}>
          <FileUploader />
        </Card>
        <Card style={getCardStyles(isDarkTheme)}>
          <small style={{ textAlign: "center" }}>Test</small>
        </Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
