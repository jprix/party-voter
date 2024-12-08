import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "votes.json");

  if (req.method === "GET") {
    try {
      // Ensure the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "No votes have been recorded yet." });
      }

      // Read votes from file
      const votes = JSON.parse(fs.readFileSync(filePath, "utf8"));

      // Tally votes
      const tally = votes.reduce(
        (acc, vote) => {
          acc.male[vote.maleVote] = (acc.male[vote.maleVote] || 0) + 1;
          acc.female[vote.femaleVote] = (acc.female[vote.femaleVote] || 0) + 1;
          return acc;
        },
        { male: {}, female: {} }
      );

      res.status(200).json(tally);
    } catch (error) {
      console.error("Error tallying votes:", error);
      res.status(500).json({ error: "An error occurred while tallying votes." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
