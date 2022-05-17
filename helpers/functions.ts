import { CSSProperties } from "react";
import {
  DocumentFile,
  GenericFile,
  ImageFile,
  VideoFile,
} from "@/components/Icons";
import { RegisteredFilesInterface } from "hooks/use-checkbox";
import { FileInterface } from "pages/drive/files";
import {
  baseStyle,
  IMAGE_EXTENSION,
  VIDEO_EXTENSION,
  DOCUMENT_EXTENSION,
} from "./constants";

export const nameValidator = (name: string) => name.trim() !== "";

export const emailValidator = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const roundFileSizeToCorrectUnit = (value: number) => {
  if (value >= 1048576) {
    return `${(value / 1048576).toFixed(2)} MB`;
  } else if (value >= 1024 && value < 1048576) {
    return `${(value / 1024).toFixed(2)} KB`;
  }

  return `${value.toFixed(2)} B`;
};

export const getHeadingStyles = () => {
  return {
    fontSize: "3rem",
    fontWeight: 900,
    marginBottom: "4rem",
  };
};

export const getCardStyles = (isDarkTheme: boolean) => {
  return {
    backgroundColor: isDarkTheme ? "#2A2B2E" : "#F9F9F9",
    border: isDarkTheme ? "2px solid #404040" : "",
    borderRadius: "12.5px",
  };
};

export const getBaseStyle = (isDarkTheme: boolean): CSSProperties => {
  return {
    backgroundColor: isDarkTheme ? "#000000" : "#FAFAFA",
    borderColor: isDarkTheme ? "#404040" : "#EEEEEE",
    ...baseStyle,
  };
};

export const getButtonStyleInBin = (type?: string): CSSProperties => {
  const isToggle = type === "toggle";

  return {
    width: isToggle ? "15%" : "85%",
    verticalAlign: isToggle ? "middle" : "",
    border: "none",
    // padding: isToggle ? 0 : "",
  };
};

export const getMediaIcon = (name: string) => {
  const regex = new RegExp("[^.]+$");
  const extension = name.match(regex);

  if (IMAGE_EXTENSION.includes(extension![0].toLowerCase())) {
    return ImageFile;
  }
  if (VIDEO_EXTENSION.includes(extension![0].toLowerCase())) {
    return VideoFile;
  }
  if (DOCUMENT_EXTENSION.includes(extension![0].toLowerCase())) {
    return DocumentFile;
  }

  return GenericFile;
};

export const getRemovedFiles = (
  checkedFiles: RegisteredFilesInterface[],
  files: FileInterface[]
) => {
  const removedIDsList = checkedFiles.map((file) => file.id);

  return files.filter((file) => !removedIDsList.includes(file.id));
};
