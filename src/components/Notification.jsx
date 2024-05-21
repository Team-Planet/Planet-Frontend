import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popNotification } from "../data/notificationSlice";

export default function Notification() {
  const currentNotification = useSelector(
    (state) => state.notification.currentNotification
  );

  const dispatch = useDispatch();

  return (
    <>
      <Snackbar
        open={currentNotification !== null}
        autoHideDuration={currentNotification?.duration}
        onClose={() => dispatch(popNotification())}
      >
        {currentNotification && (
          <Alert
            severity={currentNotification?.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {currentNotification?.content}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}
