import React from 'react'
import { Box } from '@mui/material'

const userBoardStyle = {
    backgroundColor: "skyblue",
    display: "flex",
    justifyContent: "start",
    alignItems: "end",
    padding: "1rem",
    cursor: "pointer",
    fontSize: "0.8rem",
    borderRadius: "0.4rem",
    height: "75px",
    fontWeight: 700
}

export default function UserBoard({boardId, title}) {
  return (
    <Box style={userBoardStyle}>
        {title}
    </Box>
  )
}
