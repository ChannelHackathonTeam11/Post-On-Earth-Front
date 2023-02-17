import React from "react";
import { Outlet } from "react-router";

const WithoutNavBar = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export { WithoutNavBar };
