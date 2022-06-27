import './App.css';
import Lobby from './components/Lobby';
import { io } from "socket.io-client"

const socket = io("http://localhost:8080/")

function App() {
  return (
    <div className="App">
      <h1>BattleShips</h1>
      <Lobby />

    </div>
  );
}

export default App;
