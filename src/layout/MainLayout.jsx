import React, { useContext } from "react";
import MainLayoutHeader from "../components/MainLayoutHeader";
import MainLayoutContent from "../components/MainLayoutContent";
import MainLayoutFooter from "../components/MainLayoutFooter";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function MainLayout(props) {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && <Navigate to="/SignIn" />}
      <MainLayoutHeader />
      <MainLayoutContent>{props.children}</MainLayoutContent>
      <MainLayoutFooter />
    </>
  );
}
