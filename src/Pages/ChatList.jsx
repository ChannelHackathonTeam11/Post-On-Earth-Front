import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";
import currentLocationAtom from "../recoil/currentLocation";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userInfoAtom from "../recoil/userInfo";

const ChatList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/chat/list", { user_id: userInfo.user_id })
      .then((res) => {
        console.log(res);
        setChatRoomList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chatRoomStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #e0e0e0",
  };
  const headerStyle = {
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
  };

  const handleClick = (room_id) => {
    navigate(`/chat/${room_id}`);
  };

  return (
    <Stack>
      <div style={headerStyle}>채팅목록</div>
      {chatRoomList.map((chatRoom, i) => {
        return (
          <div
            key={i}
            style={chatRoomStyle}
            onClick={() => {
              handleClick(chatRoom.room_id);
            }}
          >
            <Avatar src={chatRoom.user_imamge} />
            <div>
              <div>{chatRoom.user_id}</div>
            </div>
          </div>
        );
      })}
    </Stack>
  );
};

export { ChatList };
