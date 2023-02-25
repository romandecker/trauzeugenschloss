const TIMES = {
  ".": 200,
  "-": 1000,
  " ": 2000,
  gap: 200,
} as const;

export class MorsePlayer {
  timeout?: ReturnType<typeof setTimeout>;

  constructor(readonly morseCode: string, private readonly playSingle: (onTime: number) => void) {}

  async play(): Promise<void> {
    for (let i = 0; i < this.morseCode.length; i++) {
      const ch = this.morseCode.charAt(i);
      const onTime = TIMES[ch as keyof typeof TIMES];
      if (ch !== " ") {
        this.playSingle(onTime);
      }

      await new Promise((resolve) => {
        this.timeout = setTimeout(resolve, onTime + TIMES.gap);
      });

      if (!this.timeout) {
        break;
      }
    }
  }

  cancel() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }
}

const playNext = (play: (onTime: number) => void, [ch, ...rest]: readonly string[]) => {
  if (ch === undefined) {
    return () => {};
  }

  if (!(ch in TIMES)) {
    throw new Error(`Invalid morse code character "${ch}"`);
  }

  const onTime = TIMES[ch as keyof typeof TIMES];

  play(onTime);

  const timeout = setTimeout(() => playNext(play, rest), TIMES.gap + onTime);

  return () => clearTimeout(timeout);
};
