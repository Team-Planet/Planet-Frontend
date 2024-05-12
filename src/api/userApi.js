import api from "./api";

const userApi = {
    signIn: async (email, password) => await api.post("Users/SignIn", {email,password}),
    signUp: async (body) => await api.post("Users/SignUp", body),
    changePassword: async (body) => await api.post("Users/ChangePassword", body)
}

export default userApi;