import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Link,
  FormGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { signIn } from "../services/userService";
import ButtonLoading from "../components/ButtonLoading";
import planetLogo from "../assets/planet.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [validationMessages, setValidationMessages] = useState([]);

  async function handleSignIn(event) {
    if (isLoading) return;

    event.preventDefault();
    setIsLoading(true);
    const response = await signIn(email, password);
    setValidationMessages(response.validationMessages);
    setIsLoading(false);
    setIsSignedIn(response.isSuccess);
  }

  return (
    <form onSubmit={handleSignIn}>
      <Grid container style={containerStyle}>
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Box sx={boxStyle}>
            <Typography variant="h2" align="center" sx={titleStyle}>
              Planet
            </Typography>
            <img src={planetLogo} alt="" width={150} height="auto" />
            <FormGroup>
              <TextField
                fullWidth
                variant="outlined"
                label="E-Posta adresi"
                type="email"
                margin="dense"
                onChange={(e) => setEmail(e.target.value)}
                error={validationMessages.some((m) =>
                  m.code.startsWith("Email")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("Email"))
                    ?.message
                }
              />
            </FormGroup>
            <FormGroup sx={{ marginBottom: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Şifre"
                type="password"
                margin="dense"
                onChange={(e) => setPassword(e.target.value)}
                error={validationMessages.some((m) =>
                  m.code.startsWith("Password")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("Password"))
                    ?.message
                }
              />
            </FormGroup>
            <Link component={RouterLink} to="/SignUp" sx={linkStyle}>
              Üye değil misin? Kayıt ol
            </Link>
            <ButtonLoading
              containerSx={{ marginLeft: "auto", width: "fit-content" }}
              type="submit"
              content="GİRİŞ YAP"
              loading={isLoading}
            />
          </Box>
        </Grid>
      </Grid>
      {isSignedIn && <Navigate to="/" />}
    </form>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "1rem",
  backgroundSize: "cover",
};

const boxStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleStyle = {
  color: "#333",
  marginBottom: "1rem",
};

const linkStyle = {
  display: "block",
  textAlign: "left",
  marginTop: "1rem",
  color: "#1976d2",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};
