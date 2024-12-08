import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import DynamicProviders from "../providers/DynamicProviders";

function MyApp({ Component, pageProps }) {
  // Define the theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFC107", // Gold color for warmth
      },
      secondary: {
        main: "#64B5F6", // Soft blue
      },
      background: {
        default: "#F3E5F5", // Light purple for cozy vibes
        paper: "#FFF8E1", // Light gold for card backgrounds
      },
    },
    typography: {
      fontFamily: "'Comic Sans MS', 'Roboto', sans-serif", // Playful font
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/stars-pattern.png')", // Replace with your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <DynamicProviders>
          <Component {...pageProps} />
        </DynamicProviders>
      </Box>
    </ThemeProvider>
  );
}

export default MyApp;
