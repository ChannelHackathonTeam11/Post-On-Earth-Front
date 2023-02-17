import React from "react";
import { Avatar } from "@mui/material";

const Me = (props) => {
  const markerStyle = {
    display: "flex",
    backgroundColor: "#0078BB",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={markerStyle}>
      <Avatar sx={{ width: 20, height: 20 }} />
    </div>
  );
};

export { Me };
