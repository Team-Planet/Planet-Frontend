import { store } from "../data/store";
import { authenticate, setUserInformation } from "../data/userSlice";
import userApi from "../api/userApi";
import { jwtDecode } from "jwt-decode";
import { pushNotification } from "../data/notificationSlice";
export async function signIn(email, password) {
  const response = await userApi.signIn(email, password);

  if (response.isSuccess) {
    localStorage.setItem("accessToken", response.body.accessToken);
    localStorage.setItem("refreshToken", response.body.refreshToken);

    const { sub, name } = jwtDecode(response.body.accessToken);
    store.dispatch(setUserInformation({ sub, name, email }));
    store.dispatch(authenticate());
    store.dispatch(
      pushNotification({
        severity: "success",
        duration: 3000,
        content: response.message,
      })
    );
  } else if (response.message) {
    store.dispatch(pushNotification({
        severity: "error",
        duration: 3000,
        content: response.message,
      }))
  }

  return response;
}

export function signOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  store.dispatch(setUserInformation(null));
}

export async function signUp(
  firstName,
  lastName,
  email,
  password,
  passwordConfirmation
) {
  const response = await userApi.signUp(
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation
  );

  if (response.isSuccess) {
    store.dispatch(
      pushNotification({
        content: response.message,
        duration: 5000,
        severity: "success",
      })
    );
  }

  return response;
}
