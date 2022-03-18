import { FC, CSSProperties } from "react";
import { useTheme } from "store/theme-context";

import styles from "./Card.module.css";

interface CardInterface {
  style?: CSSProperties;
}

const Card: FC<CardInterface> = ({ children, style }) => {
  const { isDark } = useTheme();
  return (
    <div
      style={{ backgroundColor: isDark ? "#E7E7E7" : "", ...style }}
      className={styles.root}
    >
      {children}
    </div>
  );
};

export default Card;
