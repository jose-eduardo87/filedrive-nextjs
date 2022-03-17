import { FC } from "react";
import {
  InferGetServerSidePropsType,
  NextPage,
  GetServerSideProps,
} from "next";
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

export const getServerSideProps: GetServerSideProps = async () => {
  // REQUIRED TO RENDER DRAG AND DROP FUNCTIONALITY CORRECTLY
  resetServerContext();

  const files: FileInterface[] = [
    {
      id: "file-01",
      name: "Photo 01.jpg",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-02",
      name: "Photo 02.jpeg",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-03",
      name: "Photo 03.pdf",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-04",
      name: "Photo 04.mkv",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-05",
      name: "Photo 05.mp4",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
    {
      id: "file-06",
      name: "Photo 06.asaks",
      size: roundFileSizeToCorrectUnit(123564),
      url: "/",
    },
  ];
  const trash: FileInterface[] = [
    {
      id: "file-02a",
      name: "Photo 02.txt",
      size: roundFileSizeToCorrectUnit(235465),
      url: "/",
    },
  ];

  return {
    props: { files, trash },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  files,
  trash,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>Manage Your Files.</h1>

      <Card>
        <FileManager files={files} trash={trash} />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
