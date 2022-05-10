import { FC } from "react";
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
import { Grid, Card } from "@/components/ui";
import { Slider } from "@/components/ui";
import { FileUploader } from "@/components/FileUploader";
import { StorageInfo } from "@/components/StorageInfo";
import { LayoutDrive } from "@/components/common";
import { useInterface } from "store/interface-context";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

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
  const { files, image, name, theme, getAvailableSpace } = loggedUser;

  const driveSpaceInfo = getAvailableSpace(
    files.filter((file) => file.location === "DRIVE")
  );
  const trashSpaceInfo = loggedUser.getAvailableSpace(
    files.filter((file) => file.location === "TRASH")
  );

  return {
    props: {
      name,
      image,
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
  isDarkTheme,
  driveSpaceInfo,
  trashSpaceInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { toggleTheme } = useTheme();
  const { setUserName, setProfileImage } = useInterface();

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
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {isEnglish
          ? "Welcome to your Dashboard."
          : "Bem-vindo ao seu Dashboard."}
      </h1>

      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card style={{ width: "400px" }}>
          <Slider components={sliderComponents} />
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
