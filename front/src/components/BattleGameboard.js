import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import BattleTile from "./BattleTile";

function BattleGameboard(props) {

  if (props.playerTurn)

  return (
    <main>
      <div id="gameboard">
        {[...Array(100)].map((e,i) => {
          return(
            <BattleTile 
              key={i}
              index={i}
              playerTurn={props.playerTurn}
            />
          )
        })}
      </div>
    </main>
  )
}

export default BattleGameboard