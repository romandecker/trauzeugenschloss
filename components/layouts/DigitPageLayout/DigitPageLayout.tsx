import styles from "./DigitPageLayout.module.scss";
import classNames from "classnames";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

export interface DigitPageLayoutProps extends React.PropsWithChildren<{}> {
  isLightMode?: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

export function DigitPageLayout({
  children,
  isLightMode,
  onMouseDown,
  onMouseUp,
}: DigitPageLayoutProps) {
  return (
    <div className={classNames(styles.digitPageLayout, { [styles.light]: isLightMode })}>
      <nav>
        <Link href="/">⬅ ? ? ?</Link>
      </nav>
      <main
        onTouchStart={onMouseDown}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onMouseUp}
      >
        {children}
      </main>
    </div>
  );
}
