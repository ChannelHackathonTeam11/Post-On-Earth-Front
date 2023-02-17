import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import HistoryIcon from "@mui/icons-material/History";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const styleNavBar = {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
  };

  return (
    <BottomNavigation showLabels style={styleNavBar}>
      <BottomNavigationAction label="Map" icon={<PublicIcon />} />
      <BottomNavigationAction label="history" icon={<HistoryIcon />} />
      <BottomNavigationAction label="chat" icon={<ChatIcon />} />
      <BottomNavigationAction label="프로필" icon={<AccountCircleIcon />} />
    </BottomNavigation>
  );
};

export { NavBar };
