import cardApi from "../api/cardApi";
import { setListCards } from "../data/boardSlice";
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

export async function editCardTitle(params){
  const response = await cardApi.editCardTitle({
    cardId: params.cardId,
    title: params.title
  });
  if(response.isSuccess){
    console.log("başarılı");
  }
  return response;
}
