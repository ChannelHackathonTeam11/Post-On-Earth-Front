import React from "react";
import { Outlet } from "react-router";
import { NavBar } from "../Components/Common/NavBar";
const WithNavBar = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export { WithNavBar };
