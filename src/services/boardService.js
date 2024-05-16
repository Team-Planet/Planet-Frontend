import boardApi from "../api/boardApi";
import { setCurrentBoard, setUserBoards } from "../data/boardSlice";
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
