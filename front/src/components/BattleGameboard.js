import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import BattleTile from "./BattleTile";

function BattleGameboard(props) {

  const [playerMisses, setPlayerMisses] = useState([])
  const [opponentMisses, setOpponentMisses] = useState([])
  const [playerHits, setPlayerHits] = useState([])
  const [opponentHits, setOpponentHits] = useState([])

  props.socket.on("receive-fire", (tile) => {
    const isHit = props.selectedTiles.includes(tile)
    isHit
      ?setPlayerHits(hits => [...hits, tile])
      :setPlayerMisses(hits => [...hits, tile]);
  })

  useEffect(() => {
    const sunkShip = checkShipSunk()
    if (sunkShip) {
      updateShipSunk(sunkShip)
    }
    props.socket.emit("hit", (props.room, playerHits[playerHits.length - 1], sunkShip))
  },[playerHits])

  useEffect(() => {
    props.socket.emit("miss", (props.room, playerMisses[playerMisses.length - 1]))
  },[playerMisses])

  const checkShipSunk = () => {
    for (const ship of props.playerShips) {
      const shipHits = ship.tiles.map(tile => playerHits.includes(tile))
      if (shipHits.length === ship.tiles.length && !ship.sunk) {
        return ship
      }
    }
    return false
  }

  const updateShipSunk = (sunkShip) => {
    const shipIndex = props.playerShips.findIndex(ship.name === sunkShip.name)
    const newShips = [...props.playerShips]
    sunkShip.sunk = true
    newShips[shipIndex] = sunkShip
    props.setPlayerShips(newShips)
  }





  return (
    <main>
      <div id="gameboard">
        {[...Array(100)].map((e,i) => {
          return(
            <BattleTile 
              key={i}
              index={i}
              playerTurn={props.playerTurn}
              playerMisses={playerMisses}
              opponentMisses={opponentMisses}
              playerHits={playerHits}
              opponentHits={opponentHits}
            />
          )
        })}
      </div>
    </main>
  )
}

export default BattleGameboard