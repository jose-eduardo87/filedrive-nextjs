import { FC } from "react";
import {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { resetServerContext } from "react-beautiful-dnd";
import { Card } from "@/components/ui";
import { FileManager } from "@/components/FileManager";
import { LayoutDrive } from "@/components/common";
import { roundFileSizeToCorrectUnit } from "helpers/functions";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

export interface FileInterface {
  id: string;
  name: string;
  size: string;
  url: string;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  resetServerContext(); // required to render drag and drop functionality correctly

  const files: FileInterface[] = [
    {
      id: "file-01",
      name: "File 01.jpg",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-02",
      name: "File 02.jpeg",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-03",
      name: "File 03.pdf",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-04",
      name: "File 04.mkv",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-05",
      name: "File 05.mp4",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-06",
      name: "File 06.asaks",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
  ];
  const trash: FileInterface[] = [
    {
      id: "file-02a",
      name: "File 02.txt",
      size: roundFileSizeToCorrectUnit(235465),
      url: "/",
    },
  ];

  return {
    props: {
      files,
      trash,
      ...(await serverSideTranslations(locale!, ["common", "bin"])),
    },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  files,
  trash,
  locale,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>
        {locale === "en" ? "Manage your files." : "Gerencie seus arquivos."}
      </h1>

      <Card>
        <FileManager files={files} trash={trash} />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
