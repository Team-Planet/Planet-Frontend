import React from 'react'
import { TextField, Button, Paper } from '@mui/material'

export default function LoginForm() {
  return (
    <div>
        <TextField fullWidth label="E-Posta adresi" variant="outlined" />
        <TextField fullWidth label="Şifre" type="password" variant="outlined" sx={{display: 'block', mt: 2, mb: 2, width: "100%"}}/>
        <Button variant="outlined">Outlined</Button>
    </div>
  )
}
