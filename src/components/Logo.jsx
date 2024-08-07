import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/planet.svg";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";

export default function Logo({ size, color }) {
  const theme = useTheme();
  const sizing = size ?? 50;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "evenly",
        width: "fit-content",
        marginX: "auto",
      }}
    >
      <Box color={color}>
        <svg
          fill="currentColor"
          height={sizing * 1.2}
          width={sizing * 1.2}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 490.069 490.069"
          xmlSpace="preserve"
        >
          <path
            d="M386.077,250.852c-1.171-36.599-15.705-72.849-43.642-100.785c-27.762-27.762-63.733-42.296-100.1-43.622
        C161.987,40.12,86.481,0,41.648,0C28.782,0,18.444,3.304,11.241,10.239c-30.588,29.451,4.236,115.896,79.855,212.837
        c-10.73,48.198,2.645,100.683,40.146,138.183c37.613,37.613,90.293,50.959,138.605,40.055
        c71.918,55.699,137.884,88.756,178.574,88.756c12.867,0,23.203-3.303,30.406-10.238
        C511.105,448.749,470.544,354.216,386.077,250.852z M378.027,382.012c-5.224,5.029-14.669,11.024-30.004,11.024
        c-10.477,0-22.563-2.777-36.123-8.238c-11.704-4.715-24.503-11.422-38.354-20.147c-28.026-17.655-57.805-42.017-86.117-70.45
        c-28.185-28.305-52.256-57.979-69.611-85.814c-4.964-7.961-9.243-15.564-12.877-22.818c-9.941-19.844-14.91-37.002-14.762-51.179
        c0.165-15.708,6.614-25.182,11.996-30.364c5.223-5.028,14.668-11.023,30.004-11.025h0.007h0.001c16.37,0,36.647,6.742,60.394,20.019
        c-8.341,2.58-16.5,5.905-24.373,9.98c-14.071-6.498-26.388-10-36.026-9.999c-6.823,0.001-12.313,1.754-16.134,5.433
        c-8.664,8.343-7.437,25.305,1.693,47.129c13.276,31.736,43.265,73.759,83.86,114.528c47.756,47.959,97.57,81.509,130.579,90.514
        c5.839,1.594,11.162,2.434,15.844,2.434c6.823,0,12.312-1.753,16.132-5.432c7.304-7.034,7.579-20.192,2.016-37.225
        c4.639-8.018,8.476-16.371,11.5-24.949c8.331,17.751,12.488,33.233,12.352,46.215C389.858,367.353,383.41,376.827,378.027,382.012z"
          />
        </svg>
      </Box>
      <Typography
        ml={2}
        fontSize={sizing}
        fontWeight={100}
        fontFamily="Open Sans"
        color={color}
      >
        Planet
      </Typography>
    </Box>
  );
}
