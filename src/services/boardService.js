import boardApi from "../api/boardApi";
import { setUserBoards } from "../data/boardSlice";
import {store} from "../data/store"

export async function getUserBoards(params) {
    const response = await boardApi.getUserBoards(params);

    if(!response.isSuccess) {
        return;
    }

    store.dispatch(setUserBoards(response.body.items));

    return response;
}