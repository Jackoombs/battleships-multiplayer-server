import React from "react";
import LobbyCreateJoin from "./LobbyCreateJoin";
import LobbyInput from "./LobbyInput";

function Lobby(props) {
  return (
    <main className="lobby">
      {props.playerTurn === undefined
        ?<LobbyCreateJoin 
          setPlayerTurn={props.setPlayerTurn}
        />
        :<LobbyInput 
          socket={props.socket}
          setPlayerTurn={props.setPlayerTurn}
        />}
    </main>
  )
}

export default Lobby