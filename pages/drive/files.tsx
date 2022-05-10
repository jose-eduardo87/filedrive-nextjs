import { FC } from "react";
import Head from "next/head";
import {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resetServerContext } from "react-beautiful-dnd";
import user from "models/User";
import { Card } from "@/components/ui";
import { FileManager } from "@/components/FileManager";
import { LayoutDrive } from "@/components/common";
import { useInterface } from "store/interface-context";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";
import { useRouter } from "next/router";
import { useTheme } from "store/theme-context";

export interface FileInterface {
  id: string;
  key: string;
  fileName: string;
  size: number;
  url: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
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
  const { files, image, name, theme } = loggedUser!;
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
      isDarkTheme: theme === "DARK" ? true : false,
      filesInDrive,
      filesInTrash,
      ...(await serverSideTranslations(locale!, ["common", "bin"])),
    },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  name,
  image,
  isDarkTheme,
  filesInDrive,
  filesInTrash,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { setUserName, setProfileImage } = useInterface();
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
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {isEnglish ? "Manage your files." : "Gerencie seus arquivos."}
      </h1>

      <Card>
        <FileManager filesInDrive={filesInDrive} filesInTrash={filesInTrash} />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
