import { useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import PlanningPhase from './components/PlanningPhase';
import { io } from "socket.io-client"

const socket = io("http://localhost:8080/")

function App() {

  const [playerTurn, setPlayerTurn] = useState()
  const [room, setRoom] = useState()
  const [gamePhase, setGamePhase] = useState('lobby')

  socket.on("valid-room", room => {
    setRoom(room)
  })

  socket.on("start-game", () => {
    setGamePhase('planning')
  })

  const renderGamePhase = () => {
    if (gamePhase === 'lobby') {
      return  <Lobby 
                socket={socket}
                playerTurn={playerTurn}
                setPlayerTurn={setPlayerTurn}
                room={room}
                setRoom={setRoom}
              />
    }
    if (gamePhase === 'planning') {
      return  <PlanningPhase />
    }
  }

  return (
    <div className="App">
      <h1>BattleShips</h1>
      {renderGamePhase()}
    </div>
  );
}

export default App;
