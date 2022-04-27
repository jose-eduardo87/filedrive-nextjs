import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInBin } from "@/components/File";
import { Button } from "@/components/ui";
import useCheckbox, { RegisteredFilesInterface } from "hooks/use-checkbox";
import useHttp from "hooks/use-http";
import { Checked, Trash, Party, Unchecked } from "@/components/Icons";
import { getButtonStyleInBin } from "helpers/functions";
import {
  HEADING_STYLE_IN_DRIVE_BIN,
  ICON_STYLE_IN_DRIVE_BIN,
} from "helpers/constants";
import { FileInterface } from "@/components/Files/Files";

import styles from "../Files/Files.module.css";

const Bin: FC<{ files: FileInterface[]; id: string }> = ({ files, id }) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const [filesCopy, setFilesCopy] = useState<FileInterface[]>(files);
  const { error, showError, isLoading, sendRequest } = useHttp();
  const { t } = useTranslation("bin");
  const { registeredFilesState, trackerFunctions, toggleState } = useCheckbox();
  const { registeredFiles } = registeredFilesState;
  const { isTogglingCheckboxes, runUseEffect, onToggleFiles } = toggleState;
  // const hasFilesInBin = filesCopy.length > 0;
  const hasFilesInBin = files.length > 0;
  const hasRegisteredFiles = registeredFiles.some((file) => file?.isChecked);
  const togglingString = isTogglingCheckboxes
    ? isEnglish
      ? "uncheck"
      : "desmarcar"
    : isEnglish
    ? "check"
    : "marcar";

  // runs whenever there is a change in "files" props. This means that everytime a file is added/removed to/from bin, filesCopy will be updated.
  // useEffect(
  //   () =>
  //     setFilesCopy((currentState) => {  }),
  //   [files]
  // );

  const renderEmptyPanel = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Party fill="#A1A1A1" />
      <p style={{ textAlign: "center", color: "#A1A1A1", marginLeft: ".7rem" }}>
        {t("empty_bin_message")}
      </p>
    </div>
  );

  // const renderFilePanel = filesCopy.map((file, index) => (
  const renderFilePanel = files.map((file, index) => (
    <Draggable key={file.id} draggableId={file.id} index={index}>
      {(provided) => (
        <FileInBin
          provided={provided}
          file={file}
          trackerFunctions={trackerFunctions}
          toggleState={{ isTogglingCheckboxes, runUseEffect }}
        />
      )}
    </Draggable>
  ));

  const onDeleteFiles = async () => {
    const checkedFiles = registeredFiles.filter((file) => file!.isChecked);

    const response = await sendRequest({
      url: "/api/files/delete-files",
      method: "DELETE",
      body: { files: checkedFiles },
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      // remove the successfully deleted files from frontend and from registeredFiles (NOT FULLY WORKING)
      // const filteredDeletedFiles = getRemovedFiles(
      //   checkedFiles as RegisteredFilesInterface[],
      //   filesCopy
      // );
      // setFilesCopy(filteredDeletedFiles!);
    }
  };

  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <>
          <h2 style={{ ...HEADING_STYLE_IN_DRIVE_BIN }}>
            <Trash {...ICON_STYLE_IN_DRIVE_BIN} /> {t("heading")}
          </h2>
          <ul
            ref={provided.innerRef}
            className={styles.root}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "#EBFCED" : "",
              border: snapshot.isDraggingOver ? "2px dotted #CECECE" : "",
            }}
            {...provided.droppableProps}
          >
            {hasFilesInBin ? renderFilePanel : renderEmptyPanel}
            {provided.placeholder}
          </ul>
          <Button
            title={
              hasFilesInBin
                ? t("btn-toggle-title-true", {
                    toggleState: togglingString,
                  })
                : t("btn-toggle-title-false")
            }
            isDisabled={!hasFilesInBin}
            style={getButtonStyleInBin("toggle")}
            onClick={onToggleFiles}
          >
            {isTogglingCheckboxes ? <Unchecked /> : <Checked />}
          </Button>
          <Button
            title={
              hasRegisteredFiles
                ? t("btn-clear-title-true")
                : t("btn-clear-title-false")
            }
            isDisabled={!hasRegisteredFiles}
            onClick={onDeleteFiles}
            style={getButtonStyleInBin()}
          >
            {t("btn-clear")}
          </Button>
        </>
      )}
    </Droppable>
  );
};

export default Bin;
