import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'

export default function Notification({ content, isSuccess = true, duration = 5000 }) {
    const [open, setOpen] = useState(true);
    return (
        <>
            <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={duration}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {content}
                </Alert>
            </Snackbar>
        </>
    );
}
