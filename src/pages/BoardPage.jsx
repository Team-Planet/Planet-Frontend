import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentBoard } from "../services/boardService";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BoardList from "../components/BoardList";
import ListCard from "../components/ListCard";
import { getCardInfo, getListCards } from "../services/cardService";
import MemberList from "../components/MemberList";

export default function BoardPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const currentBoard = useSelector((state) => state.board.currentBoard);

  async function fetchData() {
    const response = await getCurrentBoard(id);
    const listCardPromises = response.body.lists.map((l) => getListCards(l.id));
    const listCards = await Promise.all(listCardPromises);
    setIsLoading(!response.isSuccess);
  }

  function handleOnDragEnd(result) {}

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

  return (
    <>
      <MemberList members={currentBoard.members} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Stack direction="row" spacing={3}>
          {currentBoard.lists?.map((list) => (
            <Droppable
              key={list.id.toString()}
              droppableId={list.id.toString()}
            >
              {(provided) => (
                <BoardList list={list} provided={provided}>
                  {list.cards?.map((card) => (
                    <Draggable
                      key={card.id.toString()}
                      draggableId={card.id.toString()}
                      index={card.order}
                    >
                      {(provided) => (
                        <ListCard card={card} provided={provided} />
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
