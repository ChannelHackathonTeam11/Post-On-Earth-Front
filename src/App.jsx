import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { WithNavBar } from "./Pages/WithNavBar";
import { WithoutNavBar } from "./Pages/WithoutNavBar";
import { NavBar } from "./Components/Common/NavBar";
import { RecoilRoot } from "recoil";
import { Chat } from "./Pages/Chat";
import { ChatList } from "./Pages/ChatList";
import { Profile } from "./Pages/Profile";
import { Post } from "./Pages/Post";
import { Write } from "./Pages/Write";
function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<WithNavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:uuid" element={<Post />} />
          <Route path="/write" element={<Write />} />
        </Route>
        <Route element={<WithoutNavBar />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:room_id" element={<Chat />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
