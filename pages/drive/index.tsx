import { FC } from "react";
import { NextPage } from "next";
import { Grid, Card } from "@/components/ui";
import { Slider } from "@/components/ui";
import { FileUploader } from "@/components/FileUploader";
import { StorageInfo } from "@/components/StorageInfo";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

const componentsArray = [
  {
    title: "Drive Information",
    Component: StorageInfo,
    freeSpace: 976,
    usedSpace: 48,
  },
  {
    title: "Trash Information",
    Component: StorageInfo,
    freeSpace: 480,
    usedSpace: 32,
  },
];

const MainPage: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>Welcome to Your Dashboard.</h1>

      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card style={{ width: "500px" }}>
          <Slider components={componentsArray} />
        </Card>
        <Card>
          <FileUploader />
        </Card>
        <Card>
          <small style={{ textAlign: "center", color: "#000000" }}>Test</small>
        </Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
