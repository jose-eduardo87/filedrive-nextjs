import { FC, memo, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { DraggableProvided } from "react-beautiful-dnd";
import { PopupMessage } from "@/components/ui";
import { Download } from "@/components/Icons";
import { FileInterface } from "pages/drive/files";
import { getMediaIcon, roundFileSizeToCorrectUnit } from "helpers/functions";

import styles from "./File.module.css";

interface draggableConfig {
  provided: DraggableProvided;
}

interface FileProps {
  file: FileInterface;
  draggableConfig: draggableConfig;
}

const FileInDrive: FC<FileProps> = ({ file, draggableConfig }) => {
  const { locale } = useRouter();
  const { provided } = draggableConfig;
  const timerRef = useRef<NodeJS.Timeout>();
  const [showMessage, setShowMessage] = useState(false);
  const MediaIcon = getMediaIcon(file.fileName);

  useEffect(() => {
    const timer = timerRef.current;

    return () => clearTimeout(Number(timer));
  }, []);

  const onDoubleClickHandler = async (url: string, name: string) => {
    setShowMessage(true);

    const timer = setTimeout(() => setShowMessage(false), 4000);

    timerRef.current = timer;

    saveAs(url, name);
  };

  return (
    <>
      {showMessage && (
        <PopupMessage
          type="download"
          message="Downloading..."
          SVG={<Download fill="#529C52" />}
        />
      )}
      <li
        ref={provided.innerRef}
        className={styles.root}
        title={
          locale === "en"
            ? "Double-click me to download this file."
            : "Dê um duplo-clique para fazer o download deste arquivo."
        }
        onDoubleClick={() => onDoubleClickHandler(file.url, file.fileName)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <span>
          <MediaIcon {...{ width: 16, fill: "#B4B4B4" }} /> {file.fileName}
        </span>
        <span>{roundFileSizeToCorrectUnit(file.size)}</span>
      </li>
    </>
  );
};

export default memo(FileInDrive);
