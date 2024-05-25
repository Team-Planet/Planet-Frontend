import React, { Children } from "react";
import { Paper, Box, Divider, Typography, Stack } from "@mui/material";

export default function MainPaper(props) {
  return (
    <Paper elevation={1} sx={{ p: 2 }}>
      <Stack spacing={1} direction="row" alignItems="center">
        {props.icon}
        <Typography
          variant="h6"
          fontSize={20}
          display="flex"
          alignItems="center"
        >
          <Box ml="10">{props.title}</Box>
        </Typography>
      </Stack>
      <Divider />
      <Box mt={2}>{props.children}</Box>
    </Paper>
  );
}
