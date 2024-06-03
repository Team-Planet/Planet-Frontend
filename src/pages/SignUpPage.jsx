import React, { useState } from "react";
import { Grid, Typography, FormGroup, TextField, Box } from "@mui/material";
import { signUp } from "../services/userService";
import ButtonLoading from "../components/ButtonLoading";
import { Navigate } from "react-router-dom";
import Logo from "../components/Logo";
import background from '../assets/bg_signin_signup.jpg';
import { useAuth } from "../contexts/AuthContext";

export function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirmPassword] = useState("");
  const [validationMessages, setValidationMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const {isAuthenticated} = useAuth();

  async function handleSignUp(event) {
    if (isLoading) return;

    event.preventDefault();
    setIsLoading(true);
    const response = await signUp(
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    );
    setIsSignedUp(response.isSuccess);
    setValidationMessages(response.validationMessages);
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSignUp}>
      {isAuthenticated && <Navigate to="/" />}
      {isSignedUp && <Navigate to="/SignIn" />}
      <Grid container style={containerStyle}>
        <Grid item xs={12} sm={8} md={4} lg={3}>
          <Box sx={boxStyle}>
            <Logo />
            <FormGroup>
              <TextField
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                fullWidth
                variant="outlined"
                label="Ad"
                type="firstName"
                margin="dense"
                error={validationMessages.some((m) =>
                  m.code.startsWith("FirstName")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("FirstName"))
                    ?.message
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                fullWidth
                variant="outlined"
                label="Soyad"
                type="lastName"
                margin="dense"
                error={validationMessages.some((m) =>
                  m.code.startsWith("LastName")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("LastName"))
                    ?.message
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                fullWidth
                variant="outlined"
                label="E-Posta adresi"
                type="email"
                margin="dense"
                error={validationMessages.some((m) =>
                  m.code.startsWith("Email")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("Email"))
                    ?.message
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                fullWidth
                variant="outlined"
                label="Şifre"
                type="password"
                margin="dense"
                error={validationMessages.some((m) =>
                  m.code.startsWith("Password")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("Password"))
                    ?.message
                }
              />
            </FormGroup>
            <FormGroup>
              <TextField
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                fullWidth
                variant="outlined"
                label="Şifre Onay"
                type="password"
                margin="dense"
                error={validationMessages.some((m) =>
                  m.code.startsWith("Password")
                )}
                helperText={
                  validationMessages.find((m) => m.code.startsWith("Password"))
                    ?.message
                }
              />
            </FormGroup>
            <ButtonLoading
              containerSx={{ marginTop: 2, ml: "auto", width: "fit-content" }}
              type="submit"
              content="KAYIT OL"
              loading={isLoading}
            />
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignUpPage;

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "1rem",
  background: `url(${background})`,
  backgroundSize: "100% auto",
  backgroundPosition: "center bottom"
};

const boxStyle = {
  backgroundColor: "rgba(255, 255, 255, 1)",
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};
