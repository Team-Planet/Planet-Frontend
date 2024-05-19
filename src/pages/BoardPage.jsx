import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getCurrentBoard } from "../services/boardService";
import { Box, CircularProgress, responsiveFontSizes } from "@mui/material";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getListCards } from "../services/cardService";
import Memberlist from "../components/Memberlist";
import CardModal from "../components/CardModal";
export default function BoardPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const currentBoard = useSelector((state) => state.board.currentBoard);
  const [members, setMembers] = useState([]);
  const [stateOfCard, setStateOfCard] = useState(false);
  const [cardId, setCardId] = useState('');
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

  const handleCardClose = () =>{
    setStateOfCard(false);
  }
  return (
    <>
      {<CardModal cardId = {cardId} state = {stateOfCard} handleClose={handleCardClose}/>}
      <Memberlist members={members} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {currentBoard.lists.map((list, index) => (
          <Droppable key={list.id.toString()} droppableId={list.id.toString()}>
            {(provided, snapshot) => {
              const { innerRef, droppableProps } = provided;
              return (
                <ul ref={innerRef} {...droppableProps}>
                  <div>{list.title}</div>
                  {currentBoard.lists
                    .find((x) => x.id === list.id)
                    .cards.map((card, index) => (
                      <Draggable
                        key={card.id.toString()}
                        draggableId={card.id.toString()}
                        index={index}
                      >
                        {(provided) => {
                          const { innerRef, draggableProps, dragHandleProps } =
                            provided;
                          return (
                            <li
                              ref={innerRef}
                              {...draggableProps}
                              {...dragHandleProps}
                              onClick={() => {
                                setStateOfCard(true);
                                setCardId(card.id)
                              }}
                            >
                              <div>{card.title}</div>
                            </li>
                          );
                        }}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </ul>
              );
            }}
          </Droppable>
        ))}
      </DragDropContext>
    </>
  );
}
