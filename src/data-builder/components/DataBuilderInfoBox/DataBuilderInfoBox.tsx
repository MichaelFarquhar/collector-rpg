import type { ReactNode } from "react";
import { GiInfo } from "react-icons/gi";
import styles from "./DataBuilderInfoBox.module.css";

type DataBuilderInfoBoxProps = {
  children: ReactNode;
};

export const DataBuilderInfoBox = ({ children }: DataBuilderInfoBoxProps) => {
  return (
    <div className={styles.box} role="note">
      <GiInfo aria-hidden="true" className={styles.icon} />
      <p className={styles.text}>{children}</p>
    </div>
  );
};
