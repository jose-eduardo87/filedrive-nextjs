import { FC, useState } from "react";
import { FileInListInterface } from "@/components/FileManager";
import FileProvider from "store/file-context";
import { Drive } from "@/components/Drive";
import { Bin } from "@/components/Bin";

export interface FileInterface {
  id: string;
  key: string;
  fileName: string;
  size: number;
  url: string;
}

const Files: FC<{ files: FileInListInterface; id: string }> = ({
  files,
  id,
}) => {
  return files.name === "drive" ? <Drive id={id} /> : <Bin id={id} />;
};

export default Files;
