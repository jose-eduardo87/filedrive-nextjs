import { CSSProperties } from "react";
import {
  DocumentFile,
  GenericFile,
  ImageFile,
  VideoFile,
} from "@/components/Icons";
import {
  IMAGE_EXTENSION,
  VIDEO_EXTENSION,
  DOCUMENT_EXTENSION,
} from "./constants";

export const nameValidator = (name: string) => name.trim() !== "";

export const emailValidator = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const passwordValidator = (password: string) => password.length >= 6;

export const roundFileSizeToCorrectUnit = (value: number) => {
  if (value >= 1048576) {
    return `${(value / 1048576).toFixed(2)} MB`;
  } else if (value >= 1024 && value < 1048576) {
    return `${(value / 1024).toFixed(2)} KB`;
  }

  return `${value.toFixed(2)} B`;
};

export const getButtonStyleInBin = (type?: string): CSSProperties => {
  const isToggle = type === "toggle";

  return {
    width: isToggle ? "15%" : "85%",
    backgroundColor: isToggle ? "#F2D2BD" : "#FFFFE0",
    color: isToggle ? "#B3B3B3" : "#CECECE",
    verticalAlign: isToggle ? "middle" : "",
    border: "none",
    padding: isToggle ? 0 : "",
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
