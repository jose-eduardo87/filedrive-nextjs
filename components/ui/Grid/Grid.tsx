import { FC } from "react";

import styles from "./Grid.module.css";

interface GridProps {
  layout: number;
  columnGap: string;
  rowGap: string;
}

const Grid: FC<GridProps> = ({ children, ...CSSStyles }) => {
  return (
    <div style={CSSStyles} className={styles.grid}>
      {children}
    </div>
  );
};

export default Grid;
