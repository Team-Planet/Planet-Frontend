import cardApi from "../api/cardApi";
import { setCurrentCard, setListCards, moveCardBackward, moveCardForward, changeLabel, createListCard} from "../data/cardSlice";
import { store } from "../data/store";

export async function createCard(listId) {

  const order = store.getState().card.listCards.filter(c => c.listId === listId).reverse()[0].order + 1024;
  const response = await cardApi.createCard(listId, "Yeni oluşturulmuş kart", order);


  if(response.isSuccess) {
    const payload = {
      id: response.body.cardId,
      title: "Yeni oluşturulmuş kart",
      listId: listId,
      order: order,
      user: null,
      fullName: null,
      labels: []
    }

    store.dispatch(createListCard(payload));
  }

  return response;
}

export async function getListCards(listIds) {

  const promises = listIds.map((listId) =>
    cardApi.getListCards({
      pageSize: 30,
      currentPage: 1,
      listId: listId,
    })
  );

  const responses = await Promise.all(promises);
  if (responses.every(r => r.isSuccess)) {
    store.dispatch(setListCards(responses.flatMap(r => r.body.items)));
  }

  return responses[0];
}

export async function getCardInfo(id) {
  const response = await cardApi.getCardInfo(id);
  if (response.isSuccess) {
    store.dispatch(setCurrentCard(response.body));
  }
  return response;
}

export async function editCardTitle(params) {
  const response = await cardApi.editCardTitle({
    cardId: params.cardId,
    title: params.title,
  });
  if (response.isSuccess) {
    console.log("başarılı");
    //board page güncelleme işlemini yap
  }
  return response;
}

export async function editCardDesc(params) {
  const response = await cardApi.editCardDesc({
    cardId: params.cardId,
    description: params.description,
  });
  if (response.isSuccess) {
    console.log("başarılı");
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
export async function addLabelToCard(cardId, boardLabelId) {
  const response = await cardApi.addLabelToCard(cardId, boardLabelId);
  const boardLabel = store.getState().board.currentBoard.labels.find(l => l.id === boardLabelId);

  if (response.isSuccess) {
    store.dispatch(
      changeLabel({
        cardId: cardId,
        boardLabel: boardLabel,
        isAdded: true,
      })
    );
  }

  return response;
}

export async function removeLabelFromCard(cardId, boardLabelId) {
  const response = await cardApi.removeLabelFromCard(cardId, boardLabelId);
  const boardLabel = store.getState().board.currentBoard.labels.find(l => l.id === boardLabelId);

  if (response.isSuccess) {
    store.dispatch(
      changeLabel({
        cardId: cardId,
        boardLabel: boardLabel,
        isAdded: false,
      })
    );
  }

  return response;
}
