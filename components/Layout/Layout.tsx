import styles from "./Layout.module.scss";
import React from "react";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.layout}>
      <main>{children}</main>
    </div>
  );
}
