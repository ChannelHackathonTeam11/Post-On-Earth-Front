import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import userInfoAtom from "../recoil/userInfo";
import { useRecoilState } from "recoil";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("/users/login", {
        user_id: id,
        password: password,
      })
      .then((res) => {
        if (res.status) {
          setUserInfo({ user_id: id, password });
          navigate("/");
        }
      });
  };

  const checkId = () => {};

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };

  const groupStyle = {
    margin: "70px 0 30px 0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const iconStyle = {
    margin: "70px 0 50px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };

  const textStyle = {
    fontSize: "15px",
  };

  const inputStyle = {
    width: "300px",
  };

  return (
    <div style={style}>
      <div style={groupStyle}>
        <div style={textStyle}>아이디를 입력하세요</div>
        <TextField
          size="small"
          style={inputStyle}
          label="아이디"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div style={groupStyle}>
        <div style={textStyle}>아이디를 입력하세요</div>
        <TextField
          style={inputStyle}
          size="small"
          label="비밀번호"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={checkId}
        />
      </div>
      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit}
        endIcon={<SendIcon />}
        style={{ width: "300px", marginTop: "30px" }}
        disabled={id === "" || password === ""}
      >
        로그인
      </Button>
    </div>
  );
};

export { Login };
