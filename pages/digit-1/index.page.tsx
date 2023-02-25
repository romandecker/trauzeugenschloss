import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import { withIronSessionSsr } from "iron-session/next";
import { encode as morseEncode } from "morse";
import { ReactElement } from "react";

export interface Digit1PageProps {
  // string of "-", "." and " "
  morseCode: string;
}

export default function Digit1Page({ morseCode }: Digit1PageProps) {
  return <div>{morseCode}</div>;
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
      morseCode: morseEncode(process.env.FIRST_DIGIT_PASSWORD || ""),
    },
  };
}, sessionOptions);
