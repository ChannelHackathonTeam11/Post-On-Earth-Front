import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import HistoryIcon from "@mui/icons-material/History";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const [value, setValue] = useState("지도");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const styleNavBar = {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
  };

  return (
    <BottomNavigation
      showLabels
      style={styleNavBar}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="지도"
        value="지도"
        icon={<PublicIcon />}
        on
      />
      <BottomNavigationAction
        label="히스토리"
        value="히스토리"
        icon={<HistoryIcon />}
      />
      <BottomNavigationAction label="채팅" value="채팅" icon={<ChatIcon />} />
      <BottomNavigationAction
        label="프로필"
        value="프로필"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
};

export { NavBar };
