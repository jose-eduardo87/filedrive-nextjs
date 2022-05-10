import { FC, useState, useEffect, CSSProperties } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface Props {
  onClose?: () => void;
  CSSStyles?: CSSProperties;
}

const Backdrop: FC<Pick<Props, "onClose">> = ({ onClose }) => {
  return <div className={styles.backdrop} onClick={onClose} />;
};

const ModalOverlay: FC<Pick<Props, "CSSStyles">> = ({
  children,
  CSSStyles,
}) => {
  return (
    <div className={styles.modal} style={CSSStyles}>
      {children}
    </div>
  );
};

const Modal: FC<Props> = ({ children, onClose, CSSStyles }) => {
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
        <ModalOverlay CSSStyles={CSSStyles}>{children}</ModalOverlay>,
        document.getElementById("overlays") as HTMLElement
      )}
    </>
  ) : null;
};

export default Modal;
