import styles from "./DigitPageLayout.module.scss";
import Link from "next/link";
import React from "react";

export function DigitPageLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className={styles.digitPageLayout}>
      <nav>
        <Link href="/">⬅ ? ? ?</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
