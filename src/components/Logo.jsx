import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/planet.svg"

export default function Logo() {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "evenly", width: "fit-content", marginX:"auto"}}>
            <img src={logo} style={{color: "red"}}/>
            <Typography ml={1} fontSize={50} fontWeight={500} fontFamily="Open Sans" color="primary">Planet</Typography>
        </Box>
    );
}
