import React from "react";
import { Box, Paper, Typography, styled } from "@mui/material";

const BoardListPaper = (props) => (
  <Paper sx={{ backgroundColor: "#2b2d42", padding: 1, width: 280, borderRadius: 1.5 }}>
    {props.children}
  </Paper>
);

const CardBox = (props) => (
  <Box sx={{
    px:1,
    borderRadius: 0.5,
    maxHeight: "60vh",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8d99ae",
      borderRadius: 2
    },
  }}>
    {props.children}
  </Box>
);

export default function BoardList({ list, provided, children }) {
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <BoardListPaper elevation={10} sx={{ padding: 0.3, width: 250 }}>
        <Typography fontWeight={500} textAlign="right" color="#edf2f4" sx={{px: 1, py: 0.5}}>{list.title}</Typography>
        <CardBox>
        {children}
        </CardBox>
      </BoardListPaper>
    </div>
  );
}
