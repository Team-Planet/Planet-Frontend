import cardApi from "../api/cardApi";
import { moveCardBackward, moveCardForward, setListCards } from "../data/boardSlice";
import { setCurrentCard } from "../data/cardSlice";
import { store } from "../data/store";

export async function getListCards(listId) {
  const response = await cardApi.getListCards({
    pageSize: 30,
    currentPage: 1,
    listId: listId,
  });

  if (response.isSuccess) {
    store.dispatch(
      setListCards({ cards: response.body.items, listId: listId })
    );
  }

  return response;
}

export async function getCardInfo(id) {
  const response = await cardApi.getCardInfo(id);

  if (response.isSuccess) {
    store.dispatch(setCurrentCard(response.body));
  }

  return response;
}

export async function moveCard(moveArgs) {
  store.dispatch(moveCardForward(moveArgs));

  const response = await cardApi.moveCard({
    cardId: moveArgs.cardId,
    newListId: moveArgs.newListId,
    newOrder: moveArgs.newOrder,
  });

  if (!response.isSuccess) {
    store.dispatch(moveCardBackward(moveArgs));
  }

  return response;
}
