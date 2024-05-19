import { Typography, Box, Paper, Stack } from "@mui/material";
import React from "react";

function getContrastTextColor(hexcolor){
  if(hexcolor.indexOf("#") !== -1) {
    hexcolor = hexcolor.replace("#", "");
  }

  var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? "black" : "white";
}

export default function ListCard({ provided, card, onClick }) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={e => onClick(e)}
    >
    <Box sx={{border: "1px lightgray solid", borderRadius: "5px", marginBottom: 0.2}}>
      <Paper elevation={1} sx={{padding: 1}}>
        <Stack direction="row" spacing={1} mb={1}>
          {card.labels.map((label, index) => 
            <Box p={0.4} style={{borderRadius: "5px"}} key={index} sx={{ backgroundColor: `${label.colorCode}` }}>
                <Typography fontSize={12} fontWeight={500} color={getContrastTextColor(label.colorCode)}>
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
