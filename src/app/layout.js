"use client"
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";  

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
