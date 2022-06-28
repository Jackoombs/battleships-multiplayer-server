import React from "react";

function LobbyWait(props) {

  const handleClick = () => {
    props.setPlayerTurn()
    props.setRoom()
    props.socket.emit('leave-room', props.room)
  }

  return (
    <div className="lobby-wait">
      <h2>Waiting for opponent in room: <br /><strong>{props.room}</strong></h2>
      <div class="lds-ripple"><div></div><div></div></div>
      <button className="lobby-btn" onClick={handleClick}>EXIT</button>
    </div>
  )
}

export default LobbyWait