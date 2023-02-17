import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { useParams } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import GoogleMapReact from "google-map-react";
import { Marker } from "../Components/Home/Marker";
import ChatIcon from "@mui/icons-material/Chat";
import userInfoAtom from "../recoil/userInfo";
import { useRecoilValue } from "recoil";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = () => {
  const { uuid } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [user_id, setUser_id] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [room_id, setRoom_id] = useState("");
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  console.log(center);

  useEffect(() => {
    axios
      .post(`/contents/main`, {
        uuid: uuid,
      })
      .then((res) => {
        res = res.data;
        console.log(res);
        setTitle(res.data.title);
        setText(res.data.text);
        setUser_id(res.data.user_id);
        setCenter({ lat: res.data.lat, lng: res.data.lng });
        setProfileURL(res.data.profileURL);
        setLike(res.data.like);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCreateRoom = () => {
    axios
      .post("/chat/create", { to: user_id, from: userInfo.user_id })
      .then((res) => {
        console.log("res", res);
        setRoom_id(res.data.room_id);
      });
  };

  useEffect(() => {
    if (room_id) {
      navigate(`/chat/${room_id}`);
    }
  }, [room_id]);

  return (
    <Stack
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundColor: "#D5DCEF",
          height: "50px",
          borderRadius: "30px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          fontSize: "20px",
          gap: "10px",
        }}
      >
        <Avatar src={profileURL} />
        {user_id}
        <Button
          style={{
            color: "red",
            backgroundColor: "#ffd9d9",
            marginLeft: "auto",
          }}
          startIcon={<FavoriteIcon />}
          onClick={() => {
            if (!liked) {
              setLike(like + 1);
              axios.post("/contents/like", {
                uuid: uuid,
              });
            }
          }}
        >
          좋아요 {like}
        </Button>

        <Button
          style={{
            marginLeft: "auto",
          }}
          variant="contained"
          endIcon={<ChatIcon />}
          onClick={handleCreateRoom}
        >
          채팅하기
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "#F3F3F3",
          padding: "20px",
          borderRadius: "20px",
          height: "300px",
          wordWrap: "break-word",
        }}
      >
        {text}
      </div>
    </Stack>
  );
};

export { Post };
