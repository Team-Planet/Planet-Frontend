import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

export default function MainLayoutHeader() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return (
    <>
        <Navbar />
    </>
  );
}
