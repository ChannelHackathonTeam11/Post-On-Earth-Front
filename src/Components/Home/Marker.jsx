import React from "react";
import { Avatar } from "@mui/material";

import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Marker = (props) => {
  const markerStyle = {
    display: "flex",
    backgroundColor: "black",
    color: "white",
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "5px 5px 5px 0px",
    borderRadius: "20px",
    fontSize: "15px",
    whiteSpace: "nowrap",
    height: "25px",
  };
  const triangleStyle = {
    position: "relative",
    width: 0,
    height: 0,
    borderTop: "15px solid transparent",
    borderBottom: "15px solid transparent",
    borderRight: "15px solid black",
    left: "-6px",
  };
  const defaultAvatar = <Avatar sx={{ width: 20, height: 20 }} />;
  return (
    <div style={markerStyle}>
      <div style={triangleStyle}></div>
      <div>{props.title}</div>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar variant="dot" sx={{ width: 20, height: 20 }} />
      </StyledBadge>
    </div>
  );
};

export { Marker };
