import { FC } from "react";
import { FileInListInterface } from "../FileManager/FileManager";
import { Drive } from "@/components/Drive";
import { Bin } from "@/components/Bin";

const Files: FC<{ files: FileInListInterface; id: string }> = ({
  files,
  id,
}) => {
  const props = { files, id };

  return files.name === "drive" ? <Drive {...props} /> : <Bin {...props} />;
};

export default Files;
