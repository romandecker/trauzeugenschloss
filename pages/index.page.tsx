import { sessionOptions } from "../server/session";
import styles from "./index.module.scss";
import { withIronSessionSsr } from "iron-session/next";

export default function DashboardPage() {
  return <div className={styles.formContainer}>This is a protected page</div>;
}

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
