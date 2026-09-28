import styles from "./DataBuilderPage.module.css";
import { DataBuilderRouter } from "./routes/DataBuilderRouter.tsx";
import { DataBuilderSidebar } from "./sidebar/DataBuilderSidebar.tsx";

export const DataBuilderPage = () => {
  return (
    <div className={styles.page}>
      <DataBuilderSidebar />
      <main className={styles.content}>
        <DataBuilderRouter />
      </main>
    </div>
  );
};
