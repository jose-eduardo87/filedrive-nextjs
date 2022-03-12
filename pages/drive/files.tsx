import { FC } from "react";
import { NextPage } from "next";
import { FileManager } from "@/components/FileManager";
import { Card } from "@/components/ui";
import { LayoutDrive } from "@/components/common";
import { roundFileSizeToCorrectUnit } from "helpers/functions";
import { STYLE_HEADING_DASHBOARD } from "helpers/constants";

// DECIDE WETHER TO USE https://www.npmjs.com/package/react-beautiful-dnd, https://www.npmjs.com/package/react-draggable OR https://www.npmjs.com/package/react-dnd

const Files: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={STYLE_HEADING_DASHBOARD}>Manage Your Files.</h1>

      <Card>
        <FileManager
          files={[
            {
              name: "Photo 01",
              size: roundFileSizeToCorrectUnit(123564),
              url: "/",
            },
          ]}
          trash={[
            {
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
