import { useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import { io } from "socket.io-client"

const socket = io("http://localhost:8080/")

function App() {

  const [playerTurn, setPlayerTurn] = useState()
  const [room, setRoom] = useState()

  return (
    <div className="App">
      <h1>BattleShips</h1>
      <Lobby 
        socket={socket}
        playerTurn={playerTurn}
        setPlayerTurn={setPlayerTurn}
        room={room}
        setRoom={setRoom}
      />

    </div>
  );
}

export default App;
