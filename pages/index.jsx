import React from "react";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button, Box } from "@mui/material";
import VoteFlow from "../components/VoteFlow"; // Import the separate VoteFlow component

export default function Home() {
  const { handleLogOut, setShowAuthFlow, isFullyConnected,user } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  console.log("isLoggedIn", isLoggedIn, user);  

  // if (!context) {
  //   console.error("Dynamic context is not available.");
  //   return <div>Dynamic context is not initialized.</div>;
  // }

  const handleLoginClick = () => {
    console.log("handleLoginClick");
    setShowAuthFlow(true);
};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      {!isLoggedIn ? (
        <Button
          variant="contained"
          onClick={handleLoginClick}
        >
          Login
        </Button>
      ) : (
        <VoteFlow voter={user}/>
      )}
    </Box>
  );
}
