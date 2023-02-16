import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room" , room);
    }
  };
  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder='Name..' onChange={(event) => {
        setUsername(event.target.value);
      }}></input>

      <input type="text" placeholder='Room Id..' onChange={(event) => {
        setRoom(event.target.value);
      }}></input>

      <button onClick={joinRoom}>Join</button>

      <Chat socket={socket} username={username} room={room}></Chat>
    </div>
  )
}

export default App

