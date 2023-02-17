import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import userInfoAtom from "../recoil/userInfo";
import { useRecoilValue } from "recoil";
import { Avatar, Button } from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const MyMessage = ({ messageContent, user_id }) => {
  const myMessageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    padding: "0 15px",
    width: "fit-content",
    backgroundColor: "#00982B",
    color: "white",
    fontWeight: "500",
    marginLeft: "auto",
    marginRight: "20px",
    margin: "10px 20px 10px auto",
    borderRadius: "20px 0px 20px 20px",
    height: "40px",
  };

  return <div style={myMessageStyle}>{messageContent.contents}</div>;
};

const TextFieldWrapper = styled(TextField)`
  width: 100%;
  fieldset {
    border-radius: 20px;
  }
`;

const IconButtonWrapper = styled(IconButton)`
  width: 40px;
  border-radius: 20px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OtherMessage = ({ messageContent, user_id, profileURL }) => {
  const otherMessageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
    padding: "0 15px",
    width: "fit-content",
    backgroundColor: "#E1DBDB",
    color: "black",
    fontWeight: "500",
    marginLeft: "auto",
    marginRight: "20px",
    margin: "10px auto 10px 10px",
    borderRadius: "20px 20px 20px 20px",
    height: "40px",
  };

  const style = {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
  };

  return (
    <div style={style}>
      <Avatar src="profileURL" sx={{ width: 40, height: 40 }} />
      <div style={otherMessageStyle}>{messageContent.contents}</div>
    </div>
  );
};

function Chat() {
  const [contents, setContents] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { room_id } = useParams();
  const [socket, setSocket] = useState(null);
  const { user_id } = useRecoilValue(userInfoAtom);
  const [otherId, setOtherId] = useState("");
  const [otherProfileURL, setOtherProfileURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const _socket = io.connect(
      "ec2-3-35-173-41.ap-northeast-2.compute.amazonaws.com:3000"
    );
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { room_id: parseInt(room_id) });
      socket.on("join_room", (data) => {
        setMessageList(data.message ? data.message : []);
        setOtherId(data.to);
      });
      socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
      });
    }
  }, [socket]);

  const sendMessage = async () => {
    if (contents !== "") {
      const messageData = {
        room_id,
        user_id,
        contents,
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setContents("");
    }
  };

  const handleBack = () => {
    navigate("/chatlist");
  };

  const windowStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  };

  const headerStyle = {
    width: "calc(100% - 20px)",
    height: "50px",
    backgroundColor: "#D5DCEF",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    margin: "10px",
    boxSizing: "border-box",
    borderRadius: "20px",
    gap: "20px",
    paddingRight: "40px",
  };

  const footerStyle = {
    position: "absolute",
    bottom: "0",
    padding: "10px",
    display: "flex",
    width: "100%",
    boxSizing: "border-box",
    height: "60px",
    justifyContent: "space-between",
    // white linear gradient shadow to top using box-shadow
    boxShadow: "0px -10px 10px 0px rgba(255,255,255,1)",
    gap: "10px",
  };

  const bodyStyle = {
    height: "100%",
    overflow: "scroll",
    marginBottom: "60px",
  };

  const inputStyle = { width: "100%", borderRadius: "20px" };

  return (
    <div style={windowStyle} className="chat-window">
      <div style={headerStyle} className="chat-header">
        <IconButtonWrapper
          onClick={handleBack}
          style={{
            marginRight: "auto",
          }}
        >
          <ArrowBackIcon />
        </IconButtonWrapper>
        <div
          style={{
            marginRight: "auto",
          }}
        >
          {otherId}
        </div>
      </div>
      <div style={bodyStyle}>
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, i) => {
            return user_id === messageContent.user_id ? (
              <MyMessage
                key={i}
                messageContent={messageContent}
                user_id={user_id}
              />
            ) : (
              <OtherMessage
                key={i}
                messageContent={messageContent}
                user_id={user_id}
                profileURL={otherProfileURL}
              />
            );
          })}
        </ScrollToBottom>
      </div>
      <div style={footerStyle}>
        <TextFieldWrapper
          size="small"
          value={contents}
          style={inputStyle}
          onChange={(event) => {
            setContents(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <IconButtonWrapper
          variant="contained"
          onClick={sendMessage}
          color="#00982b"
        >
          <SendIcon />
        </IconButtonWrapper>
      </div>
    </div>
  );
}

export { Chat };
