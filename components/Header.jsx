import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Link as MuiLink,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useIsLoggedIn, useDynamicContext } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const { handleLogOut, setShowAuthFlow } = useDynamicContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoginClick = () => {
    setShowAuthFlow(true);
  };

  const handleLogoutClick = () => {
    handleLogOut();
    localStorage.clear();
  };

  if (!isClient) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px",
          paddingX: 2,
        }}
      >
        {/* Logo as text */}
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#4779FF", fontWeight: "bold" }}
        >
          Pajama Party 24
        </Typography>

        {/* Right side links */}
        <Box>
          {isLoggedIn ? (
            <MuiLink
              onClick={handleLogoutClick}
              sx={{
                cursor: "pointer",
                color: "#4779FF",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Logout
            </MuiLink>
          ) : (
            <MuiLink
              onClick={handleLoginClick}
              sx={{
                cursor: "pointer",
                color: "#4779FF",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </MuiLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
