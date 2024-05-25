import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";

export default function ButtonLoading(props) {
  const { buttonSx, containerSx, loading, content, onClick, type, startIcon } = props;
  return (
    <Box sx={{...containerSx, position: "relative"}}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={loading}
        onClick={onClick}
        type={type}
        startIcon={startIcon}
      >
        {content}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
