import { sessionOptions } from "../../../server/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  try {
    const digitNumber = parseInt(req.query.digit as string, 10);
    const envName = `DIGIT_${digitNumber}_PASSWORD`;

    const passwordPattern = process.env[envName];

    if (!passwordPattern) {
      throw new Error(`No password env variable available for digit #${req.query.digit}`);
    }

    const regex = new RegExp(`^${passwordPattern}$` || "", "i");
    if (regex.exec(req.body.password)) {
      req.session.solution = req.session.solution || [null, null, null];
      const solvedDigit: string | undefined = (process.env.SOLUTION || "")[digitNumber - 1];
      req.session.solution[digitNumber - 1] = solvedDigit ? parseInt(solvedDigit, 10) : null;
      await req.session.save();
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false });
  }
}, sessionOptions);
