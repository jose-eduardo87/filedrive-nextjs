import { FC, CSSProperties } from "react";

import styles from "./Card.module.css";

interface CardInterface {
  style?: CSSProperties;
}

const Card: FC<CardInterface> = ({ children, style }) => {
  return (
    <div style={style} className={styles.root}>
      {children}
    </div>
  );
};

export default Card;
