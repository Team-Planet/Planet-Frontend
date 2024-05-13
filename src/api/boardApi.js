import api from "./api";

const boardApi = {
    getUserBoards: async (params = {pageSize: 10, currentPage: 1}) => await api.get("Boards/UserBoards", params)
}

export default boardApi;