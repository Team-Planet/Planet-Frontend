import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

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
  fontWeight: 700,
};

export default function UserBoard({ boardId, title }) {
  return (
    <Link to={`/Boards/${boardId}`}>
      <Box style={userBoardStyle}>{title}</Box>
    </Link>
  );
}
