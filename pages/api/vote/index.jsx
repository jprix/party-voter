import path from "path";
import fs from "fs";


export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "votes.json");

  if (req.method === "POST") {
    const { userId, maleVote, femaleVote } = req.body;

    const votes = JSON.parse(fs.readFileSync(filePath, "utf8"));

    votes.push({
      userId, // This will now store the email
      maleVote,
      femaleVote,
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(votes, null, 2), "utf8");

    res.status(200).json({ success: true, message: "Vote recorded successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
