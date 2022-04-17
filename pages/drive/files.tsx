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
import prisma from "lib/prisma";
import { Card } from "@/components/ui";
import { FileManager } from "@/components/FileManager";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";
import { useRouter } from "next/router";

export interface FileInterface {
  id: string;
  fileName: string;
  size: number;
  url: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  resetServerContext(); // required to render drag and drop functionality correctly

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

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      files: {
        select: {
          fileName: true,
          id: true,
          location: true,
          size: true,
        },
      },
    },
  });

  const filesInDrive: typeof user.files = [];
  const filesInTrash: typeof user.files = [];

  // check if file is in drive or trash and push it to the correct array.
  user?.files.forEach((file) => {
    file.location === "DRIVE"
      ? filesInDrive.push(file)
      : filesInTrash.push(file);
  });

  return {
    props: {
      filesInDrive,
      filesInTrash,
      ...(await serverSideTranslations(locale!, ["common", "bin"])),
    },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  filesInDrive,
  filesInTrash,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>
          {locale === "en" ? "File Manager" : "Gerenciador de Arquivos"}
        </title>
        <meta
          title="description"
          content="File Manager. Move your files from the drive to the bin and vice-versa. Delete them permanently or maybe download them. You are on the control."
        />
      </Head>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {locale === "en" ? "Manage your files." : "Gerencie seus arquivos."}
      </h1>

      <Card>
        <FileManager filesInDrive={filesInDrive} filesInTrash={filesInTrash} />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
