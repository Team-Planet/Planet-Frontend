import boardApi from "../api/boardApi";
import {
  setCurrentBoard,
  setUserBoards,
  createBoardList,
} from "../data/boardSlice";
import { store } from "../data/store";

export async function getUserBoards(params) {
  const response = await boardApi.getUserBoards(params);

  if (!response.isSuccess) {
    return;
  }

  store.dispatch(setUserBoards(response.body.items));

  return response;
}

export async function getCurrentBoard(id) {
  const response = await boardApi.getCurrentBoard(id);

  if (response.isSuccess) {
    store.dispatch(setCurrentBoard(response.body));
  }

  return response;
}

export async function addList(boardId) {
  //tekrar bakılacak
  const order = 20;
  const response = await boardApi.createBoardList("Yeni Liste", boardId, order);
  if (response.isSuccess) {
    const payload = {
      id: response.body.listId,
      title: "Yeni Liste",
      boardId: boardId,
      order: order,
    };
    store.dispatch(createBoardList(payload));
  }

  return response;
}
