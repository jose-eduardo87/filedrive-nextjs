import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";

// BASIC MODAL. FOR MORE EXAMPLES/MORE ROBUST MODALS, npm install react-overlays
// UNCOMMENT <div id="overlays></div> IN _document.js IF YOU ARE GOING TO USE THIS MODAL

import styles from "./Modal.module.css";

interface Props {
  onClose: () => {};
}

const Backdrop: FC<Props> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay: FC = ({ children }) => {
  return <div className={styles.modal}>{children}</div>;
};

const Modal: FC<Props> = ({ children, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  return isMounted ? (
    <>
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("overlays") as HTMLElement
      )}
      {createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        document.getElementById("overlays") as HTMLElement
      )}
    </>
  ) : null;
};

export default Modal;
