import React from "react";
import ReactDOM from "react-dom/client";
import R6dle from "./r6dle.tsx";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";
import { AppTheme } from "./theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <Box sx={{ margin: "20px", textAlign: "center" }}>
        <CssBaseline />
        <R6dle />
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
