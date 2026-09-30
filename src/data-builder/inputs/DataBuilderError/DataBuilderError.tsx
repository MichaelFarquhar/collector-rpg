import styles from "./DataBuilderError.module.css";

type DataBuilderErrorProps = {
  id?: string;
  children?: string;
};

export const DataBuilderError = ({ id, children }: DataBuilderErrorProps) => {
  if (!children) return null;

  return (
    <p className={styles.error} id={id} role="alert">
      {children}
    </p>
  );
};
