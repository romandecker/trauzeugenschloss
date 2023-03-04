import { PasswordForm } from "../../components/PasswordForm";
import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import styles from "./Digit2Page.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { encode as morseEncode } from "morse";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface Digit2PageProps {}

export default function Digit2Page(_props: Digit2PageProps) {
  const router = useRouter();

  return (
    <DigitPageLayout>
      <div className={styles.poem}>
        <ul>
          <li>Ich muss mein Dasein im verborgenen siechen,</li>
          <li>nur weil man meint, ich würde streng riechen.</li>
        </ul>
        <ul>
          <li>Ein Samstag im Juli, lang, lang ist's her,</li>
          <li>da wurd' ich gebracht - zu Papier.</li>
        </ul>
        <ul>
          <li>Glückwünsche geschrieben mit goldenen Stiften,</li>
          <li>gefällt's mir am besten bei Unterschriften.</li>
        </ul>
        <ul>
          <li>Klar sichtbar versteckt, dicht zwischen den Worten,</li>
          <li>müsst ihr nun nurnoch das unpassende orten.</li>
        </ul>
        <PasswordForm checkEndpoint="/api/digits/2" onSuccess={() => router.push("/")} />
      </div>
    </DigitPageLayout>
  );
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
      solution: req.session.solution,
      morseCode: morseEncode(process.env.FIRST_DIGIT_PASSWORD || ""),
    },
  };
}, sessionOptions);
