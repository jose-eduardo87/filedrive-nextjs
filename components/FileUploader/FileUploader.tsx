import { FC, ReactNode, CSSProperties, useState, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button, Modal } from "@/components/ui";
import useHttp from "hooks/use-http";
import { DragAndDrop, Important, Trash } from "@/components/Icons";
import {
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "helpers/constants";
import { roundFileSizeToCorrectUnit } from "helpers/functions";
import { modalStyles } from "helpers/constants";

import styles from "./FileUploader.module.css";

const FileUploader: FC = () => {
  const { t } = useTranslation("fileuploader");
  const { isLoading, error, showError, sendRequest } = useHttp();
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPath[]>([]);
  const onDropAccepted = (acceptedFiles: FileWithPath[]) => {
    setUploadedFiles((currentState) => {
      const filesArray = [...currentState, ...acceptedFiles];

      // removes all the duplicate fields
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
        <span>{file.path}</span>
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
  const hasFiles = !(uploadedFiles.length === 0);
  const hasRejections = !(fileRejections.length === 0);

  const onRemoveFileHandler = (name: string) =>
    setUploadedFiles((currentState) =>
      currentState.filter((file) => file.name !== name)
    );
  const onUploadFilesHandler = async () => {
    if (!hasFiles) {
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));

    const response = await sendRequest({
      url: "/api/files/post-files",
      method: "POST",
      body: formData,
    });

    if (response.success) {
      setUploadedFiles([]);
    }
  };

  return (
    <>
      {isLoading && (
        <Modal CSSStyles={modalStyles}>
          <Important />
          <p className={`${styles.modalMessage} ${styles.loadingMessage}`}>
            Uploading...
          </p>
        </Modal>
      )}
      {showError && (
        <Modal CSSStyles={modalStyles}>
          <p className={`${styles.modalMessage} ${styles.errorMessage}`}>
            {error}
          </p>
        </Modal>
      )}

      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>
            <span style={{ verticalAlign: "middle" }}>
              <DragAndDrop width={"20px"} fill="#BBBBBB" />
            </span>{" "}
            {t("drag-n-drop-message")}
          </p>
        </div>
        {hasRejections && (
          <p className={styles.errorMessage}>
            {fileRejections.length === 1
              ? t("fileRejections-length-true", {
                  filename: fileRejections[0].file.name,
                })
              : t("fileRejections-length-false")}
          </p>
        )}
        <p className={styles.filesTitle} style={{ color: "#BEBEBE" }}>
          {hasFiles ? t("hasFiles-true") : t("hasFiles-false")}
        </p>
        {hasFiles && (
          <small style={{ color: "#BEBEBE", fontWeight: 600 }}>
            Total{" "}
            {uploadedFiles.length === 1
              ? t("total-files-single")
              : t("total-files-multi", { amount: uploadedFiles.length })}
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
              ? `${t("btn-title")}${uploadedFiles.length > 1 ? "s!" : "!"}`
              : t("btn-title-disabled")
          }
          isDisabled={!hasFiles || isLoading}
          onClick={onUploadFilesHandler}
        >
          {t("btn")}
        </Button>
      </section>
    </>
  );
};

export default FileUploader;
