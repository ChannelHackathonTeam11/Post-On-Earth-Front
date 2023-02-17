import React, { useState } from "react";
import userInfoAtom from "../recoil/userInfo";
import { useRecoilValue } from "recoil";
import { Stack } from "@mui/system";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Map } from "../Components/Home/Map";
import currentLocationAtom from "../recoil/currentLocation";
import { useRecoilState } from "recoil";
import GoogleMapReact from "google-map-react";
import { Me } from "../Components/Home/Me";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);

  const styleTitle = {
    display: "flex",
    gap: "10px",
  };

  const handleAdd = () => {
    axios
      .post("/contents/write", {
        title: title,
        text: text,
        user_id: userInfo.user_id,
        lat: currentLocation.lat,
        lng: currentLocation.lng,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <Stack
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div style={styleTitle}>
        <Avatar src={userInfo?.profileURL} />
        <TextField
          id="outlined-basic"
          label="제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <TextField
        id="outlined-basic"
        label="내용"
        variant="outlined"
        multiline
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAIIvisruWTsCnEATJNSnmLjNJbUZG8CKQ" }}
          center={currentLocation}
          zoom={17}
        >
          <Me lat={currentLocation.lat} lng={currentLocation.lng} />
        </GoogleMapReact>
      </div>
      <Button variant="contained" onClick={handleAdd}>
        작성
      </Button>
    </Stack>
  );
};

export { Write };
