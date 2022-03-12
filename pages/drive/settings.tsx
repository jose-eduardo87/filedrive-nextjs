import { NextPage } from "next";
import { FC } from "react";
import { Card } from "@/components/ui";
import { LayoutDrive } from "@/components/common";
import { STYLE_HEADING_DASHBOARD } from "helpers/constants";

const Settings: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={STYLE_HEADING_DASHBOARD}>Settings</h1>

      <Card style={{ height: "500px" }}></Card>
    </>
  );
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
