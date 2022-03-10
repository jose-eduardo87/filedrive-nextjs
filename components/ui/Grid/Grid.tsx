import { FC } from "react";

import styles from "./Grid.module.css";

interface GridProps {
  column: string;
  columnGap?: string;
  rowGap?: string;
}

const Grid: FC<GridProps> = ({ children, column, ...CSSStyles }) => {
  return (
    <div
      style={{ gridTemplateColumns: column, ...CSSStyles }}
      className={styles.grid}
    >
      {children}
    </div>
  );
};

export default Grid;
