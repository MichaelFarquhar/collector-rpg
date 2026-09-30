import type { ReactNode } from "react";
import styles from "./DataBuilderLabel.module.css";

type DataBuilderLabelProps = {
  htmlFor: string;
  id?: string;
  children: ReactNode;
};

export const DataBuilderLabel = ({ htmlFor, id, children }: DataBuilderLabelProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor} id={id}>
      {children}
    </label>
  );
};
