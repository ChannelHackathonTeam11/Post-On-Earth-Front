import React from "react";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import userInfoAtom from "../recoil/userInfo";
import { useRecoilValue } from "recoil";
const Profile = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const stackStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "50px",
  };

  const textStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0 10px 0",
  };

  const valueStyle = {
    fontSize: "15px",
    backgroundColor: "#f5f5f5",
    padding: "10px",
  };

  const avatarStyle = {
    margin: "20px auto",
    width: "100px",
    height: "100px",
  };

  return (
    <Stack style={stackStyle}>
      <Avatar src={userInfo.profileURL} style={avatarStyle} />
      <div style={textStyle}>아이디</div>
      <div style={valueStyle}>{userInfo.user_id}</div>
      <div style={textStyle}>비밀번호</div>
      <div style={valueStyle}>{userInfo.password}</div>
    </Stack>
  );
};

export { Profile };
