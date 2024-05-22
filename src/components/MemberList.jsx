import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function MemberList() {
  const currentBoard = useSelector(state => state.board.currentBoard);
  return (
    <Box>
      <h2>Board Members</h2>
      <ul>
        {currentBoard.members.map((member) => (
          <li key={member.id}>
            {member.firstName} {member.lastName}
          </li>
        ))}
      </ul>
    </Box>
  );
}
