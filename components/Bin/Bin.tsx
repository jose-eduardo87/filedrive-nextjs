import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInBin } from "@/components/File";
import { Button } from "@/components/ui";
import { FileInListInterface } from "@/components/FileManager/";
import useCheckbox from "hooks/use-checkbox";
import useHttp from "hooks/use-http";
import { Checked, Unchecked, Trash } from "@/components/Icons";
import { getButtonStyleInBin } from "helpers/functions";
import {
  HEADING_STYLE_IN_DRIVE_BIN,
  ICON_STYLE_IN_DRIVE_BIN,
} from "helpers/constants";

import styles from "../Files/Files.module.css";

const Bin: FC<{ files: FileInListInterface; id: string }> = ({ files, id }) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { error, isLoading, sendRequest } = useHttp();
  const { t } = useTranslation("bin");
  const { registeredFilesState, trackerFunctions, toggleState } = useCheckbox();
  const { isTogglingCheckboxes, runUseEffect, onToggleFiles } = toggleState;
  const { registeredFiles } = registeredFilesState;
  const hasFilesInBin = files.items.length > 0;
  const hasRegisteredFiles = registeredFiles.some((file) => file?.isChecked);
  const togglingString = isTogglingCheckboxes
    ? isEnglish
      ? "uncheck"
      : "desmarcar"
    : isEnglish
    ? "check"
    : "marcar";

  const renderEmptyPanel = (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
    >
      <p style={{ textAlign: "center", color: "#A1A1A1" }}>
        {t("empty_bin_message")}
      </p>
    </div>
  );

  const renderFilePanel = files.items.map((file, index) => (
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
    console.log(registeredFiles);
    // const markedFiles = Object.keys()
    // await sendRequest({ url: "/api/files/delete-files", method: "DELETE", body });
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
