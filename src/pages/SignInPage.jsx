import React from 'react'
import { Box, Grid, TextField, Button, Link, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material'

export default function SignInPage() {

    return (
        <Grid container style={containerStyle} >
            <Grid item xs={12} sm={8} md={4} lg={3}>
                <Box>
                    <Typography variant="h2" align="center">
                        Planet
                    </Typography>
                    <FormGroup>
                        <TextField fullWidth variant="outlined" label="E-Posta adresi" type="email" margin="dense" />
                    </FormGroup>
                    <FormGroup sx={{marginBottom: 1}}>
                        <TextField fullWidth variant="outlined" label="Şifre" type="password" margin="dense" />
                    </FormGroup>
                    <Link href="#" underline="none">Üye değil misin? Kayıt ol!</Link>
                    <Button style={{ marginLeft: "auto", display: "block" }} variant="contained">GİRİŞ YAP</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "1rem",
    
}
