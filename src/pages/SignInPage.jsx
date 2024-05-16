import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Link,
  FormGroup,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { signIn } from "../services/userService";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function handleSignIn(event) {
    const response = await signIn(email, password);
    setIsSignedIn(response.isSuccess);
  }

  return (
    <>
      <Grid container style={containerStyle}>
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Box>
            <Typography variant="h2" align="center">
              Planet
            </Typography>
            <FormGroup>
              <TextField
                fullWidth
                variant="outlined"
                label="E-Posta adresi"
                type="email"
                margin="dense"
                onChange={(e) => setEmail(e.target.value)}
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
              />
            </FormGroup>
            <Link component={RouterLink} underline="none" to="/SignUpPage">
              Üye değil misin? Kayıt ol!
            </Link>
            <Button
              style={{ marginLeft: "auto", display: "block" }}
              variant="contained"
              onClick={handleSignIn}
            >
              GİRİŞ YAP
            </Button>
          </Box>
        </Grid>
      </Grid>
      {isSignedIn && <Navigate to="/" />}
    </>
  );
}

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "1rem",
};
