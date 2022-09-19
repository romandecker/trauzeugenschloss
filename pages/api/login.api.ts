import { NextApiRequest, NextApiResponse } from "next";

export default function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  res.status(200).json({ success: req.body.password === process.env.ENTRY_PASSWORD });
}
