import { NextPage } from "next";
import { FC } from "react";
import { Card } from "@/components/ui";
import { SettingsForm } from "@/components/SettingsForm";
import { SettingsOptions } from "@/components/SettingsOptions";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

const Settings: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>Settings</h1>

      <Card
        style={{
          height: "500px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <SettingsForm />
        <SettingsOptions />
      </Card>
    </>
  );
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
