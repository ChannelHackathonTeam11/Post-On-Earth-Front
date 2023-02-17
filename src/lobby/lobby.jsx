import React from 'react'
import io from 'socket.io-client'
import Chat from '../Chat/Chat';
import "./Lobby.css"
import { useState } from 'react'

const socket = io.connect("http://localhost:3000");

function lobby() {
   const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ?  (
      <div className='joinChatContainer'>
        <h3>Join A Chat</h3>

        <input type="text" placeholder='Name..' onChange={(event) => {
          setUsername(event.target.value);
        }}></input>

        <input type="text" placeholder='Room Id..' onChange={(event) => {
          setRoom(event.target.value);
        }}></input>

        <button onClick={joinRoom}>Join</button>
      </div>
      ): (
      <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default lobby