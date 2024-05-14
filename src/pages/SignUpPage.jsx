import React, { useState } from "react";
import { Grid, Typography, FormGroup, TextField, Button } from "@mui/material";
import {signUp}  from "../services/userService";
function SignUpPage({success}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <Grid container style = {containerStyle}>
            <Grid item xs={12} sm={8} md={4} lg={3}>
                <Typography variant="h2" align="center">
                    Kayıt Ol
                </Typography>
                <FormGroup>
                    <TextField onChange={(e) => {setFirstName(e.target.value)}} fullWidth variant="outlined" label="Ad" type="firstName" margin="dense"/>
                </FormGroup>
                <FormGroup>
                    <TextField onChange={(e) => {setLastName(e.target.value)}} fullWidth variant="outlined" label="Soyad" type="lastName" margin="dense"/>
                </FormGroup>
                <FormGroup>
                    <TextField onChange={(e) => {setEmail(e.target.value)}} fullWidth variant="outlined" label="E-Posta adresi" type="email" margin="dense"/>
                </FormGroup>
                <FormGroup>
                    <TextField onChange={(e) => {setPassword(e.target.value)}} fullWidth variant="outlined" label="Şifre" type="password" margin="dense"/>
                </FormGroup>
                <FormGroup>
                    <TextField onChange={(e) => {setConfirmPassword(e.target.value)}} fullWidth variant="outlined" label="Şifre Onay" type="password" margin="dense"/>
                </FormGroup>
                <Button onClick={() => {debugger;signUp(firstName, lastName, email, password, confirmPassword);}} style={{ marginLeft: "auto", display: "block" }} variant="contained">KAYIT OL</Button>
            </Grid>
        </Grid>
    );
}
export default SignUpPage;
const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "1rem",
    
}