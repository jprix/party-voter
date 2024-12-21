import React, { useEffect, useState } from "react";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button, Box, Typography } from "@mui/material";
import VoteFlow from "../components/VoteFlow";
import Results from "../components/Results";
import Waiting from "../components/Waiting"; // Import the Waiting component
import QRCodePage from "./scan";

export default function Home() {
  const { handleLogOut, setShowAuthFlow, isFullyConnected, user } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [showResults, setShowResults] = useState(false);


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
      bgcolor={isLoggedIn ? "#f9f9f9" : "white"}
    >
      {!isLoggedIn ? (
        <>
          <Typography variant="h4" gutterBottom>
            Welcome to the 2024 Annual Parisi Pajama Party
          </Typography>
          <QRCodePage />
          <Typography variant="body1" gutterBottom>
            Please login to vote
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </>
      ) : showResults ? (
        <VoteFlow voter={user} />
        
      ) : (
        <Waiting setShowResults={setShowResults} />
      
      )}
    </Box>
  );
}
