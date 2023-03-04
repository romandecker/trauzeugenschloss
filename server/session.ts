if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET not set");
}

export const sessionOptions = {
  cookieName: "ts-session",
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.SESSION_SECURE === "true",
  },
} as const;

declare module "iron-session" {
  interface IronSessionData {
    user?: Record<string, unknown>;
    solution?: [number | null, number | null, number | null];
  }
}
