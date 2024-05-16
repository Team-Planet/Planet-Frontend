import cardApi from "../api/cardApi";
import { setListCards } from "../data/boardSlice";
import { store } from "../data/store";

export async function getListCards(listId) {
    const response = await cardApi.getListCards({pageSize: 30, currentPage: 1, listId: listId});

    if(response.isSuccess) {
        store.dispatch(setListCards({cards: response.body.items, listId: listId}));
    }

    return response;
}