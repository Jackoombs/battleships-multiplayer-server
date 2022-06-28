import { useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import Game from './components/Game';
import { io } from "socket.io-client"

const socket = io("http://localhost:8080/")

function App() {

  const [playerTurn, setPlayerTurn] = useState()
  const [room, setRoom] = useState()
  const [gamePhase, setGamePhase] = useState('planning')

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
    if (gamePhase === 'planning' || gamePhase === 'battle') {
      return  <Game 
                setGamePhase={setGamePhase}
              />
    }
    if (gamePhase === 'result')
      return <h1>Winner</h1>
  }

  return (
    <div className="App">
      <h1>Battleships</h1>
      {renderGamePhase()}
    </div>
  );
}

export default App;
