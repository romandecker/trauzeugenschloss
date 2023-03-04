import { useSolution } from "../components/SolutionContext";
import { Layout } from "../components/layouts/Layout";
import { sessionOptions } from "../server/session";
import { Digit } from "./dashboard/Digit";
import styles from "./index.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { ReactElement } from "react";

function isSolved(digit: null | number): digit is number {
  return typeof digit === "number";
}

export default function DashboardPage() {
  const [firstDigit, secondDigit, thirdDigit] = useSolution();
  return (
    <div className={styles.dashboard}>
      <div className={styles.digits}>
        <Digit {...(isSolved(firstDigit) ? { solvedDigit: firstDigit } : { href: "/digit-1" })} />
        <Digit {...(isSolved(secondDigit) ? { solvedDigit: secondDigit } : { href: "/digit-2" })} />
        <Digit {...(isSolved(thirdDigit) ? { solvedDigit: thirdDigit } : { href: "/digit-3" })} />
      </div>
    </div>
  );
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  if (!req.session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: req.session.user,
      solution: req.session.solution,
    },
  };
}, sessionOptions);
