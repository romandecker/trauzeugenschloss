import { PasswordForm } from "../../components/PasswordForm";
import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import styles from "./Digit3Page.module.scss";
import { withIronSessionSsr } from "iron-session/next";
import { encode as morseEncode } from "morse";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface Digit3PageProps {}

export default function Digit3Page(_props: Digit3PageProps) {
  const router = useRouter();

  return (
    <DigitPageLayout>
      <div className={styles.players}>
        <audio controls src="/audio/1.mp3"></audio>
        <audio controls src="/audio/2.mp3"></audio>
        <audio controls src="/audio/3.mp3"></audio>
        <audio controls src="/audio/4.mp3"></audio>
        <PasswordForm checkEndpoint="/api/digits/3" onSuccess={() => router.push("/")} />
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
      solution: req.session.solution || [null, null, null],
      morseCode: morseEncode(process.env.FIRST_DIGIT_PASSWORD || ""),
    },
  };
}, sessionOptions);
