import React from "react";
import { Box, Paper, Typography } from "@mui/material";

export default function BoardList({ list, provided, children }) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <Paper elevation={2} sx={{ padding: 0.3, width:250}}>
        <Typography>{list.title}</Typography>
        {children}
      </Paper>
    </div>
  );
}
