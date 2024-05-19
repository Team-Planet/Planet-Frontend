import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  dividerClasses,
  TextField,
  colors,
} from "@mui/material";
import { getCardInfo, editCardTitle } from "../services/cardService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function CardModal({ cardId, handleClose, state }) {
  const [isLoading, setIsLoading] = useState(true);
  const currentCard = useSelector((state) => state.card.currentCard);
  const [isEditForTitle, setIsEditForTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  async function fetchData() {
    const cardResponse = await getCardInfo(cardId);
    if (cardResponse.isSuccess) {
      setIsLoading(!cardResponse.isSuccess);
    }
  }
  const styleOfBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "75%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    bgcolor: "#474747",
    color: "white",
  };
  const styleOfTextField = {
    color: "white",
    border: 2,
    borderRadius: "7%",
    borderColor: "#337DFF",
    padding: "5px",
    fontSize: "1.15rem",
  };
  useEffect(() => {
    if (state) {
      setIsEditForTitle(false);
      fetchData();
    }
  }, [state]);

  const openEditTitle = (e) => {
    setIsEditForTitle(true);
    setNewTitle(currentCard.title);
  };

  const editTitle = async (event) => {
    console.log(event.which);
    if (
      event.keyCode === 13 ||
      (event.relatedTarget && event.relatedTarget.nodeName !== "BODY")
    ) {
      const editTitleResponse = await editCardTitle({
        cardId: cardId,
        title: newTitle,
      });
      if (editTitleResponse.isSuccess) {
        fetchData();
      }
      setIsEditForTitle(false);
    }
  };
  if (isLoading && state) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (state) {
    return (
      <Modal
        open={state}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOfBox}>
          {isEditForTitle ? (
            <TextField
              id="standard-basic"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ input: styleOfTextField }}
              onKeyDown={editTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={editTitle}
              defaultValue={currentCard.title}
            />
          ) : (
            <Typography
              onClick={openEditTitle}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {currentCard.title}
            </Typography>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {currentCard.description}
          </Typography>
          <Typography>{cardId}</Typography>
        </Box>
      </Modal>
    );
  }
}
