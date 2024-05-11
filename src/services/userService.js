import { useDispatch } from "react-redux";
import { store } from "../app/store";
import { setUserInformation } from "../features/user/userSlice";
import userApi from "../api/userApi";
import { jwtDecode } from "jwt-decode";

export async function signIn(email, password) {
    const response = await userApi.signIn(email, password);
    const body = response.data.body;

    if (response.data.header.isSuccess) {
        localStorage.setItem("accessToken", body.accessToken);
        const { name } = jwtDecode(body.accessToken);

        store.dispatch(setUserInformation({ email, name }));
    }

    return response.data;
}