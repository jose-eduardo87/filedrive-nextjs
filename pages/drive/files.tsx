import { FC } from "react";
import Head from "next/head";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resetServerContext } from "react-beautiful-dnd";
import user from "models/User";
import { useTheme } from "store/theme-context";
import { useUserInfo } from "store/userinfo-context";
import { FileManager } from "@/components/FileManager";
import { Card } from "@/components/ui";
import { LayoutDrive } from "@/components/common";
import { getLocale, getHeadingStyles, getCardStyles } from "helpers/functions";

export interface FileInterface {
  id: string;
  key: string;
  fileName: string;
  size: number;
  url: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  resetServerContext(); // required to render drag and drop functionality correctly on server side.

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

  const loggedUser = await user.login(session?.user.id);
  const { files, image, language, name, theme } = loggedUser!;
  const filesInDrive: typeof files = [];
  const filesInTrash: typeof files = [];

  // check file location and push it to the correct array.
  files.forEach((file) => {
    file.location === "DRIVE"
      ? filesInDrive.push(file)
      : filesInTrash.push(file);
  });

  return {
    props: {
      image,
      name,
      language,
      isDarkTheme: theme === "DARK" ? true : false,
      filesInDrive,
      filesInTrash,
      ...(await serverSideTranslations(getLocale(language!), [
        "common",
        "bin",
      ])),
    },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  name,
  image,
  language,
  isDarkTheme,
  filesInDrive,
  filesInTrash,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const isEnglish = language === "en";
  const { setUserName, setProfileImage } = useUserInfo();
  const { toggleTheme } = useTheme();

  setUserName(name);
  setProfileImage(image);
  toggleTheme(isDarkTheme);

  return (
    <>
      <Head>
        <title>{isEnglish ? "File Manager" : "Gerenciador de Arquivos"}</title>
        <meta
          title="description"
          content="File Manager. Move your files from the drive to the bin and vice-versa. Delete them permanently or maybe download them. You are on the control."
        />
      </Head>
      <h1 style={getHeadingStyles()}>
        {isEnglish ? "Manage your files." : "Gerencie seus arquivos."}
      </h1>

      <Card style={getCardStyles(isDarkTheme)}>
        <FileManager filesInDrive={filesInDrive} filesInTrash={filesInTrash} />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
