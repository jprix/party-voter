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

      // Tally votes with firstName
      const tally = votes.reduce(
        (acc, vote) => {
          // Male tally
          if (!acc.male[vote.maleVote]) {
            acc.male[vote.maleVote] = {
              firstName: vote.maleFirstName || "Unknown",
              count: 0,
            };
          }
          acc.male[vote.maleVote].count += 1;

          // Female tally
          if (!acc.female[vote.femaleVote]) {
            acc.female[vote.femaleVote] = {
              firstName: vote.femaleFirstName || "Unknown",
              count: 0,
            };
          }
          acc.female[vote.femaleVote].count += 1;

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
