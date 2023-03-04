import styles from "./Digit.module.scss";
import classNames from "classnames";
import Link from "next/link";

export interface UnsolvedDigitProps {
  href: string;
}

export interface SolvedDigitProps {
  solvedDigit: number;
}

export type DigitProps = SolvedDigitProps | UnsolvedDigitProps;

function isSolvedDigitProps(props: DigitProps): props is SolvedDigitProps {
  return typeof (props as Partial<SolvedDigitProps>)?.solvedDigit !== "undefined";
}

export function Digit(props: DigitProps) {
  const isSolved = isSolvedDigitProps(props);

  return (
    <div className={classNames(styles.digit, { [styles.glitched]: !isSolved })}>
      <div className={styles.environment}></div>
      <span className={`${styles.hero} ${styles.glitch} ${styles.layers}`} data-text="0123456789">
        {isSolved ? <span>{props.solvedDigit}</span> : <Link href={props.href}>?</Link>}
      </span>
    </div>
  );
}
