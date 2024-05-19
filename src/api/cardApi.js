import api from "./api";

const cardApi = {
  getListCards: async (params) => await api.get("Cards/GetListCards", params),
  getCardInfo: async (id) => await api.get(`Cards/${id}`),
  moveCard: async (body) => await api.post("Cards/MoveCard", body),
};

export default cardApi;
