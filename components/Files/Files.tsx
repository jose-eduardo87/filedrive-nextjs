import { FC } from "react";
import { FileInListInterface } from "@/components/FileManager";
import { Drive } from "@/components/Drive";
import { Bin } from "@/components/Bin";

interface PropsInterface {
  files: FileInListInterface;
  id: string;
}

const Files: FC<PropsInterface> = (props) => {
  const { files } = props;

  return files.name === "drive" ? <Drive {...props} /> : <Bin {...props} />;
};

export default Files;
