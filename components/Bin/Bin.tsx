import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FileInBin } from "@/components/File";
import { Button, PopupMessage } from "@/components/ui";
import useCheckbox from "hooks/use-checkbox";
import useHttp from "hooks/use-http";
import { useFile } from "store/file-context";
import {
  Checked,
  Delete,
  Error,
  Party,
  Trash,
  Unchecked,
} from "@/components/Icons";
import { getButtonStyleInBin } from "helpers/functions";
import {
  HEADING_STYLE_IN_DRIVE_BIN,
  ICON_STYLE_IN_DRIVE_BIN,
  PANEL_STYLES,
} from "helpers/constants";

import styles from "../Files/Files.module.css";

const Bin: FC<{ id: string }> = ({ id }) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const { itemsTrash, onDeleteFiles } = useFile();
  const { error, showError, isLoading, sendRequest } = useHttp();
  const { t } = useTranslation("bin");
  const { registeredFilesState, trackerFunctions, toggleState } = useCheckbox();
  const { registeredFiles } = registeredFilesState;
  const { isTogglingCheckboxes, runUseEffect, onToggleFiles } = toggleState;
  const hasFilesInBin = itemsTrash.length > 0;
  const hasRegisteredFiles = registeredFiles.some((file) => file?.isChecked);
  const togglingString = isTogglingCheckboxes
    ? isEnglish
      ? "uncheck"
      : "desmarcar"
    : isEnglish
    ? "check"
    : "marcar";

  const renderEmptyPanel = (
    <div style={PANEL_STYLES}>
      <Party fill="#A1A1A1" />
      <p style={{ textAlign: "center", color: "#A1A1A1", marginLeft: ".7rem" }}>
        {t("empty_bin_message")}
      </p>
    </div>
  );

  const renderFilePanel = itemsTrash.map((file, index) => (
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

  const deleteFilesHandler = async () => {
    const checkedFiles = registeredFiles.filter((file) => file!.isChecked);

    const response = await sendRequest({
      url: "/api/files/delete-files",
      method: "DELETE",
      body: { files: checkedFiles },
      headers: { "Content-Type": "application/json" },
    });

    if (response) {
      // remove the successfully deleted files from frontend by using onDeleteFiles provided by useFile().
      const removedFilesIDs = checkedFiles.map((file) => file!.id);

      onDeleteFiles(removedFilesIDs);
    }
  };

  return (
    <>
      {isLoading && (
        <PopupMessage
          type="loading"
          message="Deleting..."
          SVG={<Delete fill="#D11A2A" />}
        />
      )}
      {showError && (
        <PopupMessage
          type="error"
          message={error!}
          SVG={<Error fill="#7C4343" />}
        />
      )}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <>
            <h2 style={HEADING_STYLE_IN_DRIVE_BIN}>
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
              onClick={deleteFilesHandler}
              style={getButtonStyleInBin()}
            >
              {t("btn-clear")}
            </Button>
          </>
        )}
      </Droppable>
    </>
  );
};

export default Bin;
