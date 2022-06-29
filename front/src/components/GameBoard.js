import React, { useState, useEffect } from "react";
import PlanningPhaseTile from "./PlanningPhaseTile";

function GameBoard(props) {

  const [selectionPreview, setSelectionPreview] = useState([])
  const [previewOrientation, setPreviewOrientation] = useState(true)
  const [currentTile, setCurrentTile] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState([])
  const [validSelection, setValidSelection] = useState([])
  const [validOnHover, setValidOnHover] = useState(true)

  // When user hovers on a new tile or rotates the ship, this evaluates whether a ship is already placed there.
  useEffect(() => {
    const result = selectionPreview.filter(element => selectedTiles.includes(element))
    result.length
      ?setValidOnHover(false)
      :setValidOnHover(true)
  },[selectionPreview])

  const onTouchMoveHandler = (e) => {
    const xCoord = e.targetTouches[0].clientX
    const yCoord = e.targetTouches[0].clientY
    const elements = document.elementsFromPoint(xCoord, yCoord)
    if (elements[0].classList.contains('tile')) {
      setCurrentTile(+elements[0].id)
    }
  }

  return (
    <main>
      <div id="gameboard"
        onMouseLeave={() => {setSelectionPreview([])}}
        onTouchMove={onTouchMoveHandler}
      >
        {props.gamePhase === "planning"?

          [...Array(100)].map((e,i) =>  {
            return (
              <PlanningPhaseTile 
                key={i}
                index={i}
                playerShips={props.playerShips}
                activeShip={props.activeShip}
                validOnHover={validOnHover}
                changeShipSelectedStatus={props.changeShipSelectedStatus}
                setGamePhase={props.setGamePhase}
                selectionPreview={selectionPreview}
                setSelectionPreview={setSelectionPreview}
                previewOrientation={previewOrientation}
                setPreviewOrientation={setPreviewOrientation}
                currentTile={currentTile}
                setCurrentTile={setCurrentTile}
                validSelection={validSelection}
                setValidSelection={setValidSelection}
                selectedTiles={selectedTiles}
                setSelectedTiles={setSelectedTiles}
              />
            )
          })
          :"hi"
        }
      </div>
  </main>
  )
}

export default GameBoard