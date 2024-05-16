import api from "./api";

const boardApi = {
    getUserBoards: async (params = {pageSize: 10, currentPage: 1}) => await api.get("Boards/UserBoards", params),
    getCurrentBoard: async(id) => await api.get(`Boards/${id}`)
}

export default boardApi;