import { FC, CSSProperties } from "react";

import styles from "./Card.module.css";

const Card: FC<CSSProperties> = ({ children, ...CSSStyles }) => {
  return (
    <div style={CSSStyles} className={styles.root}>
      {children}
    </div>
  );
};

export default Card;
