import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, revoke } from "./data/userSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && jwtDecode(accessToken).exp >= new Date() / 1000) {
      dispatch(authenticate());
    }
    else {
      dispatch(revoke());
    }
  }, []);

  return (
    <>
      {!isAuthenticated ? <Navigate to="/SignIn" /> : <Navigate to="/" />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
