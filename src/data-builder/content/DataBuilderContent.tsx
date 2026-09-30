import type { ReactNode } from "react";
import { DataBuilderInfoBox } from "../components/DataBuilderInfoBox/DataBuilderInfoBox.tsx";
import styles from "./DataBuilderContent.module.css";

type DataBuilderContentProps = {
  info: string;
  children: ReactNode;
};

export const DataBuilderContent = ({
  info,
  children,
}: DataBuilderContentProps) => {
  return (
    <div className={styles.content}>
      <DataBuilderInfoBox>{info}</DataBuilderInfoBox>
      <div className={styles.page}>{children}</div>
    </div>
  );
};
