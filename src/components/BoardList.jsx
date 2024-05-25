import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Directions } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ButtonLoading from "./ButtonLoading";
import { createCard } from "../services/cardService";

const BoardListPaper = (props) => (
  <Paper
    sx={{
      backgroundColor: "#2b2d42",
      padding: 1,
      width: 280,
      borderRadius: 1.5,
    }}
  >
    {props.children}
  </Paper>
);

const CardBox = (props) => (
  <Box
    sx={{
      px: 1,
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
        borderRadius: 2,
      },
    }}
  >
    {props.children}
  </Box>
);

export default function BoardList({ list, provided, children }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleOnClick(e) {
    setIsLoading(true);
    await createCard(list.id);
    setIsLoading(false);
  }

  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      <BoardListPaper elevation={10} sx={{ padding: 0.3, width: 250 }}>
        <Typography
          fontWeight={500}
          textAlign="right"
          color="#edf2f4"
          sx={{ px: 1, py: 0.5 }}
        >
          {list.title}
        </Typography>
        <CardBox>{children}</CardBox>
        <Box sx={{px: 1, pt: 0.5}}>
          <ButtonLoading
            containerSx={{width: "fit-content"}}
            color="primary"
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            content="KART OLUŞTUR"
            loading={isLoading}
            onClick={handleOnClick}
          />
        </Box>
      </BoardListPaper>
    </div>
  );
}
