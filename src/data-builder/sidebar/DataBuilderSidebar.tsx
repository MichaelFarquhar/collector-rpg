import { GiFastBackwardButton } from "react-icons/gi";
import { Link } from "wouter";
import { dataBuilderRoutes } from "../routes/dataBuilderRoutes.tsx";
import styles from "./DataBuilderSidebar.module.css";

export const DataBuilderSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>Data Builder</h1>
      <nav className={styles.nav}>
        {dataBuilderRoutes.map((category) => (
          <section key={category.label}>
            <h2 className={styles.category}>{category.label}</h2>
            <ul className={styles.links}>
              {category.routes.map((route) => {
                const Icon = route.icon;

                return (
                  <li key={route.path}>
                    <Link
                      href={route.path}
                      className={(isActive) =>
                        isActive
                          ? `${styles.link} ${styles.linkActive}`
                          : styles.link
                      }
                    >
                      <Icon aria-hidden="true" />
                      {route.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>
      <Link href="~/" className={styles.returnLink}>
        <GiFastBackwardButton aria-hidden="true" />
        Return
      </Link>
    </aside>
  );
};
