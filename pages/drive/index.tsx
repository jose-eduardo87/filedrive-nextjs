import { FC } from "react";
import { NextPage } from "next";
import { FileUploader } from "@/components/FileUploader";
import { DriveStorageInfo } from "@/components/DriveStorageInfo";
import { LayoutDrive } from "@/components/common";
import { Grid, Card } from "@/components/ui";

const cardHeight = "350px";

const MainPage: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={{ fontWeight: 100, marginBottom: "3rem" }}>Hello, Eduardo.</h1>

      <Grid column={"1fr 2fr 1fr"} columnGap=".8rem" rowGap=".8rem">
        <Card width="400px">
          <DriveStorageInfo freeSpace={976} usedSpace={48} />
        </Card>
        <Card>
          <FileUploader />
        </Card>
        <Card>TEST</Card>
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
