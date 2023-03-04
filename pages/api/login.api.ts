import { sessionOptions } from "../../server/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function loginHandler(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
  }
  if (req.body.password === process.env.ENTRY_PASSWORD) {
    req.session.user = {};
    req.session.solution = [null, null, null];
    await req.session.save();
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}, sessionOptions);
