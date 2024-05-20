import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  dividerClasses,
  TextField,
  Avatar,
  AvatarGroup,
  colors,
} from "@mui/material";
import {
  getCardInfo,
  editCardTitle,
  editCardDesc,
} from "../services/cardService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function CardModal({ cardId, handleClose, state }) {
  const [isLoading, setIsLoading] = useState(true);
  const currentCard = useSelector((state) => state.card.currentCard);
  const [isEditForTitle, setIsEditForTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isEditForDesc, setIsEditForDesc] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [initials, setInitials] = useState([]);
  async function fetchData() {
    const cardResponse = await getCardInfo(cardId);
    if (cardResponse.isSuccess) {
      setIsLoading(!cardResponse.isSuccess);
      const initialArray = cardResponse.body.users.map((user) => {
        const names = user.fullName ? user.fullName.split(" ") : [];
        const firstNameInitial = names[0] ? names[0][0].toUpperCase() : "";
        const lastNameInitial =
          names.length > 1 ? names[names.length - 1][0].toUpperCase() : "";
        return `${firstNameInitial}${lastNameInitial}`;
      });
      setInitials(initialArray);
      console.log(initials);
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
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  useEffect(() => {
    if (state) {
      setIsEditForTitle(false);
      setIsEditForDesc(false);
      fetchData();
    }
  }, [state]);

  const openEditTitle = () => {
    setIsEditForTitle(true);
    setNewTitle(currentCard.title);
  };

  const openEditDesc = () => {
    setIsEditForDesc(true);
    setNewDesc(currentCard.description);
  };

  const editElements = async (event, element) => {
    if (
      event.keyCode === 13 ||
      (event.relatedTarget && event.relatedTarget.nodeName !== "BODY")
    ) {
      switch (element) {
        case "title":
          setIsEditForTitle(false);
          const editTitleResponse = await editCardTitle({
            cardId: cardId,
            title: newTitle,
          });
          if (editTitleResponse.isSuccess) {
            fetchData();
          }
        case "desc":
          setIsEditForDesc(false);
          const editDescResponse = await editCardDesc({
            cardId: cardId,
            description: newDesc,
          });
          if (editDescResponse.isSuccess) {
            fetchData();
          }
      }
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
              onKeyDown={(e) => editElements(e, "title")}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={(e) => editElements(e, "title")}
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
          {isEditForDesc && currentCard.description !== '' ? (
            <TextField
              id="standard-basic"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{ input: styleOfTextField }}
              onKeyDown={(e) => editElements(e, "desc")}
              onChange={(e) => setNewDesc(e.target.value)}
              onBlur={(e) => editElements(e, "desc")}
              defaultValue={currentCard.description}
            />
          ) : (
            <Typography
              onClick={openEditDesc}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {currentCard.description}
            </Typography>
          )}

          <AvatarGroup max={3}>
            {initials.map((initial, index) => (
              <Avatar
                key={index}
                alt={initial}
                sx={{ bgcolor: getRandomColor() }}
              >
                {initial}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>
      </Modal>
    );
  }
}
