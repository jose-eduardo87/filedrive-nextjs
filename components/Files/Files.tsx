import { FC } from "react";
import { FileInListInterface } from "@/components/FileManager";
import { Drive } from "@/components/Drive";
import { Bin } from "@/components/Bin";

export interface FileInterface {
  id: string;
  key: string;
  fileName: string;
  size: number;
  url: string;
}

interface PropsInterface {
  files: FileInListInterface;
  id: string;
}

const Files: FC<PropsInterface> = ({ files, id }) => {
  const properties = { files: files.items, id }; // ACHO QUE TER DESTRUTURADO files NÃO ESTÁ CAUSANDO Bin RERENDER A CADA MUDANÇA. CHECAR. SE FOR, UMA POSSÍVEL SOLUÇÃO É
  // CRIAR UM STATE DENTRO DE Files E PASSAR O STATE PARA Drive E Bin.

  return files.name === "drive" ? (
    <Drive {...properties} />
  ) : (
    <Bin {...properties} />
  );
};

export default Files;
