import { FC } from "react";
import { Drive } from "@/components/Drive";
import { Bin } from "@/components/Bin";

export interface FileInterface {
  id: string;
  key: string;
  fileName: string;
  size: number;
  url: string;
}

const Files: FC<{ id: string; location: "drive" | "trash" }> = ({
  id,
  location,
}) => {
  return location === "drive" ? <Drive id={id} /> : <Bin id={id} />;
};

export default Files;
