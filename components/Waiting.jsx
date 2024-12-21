import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

export default function Waiting({ setShowResults }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const ninePM = new Date(estTime);
      ninePM.setHours(21, 0, 0, 0); // Set to 9:00 PM EST

      const diff = ninePM - estTime;
      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft(
          `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${
            minutes !== 1 ? "s" : ""
          }, ${seconds} second${seconds !== 1 ? "s" : ""}`
        );
      } else {
        setTimeLeft("");
        setShowResults(true); // Show results when the time is past 9 PM EST
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [setShowResults]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="white"
      padding={4}
      borderRadius="8px"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ color: "#4779FF", fontWeight: "bold" }}
      >
        Time remaining until voting opens: {timeLeft || "Calculating..."}
      </Typography>
    </Box>
  );
}
