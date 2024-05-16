import api from "./api";

const cardApi = {
    getListCards: async (params) => await api.get("Cards/GetListCards", params)
}

export default cardApi;