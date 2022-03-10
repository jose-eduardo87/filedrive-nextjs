import { FC, ReactNode, useState, useMemo, CSSProperties } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui";
import { DragAndDrop } from "@/components/Icons";
import { Trash } from "@/components/Icons";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "helpers/constants";

import styles from "./FileUploader.module.css";

const FileUploader: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const {
    fileRejections,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ maxSize: 10000000 });
  const style = useMemo(
    (): CSSProperties => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  let totalSize: number = 0;
  const files = acceptedFiles.map((file: FileWithPath): ReactNode => {
    totalSize += file.size;

    return (
      <li key={file.path}>
        <span>{file.path}</span> -{" "}
        <span className={styles.fileSize}>{file.size} bytes</span>
        <span className={styles.trashIcon}>
          <Trash
            width={16}
            fill={"#999999"}
            onClick={() => console.log(file.name)}
          />
        </span>
      </li>
    );
  });
  const hasFiles = !(files.length === 0);
  const hasRejections = !(fileRejections.length === 0);

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          <span style={{ verticalAlign: "middle" }}>
            <DragAndDrop width={"20px"} fill="#BBBBBB" />
          </span>{" "}
          Drag and drop your files here, or click to select files.
        </p>
      </div>
      {hasRejections && (
        <p className={styles.errorMessage}>
          * 10 Mb is the maximum file size allowed.
        </p>
      )}
      <p className={styles.filesTitle}>{hasFiles ? "Add more:" : "Files:"}</p>
      {hasFiles && (
        <small style={{ color: "#BEBEBE", fontWeight: 600 }}>
          Total {files.length} files * {totalSize} bytes
        </small>
      )}
      <aside className={styles.filesContainer}>
        <ul>{files}</ul>
      </aside>
      <Button
        style={{ width: "100%", backgroundColor: "#FF6691", border: "none" }}
        title="Select some files to upload them to your drive."
        isDisabled={!hasFiles}
        onClick={() => alert("Clicked!")}
      >
        Send
      </Button>
    </section>
  );
};

export default FileUploader;
