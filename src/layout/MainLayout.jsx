import React from "react";
import MainLayoutHeader from "../components/MainLayoutHeader";
import MainLayoutContent from "../components/MainLayoutContent";
import MainLayoutFooter from "../components/MainLayoutFooter";

export default function MainLayout(props) {
  return (
    <>
      <MainLayoutHeader />
      <MainLayoutContent>{props.children}</MainLayoutContent>
      <MainLayoutFooter />
    </>
  );
}
