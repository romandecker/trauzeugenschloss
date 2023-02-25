import { Layout } from "../components/layouts/Layout";
import { sessionOptions } from "../server/session";
import { Digit } from "./dashboard/Digit";
import styles from "./index.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { ReactElement } from "react";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.digits}>
        <Digit href="/digit-1" />
        <Digit href="/digit-2" />
        <Digit href="/digit-3" />
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
    },
  };
}, sessionOptions);
