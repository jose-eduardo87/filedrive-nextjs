import { FC } from "react";
import { Modal } from "@/components/ui";
import { MODAL_STYLES } from "helpers/constants";

import styles from "./PopupMessage.module.css";

interface PopupMessageInterface {
  type: "error" | "loading" | "warning" | "download";
  message: string;
  SVG: JSX.Element;
}

const PopupMessage: FC<PopupMessageInterface> = ({ type, message, SVG }) => {
  return (
    <Modal CSSStyles={MODAL_STYLES}>
      {SVG}
      <p className={`${styles.modalMessage} ${styles[type]}`}>{message}</p>
    </Modal>
  );
};

export default PopupMessage;
