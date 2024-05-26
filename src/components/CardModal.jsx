import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  Checkbox,
  ListItemText,
  InputAdornment,
  Grid,
} from "@mui/material";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import DescriptionIcon from '@mui/icons-material/Description';
import {
  getCardInfo,
  editCardTitle,
  editCardDesc,
} from "../services/cardService";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "../styles/CardModal.css";
export default function CardModal({
  cardId,
  listName,
  handleClose,
  state,
  cardResponse,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const currentCard = useSelector((state) => state.card.currentCard);
  const [isEditForTitle, setIsEditForTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isLabelSelectorOpen, setIsLabelSelectorOpen] = useState(false);

  const [isEditForDesc, setIsEditForDesc] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [initials, setInitials] = useState([]);
  const [checked, setChecked] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [comments, setComments] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [nameOfList, setNameOfList] = useState("");
  function fetchData() {
    if (cardResponse.isSuccess) {
      const initialArray = cardResponse.body.users.map((user) => {
        const names = user.fullName ? user.fullName.split(" ") : [];
        const firstNameInitial = names[0] ? names[0][0].toUpperCase() : "";
        const lastNameInitial =
          names.length > 1 ? names[names.length - 1][0].toUpperCase() : "";
        return `${firstNameInitial}${lastNameInitial}`;
      });

      setInitials(initialArray);

      const checkListsArray = cardResponse.body.checkLists.map((checkList) => ({
        title: checkList.title,
        items: checkList.items.map((item) => item.content),
      }));
      setCheckLists(checkListsArray);
      const commentsArray = cardResponse.body.comments.map((comment) => {
        return comment;
      });
      setComments(commentsArray);
      setNewTitle(cardResponse.body.title);
      setStartDate(cardResponse.body.startDate?.split("T")[0]);
      setEndDate(cardResponse.body.endDate?.split("T")[0]);
      setIsLoading(!cardResponse.isSuccess);
      setNameOfList(listName);
    }
  }

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
        className="modal"
      >
        <Box className="modal-content">
          <Grid>
            <TextField
              className="custom-textfield"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubtitlesIcon />
                  </InputAdornment>
                ),
              }}
              //sx={{ input: styleOfTextField }}
              size="medium"
              onKeyDown={(e) => editElements(e, "title")}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={(e) => editElements(e, "title")}
              defaultValue={currentCard.title}
            />
          </Grid>
          <Grid>
            <Typography className="list-name">
              {listName} isimli listede
            </Typography>
          </Grid>
          <br />
          <InputAdornment position="start" className="desc-icon">
            <DescriptionIcon />
            <Typography className="desc-icon-text">Açıklama</Typography>
          </InputAdornment>
          <Grid>
            <TextField
              className="custom-richtextbox"
              variant="outlined"
              //style={{ textAlign: "left" }}
              multiline
              rows={5}
              onKeyDown={(e) => editElements(e, "desc")}
              onChange={(e) => setNewDesc(e.target.value)}
              onBlur={(e) => editElements(e, "desc")}
              defaultValue={currentCard.description}
            />
          </Grid>

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
          <List>
            {checkLists.map((checkList, index) => (
              <li key={index}>
                <ul>
                  <Typography>{checkList.title}</Typography>
                  {checkList.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex}>
                      <Checkbox
                        edge="start"
                        checked={item.checked}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
          <List>
            {comments.map((comment, index) => (
              <li key={index}>
                <ul>{comment.content}</ul>
              </li>
            ))}
          </List>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker label="Start Date" defaultValue={dayjs(startDate)} />
              <DatePicker label="End Date" defaultValue={dayjs(endDate)} />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Modal>
    );
  }
}
