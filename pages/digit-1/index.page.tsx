import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import { withIronSessionSsr } from "iron-session/next";
import { ReactElement } from "react";

export default function Digit1Page() {
  return <div>digit 1 page waaat</div>;
}

Digit1Page.getLayout = function getLayout(page: ReactElement) {
  return <DigitPageLayout>{page}</DigitPageLayout>;
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
