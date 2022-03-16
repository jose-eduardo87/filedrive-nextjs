import { FC } from "react";
import { NextPage } from "next";
import { Grid, Card } from "@/components/ui";
import { FileUploader } from "@/components/FileUploader";
import { DriveStorageInfo } from "@/components/DriveStorageInfo";
import { LayoutDrive } from "@/components/common";
import { HEADING_STYLE_IN_DASHBOARD } from "helpers/constants";

const MainPage: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={HEADING_STYLE_IN_DASHBOARD}>Welcome to Your Dashboard.</h1>

      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card>
          <DriveStorageInfo freeSpace={976} usedSpace={48} />
        </Card>
        <Card>
          <FileUploader />
        </Card>
        <Card>
          <small style={{ textAlign: "center" }}>TEST</small>
        </Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
