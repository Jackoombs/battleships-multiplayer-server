import { useState } from "react";
import { Socket } from "socket.io-client";
import BattleTile from "./BattleTile";

function BattleGameboard(props) {
  const [opponentTiles, setOpponentTiles] = useState(
    props.twoDimensionalArray()
  );
  const [currentTile, setCurrentTile] = useState({});

  const sendFire = () => {
    props.socket.emit("send-fire", props.room, currentTile);
  };

  return (
    <main>
      <div id="gameboard">
        {[...Array(10)].map((e, i) =>
          [...Array(10)].map((e2, i2) => (
            <BattleTile
              key={`${i} ${i2}`}
              x={i2}
              y={i}
              playerTurn={props.playerTurn}
              currentTile={currentTile}
              setCurrentTile={setCurrentTile}
              ships={props.ships}
              activeShip={props.activeShip}
              selectedTiles={props.selectedTiles}
              setSelectedTiles={props.setSelectedTiles}
              opponentTiles={opponentTiles}
              sendFire={sendFire}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default BattleGameboard;
