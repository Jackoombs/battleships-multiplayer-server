import React from "react";

function BattleTile(props) {

  const tileClass = () => {
    if (props.playerTurn){
      if (props.playerMisses.includes(props.index)) return "miss"
      if (props.playerHits.includes(props.index)) return "hit"
    } else {
      if (props.opponentMisses.includes(props.index)) return "miss"
      if (props.opponentHits.includes(props.index)) return "hit"
    }
  
    
  }

  return (
    <div className={`tile ${tileClass()}`}>

    </div>
  )
}

export default BattleTile