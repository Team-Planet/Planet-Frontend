import { Box } from "@mui/material";
import React from "react";

export default function Memberlist({ members }) {
  return (
    <Box>
      <h2>Board Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.firstName} {member.lastName}
          </li>
        ))}
      </ul>
    </Box>
  );
}
