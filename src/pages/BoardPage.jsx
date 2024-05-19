import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getCurrentBoard } from "../services/boardService";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BoardList from "../components/BoardList";
import ListCard from "../components/ListCard";
import { getCardInfo, getListCards, moveCard } from "../services/cardService";
import MemberList from "../components/MemberList";
import CardModal from "../components/CardModal";

export default function BoardPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const currentBoard = useSelector((state) => state.board.currentBoard);
  const [members, setMembers] = useState([]);
  const [stateOfCard, setStateOfCard] = useState(false);
  const [cardId, setCardId] = useState("");
  async function fetchData() {
    const response = await getCurrentBoard(id);
    await Promise.all(response.body.lists.map((l) => getListCards(l.id)));
    setIsLoading(!response.isSuccess);
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const cardId = result.draggableId;
    const destinationId = result.destination.droppableId;
    const destinationIndex = result.destination.index;
    const sourceId = result.source.droppableId;
    const sourceIndex = result.source.index;

    if (destinationId === sourceId && destinationIndex === sourceIndex) return;

    const destinationList = currentBoard.lists.find(
      (l) => l.id === destinationId
    );

    const oldOrder = currentBoard.lists
      .flatMap((l) => l.cards)
      .find((c) => c.id === cardId).order;
    let newOrder = 0;

    if (destinationId === sourceId) {
      if (destinationIndex === 0) {
        newOrder =
          destinationList.cards.length > 0
            ? destinationList.cards[0].order / 2
            : 1024;
      } else if (destinationIndex === destinationList.cards.length - 1) {
        newOrder = destinationList.cards[destinationIndex].order + 1024;
      } else {
        newOrder =
          (destinationList.cards[
            destinationIndex > sourceIndex
              ? destinationIndex + 1
              : destinationIndex - 1
          ].order +
            destinationList.cards[destinationIndex].order) /
          2;
      }
    } else {
      if (destinationIndex === 0) {
        newOrder =
          destinationList.cards.length > 0
            ? destinationList.cards[0].order / 2
            : 1024;
      } else if (destinationIndex === destinationList.cards.length) {
        newOrder = destinationList.cards[destinationIndex - 1].order + 1024;
      } else {
        newOrder =
          (destinationList.cards[destinationIndex - 1].order +
            destinationList.cards[destinationIndex].order) /
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
  return (
    <>
      {
        <CardModal
          cardId={cardId}
          state={stateOfCard}
          handleClose={handleCardClose}
        />
      }
      <MemberList members={members} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Stack direction="row" spacing={3}>
          {currentBoard.lists?.map((list) => (
            <Droppable
              key={list.id.toString()}
              droppableId={list.id.toString()}
            >
              {(provided) => (
                <BoardList list={list} provided={provided}>
                  {list.cards?.map((card, index) => (
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
                            setStateOfCard(true);
                            setCardId(card.id);
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
