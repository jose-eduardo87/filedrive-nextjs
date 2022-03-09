import { FC } from "react";
import { NextPage } from "next";
import { FileUploader } from "@/components/FileUploader";
import { DriveStorageInfo } from "@/components/DriveStorageInfo";
import { LayoutDrive } from "@/components/common";
import { Grid } from "@/components/ui";

const MainPage: NextPage & { LayoutDrive: FC } = () => {
  return (
    <>
      <h1 style={{ fontWeight: 100, marginBottom: "4rem" }}>Hello, Eduardo.</h1>

      <Grid columnGap="1rem" rowGap="1rem" layout={8}>
        {/* CREATE A CARD TO WRAP THE COMPONENTS BELOW */}
        <FileUploader />
        <DriveStorageInfo totalSpace={1024} usedSpace={0} />
      </Grid>
    </>
  );
};

MainPage.LayoutDrive = LayoutDrive;

export default MainPage;
