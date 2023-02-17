import React, { useState } from "react";
import { Stack } from "@mui/system";
import { Avatar } from "@mui/material";

const ChatList = () => {
  const [chatRoomList, setChatRoomList] = useState([
    {
      profileURL: "https://picsum.photos/200",
      user_id: "user_id",
      lastChat: "lastChat",
    },
    {
      profileURL: "https://picsum.photos/200",
      user_id: "user_id",
      lastChat: "lastChat",
    },
    {
      profileURL: "https://picsum.photos/200",
      user_id: "user_id",
      lastChat: "lastChat",
    },
    {
      profileURL: "https://picsum.photos/200",
      user_id: "user_id",
      lastChat: "lastChat",
    },
  ]);

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

  const handleClick = () => {
    console.log("click");
  };

  return (
    <Stack>
      <div style={headerStyle}>채팅목록</div>
      {chatRoomList.map((chatRoom, i) => {
        return (
          <div key={i} style={chatRoomStyle} onClick={handleClick}>
            <Avatar src={chatRoom.profileURL} />
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
