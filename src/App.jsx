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
import Lobby from "./Lobby/Lobby.jsx";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<WithNavBar />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<WithoutNavBar />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Lobby />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
