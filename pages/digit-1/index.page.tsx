import { DigitPageLayout } from "../../components/layouts/DigitPageLayout";
import { sessionOptions } from "../../server/session";
import { MorsePlayer } from "./morse";
import { withIronSessionSsr } from "iron-session/next";
import { encode as morseEncode } from "morse";
import { ReactElement, useEffect, useRef, useState } from "react";

export interface Digit1PageProps {
  // string of "-", "." and " "
  morseCode: string;
}

export default function Digit1Page({ morseCode }: Digit1PageProps) {
  const [isOn, setOn] = useState(false);
  const play = (onTime: number) => {
    setOn(true);
    window?.navigator?.vibrate?.(onTime);
    setTimeout(() => {
      setOn(false);
    }, onTime);
  };
  const morsePlayerRef = useRef<MorsePlayer>(new MorsePlayer(morseCode, play));

  return (
    <DigitPageLayout
      onMouseDown={() => {
        morsePlayerRef.current.play();
      }}
      onMouseUp={() => {
        morsePlayerRef.current.cancel();
      }}
      isLightMode={isOn}
    >
      {morseEncode("HOLD")}&nbsp;&nbsp;&nbsp;{morseEncode("ON")}
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
      morseCode: morseEncode(process.env.FIRST_DIGIT_PASSWORD || ""),
    },
  };
}, sessionOptions);
