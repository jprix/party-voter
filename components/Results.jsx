import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid2,
} from "@mui/material";

export default function Results() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/tally");
        if (!response.ok) throw new Error("Failed to fetch results");
        const data = await response.json();
        setResults(data);
        console.log("Results", data);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults(); // Fetch immediately
    const interval = setInterval(fetchResults, 15000); // Poll every 15 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!results) {
    return (
      <Typography variant="h6" color="error" align="center">
        No results available at the moment.
      </Typography>
    );
  }

  const sortCategoryVotes = (categoryVotes) => {
    return Object.entries(categoryVotes)
      .map(([email, details]) => ({
        email,
        firstName: details.firstName,
        count: details.count,
      }))
      .sort((a, b) => b.count - a.count); // Sort descending by votes
  };
  

  const maleResults = sortCategoryVotes(results.male);
  const femaleResults = sortCategoryVotes(results.female);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      gap={4}
    >
      <Typography variant="h4" align="center" gutterBottom>
        🎉 Leaderboard 🎉
      </Typography>
      <Grid2 container spacing={4} justifyContent="center">
        {/* Male Results */}
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Best Male Costume
              </Typography>
              {maleResults.map(({ email, firstName, count }, index) => (
                <Typography
                  key={email}
                  align="center"
                  style={{
                    fontWeight: index === 0 ? "bold" : "normal",
                    fontSize: index === 0 ? "1.5em" : "1.2em",
                    marginBottom: "0.5em",
                    color: index === 0 ? "#FFD700" : "#000", // Gold for 1st place
                  }}
                >
                  {index + 1}. {firstName} ({email}): {count}{" "}
                  {count === 1 ? "vote" : "votes"}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid2>

        {/* Female Results */}
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Best Female Costume
              </Typography>
              {femaleResults.map(({ email, firstName, count }, index) => (
                <Typography
                  key={email}
                  align="center"
                  style={{
                    fontWeight: index === 0 ? "bold" : "normal",
                    fontSize: index === 0 ? "1.5em" : "1.2em",
                    marginBottom: "0.5em",
                    color: index === 0 ? "#FFD700" : "#000", // Gold for 1st place
                  }}
                >
                  {index + 1}. {firstName} ({email}): {count}{" "}
                  {count === 1 ? "vote" : "votes"}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}
