import api from "./api";

const cardApi = {
  getListCards: async (params) => await api.get("Cards/GetListCards", params),
  getCardInfo: async (id) => await api.get(`Cards/${id}`),
  editCardTitle: async (params) => await api.post("Cards/EditTitle", params),
  editCardDesc: async (params) =>
    await api.post("Cards/EditDescriptiion", params),
  moveCard: async (body) => await api.post("Cards/MoveCard", body),
  addLabelToCard: async (cardId, boardLabelId) =>
    await api.post("Cards/Labels/Add", { cardId, boardLabelId }),
  removeLabelFromCard: async (cardId, boardLabelId) =>
    await api.post("Cards/Labels/Remove", { cardId, boardLabelId }),
  createCard: async (listId, title, order) =>
    await api.post("Cards/Create", { listId, title, order}),
};

export default cardApi;
