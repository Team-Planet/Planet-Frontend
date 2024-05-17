import React from "react";
import { Box, Paper } from "@mui/material";

export default function BoardList({ provided, children }) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <Paper elevation={2} sx={{padding: 0.3}}>{children}</Paper>
      
    </div>
  );
}
