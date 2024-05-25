import {
  AppBar,
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Tooltip,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {blue, red, grey} from "@mui/material/colors"

import React from "react";
import { useSelector } from "react-redux";

const navbarSx = {
    bgcolor: grey[100],
  py: 1,
};

export default function Navbar() {
  const userInformation = useSelector((state) => state.user.userInformation);

  return (
    <Box sx={navbarSx}>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center">
          <Box marginRight={10}>
            <Typography variant="h3" fontSize={30}>
              Planet
            </Typography>
          </Box>
          <Stack ml="auto" direction="row" alignItems="center" spacing={2}>
            <Box>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </Box>
            <Tooltip title="Emre Özgenç">
              <IconButton>
                <Avatar />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
