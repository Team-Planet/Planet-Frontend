import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import Notification from "./components/Notification";
import BoardPage from "./pages/BoardPage";
import AuthProvider from "./contexts/AuthContext";
import SignalRProvider from "./contexts/SignalRContext";
import { grey } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    dark: {
      main: "#003049",
    },
    red: {
      main: "#d62828",
    },
    orange: {
      main: "#F77F00",
    },
    yellow: {
      main: "#fcbf49",
    },
    vanilla: {
      main: "#eae2b7",
    },
    blue: {
      main: "#0A1828",
    },
    turqoise: {
      main: "#30d5c8",
    },
    gold: {
      main: "#BFA181",
    },
    paper: {
      main: grey[900]
    },
    accent: {
      main: grey[500]
    },
    header: {
      main: grey[900],
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <SignalRProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignIn" element={<SignInPage />} />
            <Route path="/SignUp" element={<SignUpPage />} />
            <Route path="/Boards/:id" element={<BoardPage />} />
          </Routes>
          {<Notification />}
        </ThemeProvider>
      </SignalRProvider>
    </AuthProvider>
  );
}

export default App;
