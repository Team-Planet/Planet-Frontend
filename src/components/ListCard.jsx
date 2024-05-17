import { Typography, Box, Paper, Stack } from "@mui/material";
import React from "react";

export default function ListCard({ provided, card }) {
    console.log(card);
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
    <Box sx={{border: "1px lightgray solid", borderRadius: "5px", marginBottom: 0.2}}>
      <Paper elevation={1} sx={{padding: 1}}>
        <Stack direction="row" spacing={1} minHeight={12} mb={1}>
          {card.labels.map((label, index) => 
            <Box p={0.2} style={{borderRadius: "5px"}} key={index} sx={{ backgroundColor: `${label.colorCode}` }}>
                <Typography fontSize={12} fontWeight={500}>
                    {label.title}
                </Typography>
            </Box>
          )}
        </Stack>
        <Box>
          <Typography>{card.title}</Typography>
        </Box>
      </Paper>
    </Box>
    </div>
  );
}
