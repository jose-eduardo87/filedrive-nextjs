import { FC, InputHTMLAttributes, memo } from "react";

import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...inputConfig }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={inputConfig.id}>{label}</label>}
      <input id={inputConfig.id} className={styles.input} {...inputConfig} />
    </div>
  );
};

export default memo(Input);
