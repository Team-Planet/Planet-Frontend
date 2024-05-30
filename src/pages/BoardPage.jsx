import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getCurrentBoard } from "../services/boardService";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BoardList from "../components/BoardList";
import ListCard from "../components/ListCard";
import {
  getCardInfo,
  getListCards,
  handleCardMovedEvent,
  moveCard,
} from "../services/cardService";
import MemberList from "../components/MemberList";
import CardModal from "../components/CardModal";
import * as signalR from "@microsoft/signalr";

export default function BoardPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const currentBoard = useSelector((state) => state.board.currentBoard);
  const listCards = useSelector((state) => state.card.listCards);
  const [members, setMembers] = useState([]);
  const [stateOfCard, setStateOfCard] = useState(false);
  const [cardId, setCardId] = useState("");
  const [responseCard, setResponseCard] = useState({});
  const [listName, setListName] = useState("");
  const [cardStartDate, setCardStartDate] = useState("");
  const [cardEndDate, setCardEndDate] = useState("");
  async function fetchData() {
    const response = await getCurrentBoard(id);
    await getListCards(response.body.lists.map((l) => l.id));
    setIsLoading(false);
    await connectHub(id);
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const cardId = result.draggableId;
    const destinationId = result.destination.droppableId;
    const destinationIndex = result.destination.index;
    const sourceId = result.source.droppableId;
    const sourceIndex = result.source.index;

    if (destinationId === sourceId && destinationIndex === sourceIndex) return;

    const destinationListCards = listCards.filter(
      (c) => c.listId === destinationId
    );

    const oldOrder = listCards.find((c) => c.id === cardId).order;
    let newOrder = 0;

    if (destinationId === sourceId) {
      if (destinationIndex === 0) {
        newOrder =
          destinationListCards.length > 0
            ? destinationListCards[0].order / 2
            : 1024;
      } else if (destinationIndex === destinationListCards.length - 1) {
        newOrder = destinationListCards[destinationIndex].order + 1024;
      } else {
        newOrder =
          (destinationListCards[
            destinationIndex > sourceIndex
              ? destinationIndex + 1
              : destinationIndex - 1
          ].order +
            destinationListCards[destinationIndex].order) /
          2;
      }
    } else {
      if (destinationIndex === 0) {
        newOrder =
          destinationListCards.length > 0
            ? destinationListCards[0].order / 2
            : 1024;
      } else if (destinationIndex === destinationListCards.length) {
        newOrder = destinationListCards[destinationIndex - 1].order + 1024;
      } else {
        newOrder =
          (destinationListCards[destinationIndex - 1].order +
            destinationListCards[destinationIndex].order) /
          2;
      }
    }

    const moveArgs = {
      newListId: destinationId,
      oldListId: sourceId,
      newOrder,
      oldOrder,
      cardId,
      sourceIndex,
      destinationIndex,
    };

    await moveCard(moveArgs);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
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

  const handleCardClose = () => {
    setStateOfCard(false);
  };

  async function fetchDataForCard(cardId) {
    const response = await getCardInfo(cardId);
    setCardStartDate(response.body.startDate?.split("T")[0]);
    setCardEndDate(response.body.endDate?.split("T")[0]);
    setStateOfCard(true);
  }
  return (
    <>
      {
        <CardModal
          cardId={cardId}
          listName={listName}
          state={stateOfCard}
          handleClose={handleCardClose}
          startDate = {cardStartDate}
          endDate = {cardEndDate}
        />
      }
      <MemberList members={members} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Stack direction="row" spacing={3}>
          {currentBoard?.lists?.map((list) => (
            <Droppable
              key={list.id.toString()}
              droppableId={list.id.toString()}
            >
              {(provided) => (
                <BoardList list={list} provided={provided}>
                  {listCards
                    ?.filter((c) => c.listId === list.id)
                    .map((card, index) => (
                      <Draggable
                        key={card.id.toString()}
                        draggableId={card.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <ListCard
                            card={card}
                            provided={provided}
                            onClick={(e) => {
                              setListName(list.title);
                              setCardId(card.id);
                              fetchDataForCard(card.id);
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </BoardList>
              )}
            </Droppable>
          ))}
        </Stack>
      </DragDropContext>
    </>
  );
}

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://planet-api-test.emreozgenc.com/hubs/board", {
    withCredentials: false,
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

async function connectHub(boardId) {
  try {
    await connection.start();
    connection.invoke("JoinBoardGroup", boardId);
  } catch (err) {
    console.error(err);
    setTimeout(() => connectHub(boardId), 5000);
  }
}

connection.on("ReceiveCardMovedEvent", (notification) => {
  handleCardMovedEvent(notification);
});
