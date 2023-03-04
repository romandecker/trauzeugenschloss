import { PasswordForm } from "../../components/PasswordForm";
import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import styles from "./Digit1Page.module.scss";
import { MorsePlayer } from "./morse";
import { withIronSessionSsr } from "iron-session/next";
import { encode as morseEncode } from "morse";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export interface Digit1PageProps {
  // string of "-", "." and " "
  morseCode: string;
}

export default function Digit1Page({ morseCode }: Digit1PageProps) {
  const [isOn, setOn] = useState(false);
  const router = useRouter();
  const play = (onTime: number) => {
    setOn(true);
    window?.navigator?.vibrate?.(onTime);
    setTimeout(() => {
      setOn(false);
    }, onTime);
  };
  const morsePlayerRef = useRef<MorsePlayer>(new MorsePlayer(morseCode, play));
  const [hasPlayed, setHasPlayed] = useState(true);

  return (
    <DigitPageLayout
      onMouseDown={async () => {
        try {
          await morsePlayerRef.current.play();
          setHasPlayed(true);
        } catch {}
      }}
      onMouseUp={() => {
        morsePlayerRef.current.cancel();
        setOn(false);
      }}
      isLightMode={isOn}
    >
      <div className={styles.container}>
        <div className={styles.hint}>
          {["HALTEN"].map((w, i) => (
            <span key={i}>{morseEncode(w)}</span>
          ))}
        </div>
        {hasPlayed && (
          <PasswordForm
            checkEndpoint="/api/digits/1"
            onSuccess={() => {
              router.push("/");
            }}
          />
        )}
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
      morseCode: morseEncode(process.env.DIGIT_1_PASSWORD || ""),
      solution: req.session.solution || [null, null, null],
    },
  };
}, sessionOptions);
