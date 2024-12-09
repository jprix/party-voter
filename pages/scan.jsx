import React from "react";
import { QRCodeSVG } from "qrcode.react"; // Named import for QRCodeSVG
import { Box, Typography } from "@mui/material";

export default function QRCodePage() {
  const url = "https://local.jasonparisi.com";

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      bgcolor="#f9f9f9"
      padding={2}
    >
      <Typography variant="h4" gutterBottom>
        Scan the QR Code Below
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        padding={4}
        borderRadius="8px"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <QRCodeSVG value={url} size={200} />
      </Box>
      <Typography variant="body1" color="textSecondary" marginTop={2}>
        Or visit <a href={url}>{url}</a>
      </Typography>
    </Box>
  );
}
