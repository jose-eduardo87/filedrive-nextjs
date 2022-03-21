import { FC, ReactNode, CSSProperties, useState, useMemo } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui";
import { DragAndDrop } from "@/components/Icons";
import { Trash } from "@/components/Icons";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "helpers/constants";
import { roundFileSizeToCorrectUnit } from "helpers/functions";

import styles from "./FileUploader.module.css";

const FileUploader: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const onDropAccepted = (acceptedFiles: FileWithPath[]) => {
    setUploadedFiles((currentState) => {
      const filesArray = [...currentState, ...acceptedFiles];

      // REMOVES ALL THE DUPLICATE FILES
      const filteredFiles = filesArray.filter(
        (value, index, array) =>
          index === array.findIndex((t) => t.name === value.name)
      );

      return filteredFiles;
    });
  };

  const {
    fileRejections,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ maxSize: 10000000, onDropAccepted });
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
  const renderFiles = uploadedFiles.map((file: FileWithPath): ReactNode => {
    totalSize += file.size;

    return (
      <li key={file.path}>
        <span>{file.path}</span> -{" "}
        <span className={styles.fileSize}>
          {roundFileSizeToCorrectUnit(file.size)}
        </span>
        <span className={styles.trashIcon}>
          <Trash
            width={16}
            fill="#999999"
            cursor="pointer"
            onClick={() => onRemoveFileHandler(file.name)}
          />
        </span>
      </li>
    );
  });
  const onRemoveFileHandler = (name: string) =>
    setUploadedFiles((currentState) =>
      currentState.filter((file) => file.name !== name)
    );
  const hasFiles = !(uploadedFiles.length === 0);
  const hasRejections = !(fileRejections.length === 0);

  return (
    <section>
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
          {fileRejections.length === 1
            ? `${fileRejections[0].file.name} could not be selected because it exceeds the maximum allowed file size (10 MB).`
            : "Some files could not be selected due to the file size limitation (10MB)."}
        </p>
      )}
      <p className={styles.filesTitle} style={{ color: "#BEBEBE" }}>
        {hasFiles ? "Add more:" : "Files:"}
      </p>
      {hasFiles && (
        <small style={{ color: "#BEBEBE", fontWeight: 600 }}>
          Total{" "}
          {uploadedFiles.length === 1
            ? `${uploadedFiles.length} file`
            : `${uploadedFiles.length} files`}{" "}
          * {roundFileSizeToCorrectUnit(totalSize)}
        </small>
      )}
      <aside className={styles.filesContainer}>
        <ul>{renderFiles}</ul>
      </aside>
      <Button
        style={{ width: "100%", backgroundColor: "#FF6691", border: "none" }}
        title={
          hasFiles
            ? `Hit the button to upload the file${
                uploadedFiles.length > 1 ? "s!" : "!"
              }`
            : "You must select at least one file."
        }
        isDisabled={!hasFiles}
        onClick={() => alert(JSON.stringify(uploadedFiles))}
      >
        Send!
      </Button>
    </section>
  );
};

export default FileUploader;
