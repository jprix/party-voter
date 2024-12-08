import React from "react";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button, Box, Typography } from "@mui/material";
import VoteFlow from "../components/VoteFlow"; // Import the separate VoteFlow component

export default function Home() {
  const { handleLogOut, setShowAuthFlow, isFullyConnected, user } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  console.log("isLoggedIn", isLoggedIn, user);

  const handleLoginClick = () => {
    console.log("handleLoginClick");
    setShowAuthFlow(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      textAlign="center"
      padding={4}
    >
      {!isLoggedIn ? (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome to the 2024 Annual Parisi Pajama Party
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please login to vote
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </>
      ) : (
        <VoteFlow voter={user} />
      )}
    </Box>
  );
}
