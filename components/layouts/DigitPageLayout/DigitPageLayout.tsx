import styles from "./DigitPageLayout.module.scss";
import Link from "next/link";
import React, { useEffect } from "react";

export function DigitPageLayout({ children }: React.PropsWithChildren<{}>) {
  useEffect(() => {
    window.navigator.vibrate(100);
  });
  return (
    <div className={styles.digitPageLayout}>
      <nav>
        <Link href="/">⬅ ? ? ?</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
