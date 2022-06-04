import { CSSProperties, FC, InputHTMLAttributes, memo } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  CSSStyles?: CSSProperties;
}

const Input: FC<InputProps> = ({ label, CSSStyles, ...inputConfig }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={inputConfig.id}>{label}</label>}
      <input
        id={inputConfig.id}
        className={styles.input}
        style={CSSStyles}
        {...inputConfig}
      />
    </div>
  );
};

export default memo(Input);
