import { store } from "../app/store";
import { setUserInformation } from "../features/user/userSlice";
import userApi from "../api/userApi";
import { jwtDecode } from "jwt-decode";
import SignUpPage from "../pages/SignUpPage";
export async function signIn(email, password) {
    const response = await userApi.signIn(email, password);

    if(response.isSuccess) {
        localStorage.setItem("accessToken", response.body.accessToken);
        localStorage.setItem("refreshToken", response.body.refreshToken);

        const {sub, name} = jwtDecode(response.body.accessToken);
        store.dispatch(setUserInformation({sub, name, email}));
    }

    return response;
}

export function signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    store.dispatch(setUserInformation(null));
}

export async function signUp(firstName, lastName, email, password, passwordConfirmation){
    const response = await userApi.signUp(firstName, lastName, email, password, passwordConfirmation);
    if(response.isSuccess){
        console.log("Kayıt başarılı");
    }
}