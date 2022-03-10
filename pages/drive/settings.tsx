import { NextPage } from "next";
import { FC } from "react";
import { LayoutDrive } from "@/components/common";

const Settings: NextPage & { LayoutDrive: FC } = () => {
  return <div>SETTINGS</div>;
};

Settings.LayoutDrive = LayoutDrive;

export default Settings;
