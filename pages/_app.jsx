import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DynamicProviders from "../providers/DynamicProviders";

function MyApp({ Component, pageProps }) {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DynamicProviders> 
      <Component {...pageProps} />
      </DynamicProviders>
    </ThemeProvider>
  );
}

export default MyApp;
