import api from "./api";

const cardApi = {
  getListCards: async (params) => await api.get("Cards/GetListCards", params),
  getCardInfo: async (id) => await api.get(`Cards/${id}`),
  editCardTitle: async(params) => await api.post("Cards/EditTitle",params)
};

export default cardApi;
