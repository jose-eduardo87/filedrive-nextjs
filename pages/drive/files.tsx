import { FC } from "react";
import { InferGetServerSidePropsType, NextPage } from "next";
import { GetServerSideProps } from "next";
import { resetServerContext } from "react-beautiful-dnd";
import { FileManager } from "@/components/FileManager";
import { Card } from "@/components/ui";
import { LayoutDrive } from "@/components/common";
import { roundFileSizeToCorrectUnit } from "helpers/functions";
import { STYLE_HEADING_DASHBOARD } from "helpers/constants";

// DECIDE WETHER TO USE https://www.npmjs.com/package/react-beautiful-dnd, https://www.npmjs.com/package/react-draggable OR https://www.npmjs.com/package/react-dnd

export const getServerSideProps: GetServerSideProps = async () => {
  // REQUIRED TO RENDER DRAG AND DROP FUNCTIONALITY CORRECTLY
  resetServerContext();

  return {
    props: { data: 1 },
  };
};

const Files: NextPage & { LayoutDrive: FC } = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1 style={STYLE_HEADING_DASHBOARD}>Manage Your Files.</h1>

      <Card>
        <FileManager
          files={[
            {
              id: "file-01",
              name: "Photo 01",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
            {
              id: "file-02",
              name: "Photo 02",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
            {
              id: "file-03",
              name: "Photo 03",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
            {
              id: "file-04",
              name: "Photo 04",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
            {
              id: "file-05",
              name: "Photo 05",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
          ]}
          trash={[
            {
              id: "file-02a",
              name: "Photo 02",
              size: roundFileSizeToCorrectUnit(235465),
              url: "/",
            },
          ]}
        />
      </Card>
    </>
  );
};

Files.LayoutDrive = LayoutDrive;

export default Files;
