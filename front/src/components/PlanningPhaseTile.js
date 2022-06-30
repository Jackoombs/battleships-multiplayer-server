import React, { useState, useEffect } from "react";
import battleshipPreview from "../utils/battleshipPreview"

function PlanningPhaseTile(props) {

 
  const [isSelected, setIsSelected] = useState({selected:false})

  // Update the UI when ship orientation or active ship changes.
  useEffect(() => {
    if (props.selectionPreview.length) {
      selectionPreview(props.currentTile, props.activeShip.length)
    }
  },[props.previewOrientation, props.activeShip, props.currentTile])


  // When the user places a ship, update the tile state to show the tiles are taken.
  useEffect(() => {
  if (props.validSelection.includes(props.index)) {
    setIsSelected({selected:true, name:props.activeShip.name, orientation: props.previewOrientation})
  }
  },[props.validSelection])

  // If the active ship changes to an already placed ship then remove the ship from the board so it can be re-placed.
  useEffect(() => {
    if (!props.activeShip.placed && isSelected.name === props.activeShip.name) {
      setIsSelected({selected:false})
      props.setSelectedTiles(oldArray => oldArray.filter(element => element!==props.index))
      
      if (props.currentTile) {
        selectionPreview(props.currentTile, props.activeShip.length)
      } 
    } 
  },[props.activeShip])

  const selectionPreview = (index, length) => {
      props.setSelectionPreview(battleshipPreview(index, length, props.previewOrientation))
  }

  const passSelectionPreviewOnHover = () => {
    selectionPreview(props.index, props.activeShip.length)
  }

  const updateOrientationOnWheel = () => {
    props.setCurrentTile(props.index)
    props.setPreviewOrientation(!props.previewOrientation)
  }

  // If the selection is valid on click then change the activeShip select state and update the selected tiles.
  const checkTilesValidOnClick = () => {
    const filteredArray = props.selectionPreview.filter(element => props.selectedTiles.includes(element))
    if (!filteredArray.length) {
      props.setCurrentTile(props.index)
      props.setSelectedTiles(array => array.concat(props.selectionPreview))
      props.setValidSelection(props.selectionPreview)
      props.changeShipSelectedStatus(props.activeShip, true)
    }
  }

  // If all ships have been placed, allow the user to re-place by clicking on ship.
  const changeActiveShipOnClick = () => {
    if (!props.activeShip.name && isSelected.selected) {
      const newActiveShip = props.playerShips.filter(ships => ships.name === isSelected.name)
      props.changeShipSelectedStatus(newActiveShip[0], false)
      props.setPreviewOrientation(isSelected.orientation)
    }
  } 

  const tileClickHandler = () => {
    checkTilesValidOnClick()
    changeActiveShipOnClick()
  }

  const setBackgroundOnHover = () => {
    if (!props.validOnHover && props.selectionPreview.includes(props.index)) return 'grey'
    if (props.selectionPreview.includes(props.index)) return props.activeShip.color
    return ''
  }

  // When the user starts the game, the placement of ships is saved to state in App
  useEffect(() => {
      if (isSelected.selected) {
        
        const ships = [...props.playerShips]
        const shipName = isSelected.name
        const updatedShip = ships.find(ship => ship.name===shipName)
        updatedShip.tiles.push(props.index)
        props.setPlayerShips(ships)
        
        console.log(props.index, ...props.selectedTiles)
        if (props.index === Math.max(...props.selectedTiles)) props.setGamePhase('battle')
      }
  },[props.endPlanningPhase])

  return (
    <div 
      id={props.index}
      style={{backgroundColor:setBackgroundOnHover()}}
      className={['tile', isSelected.selected?isSelected.name.toLowerCase():''].join(' ')}
      onMouseEnter={passSelectionPreviewOnHover}
      onWheel={updateOrientationOnWheel}
      onClick={tileClickHandler}
      onTouchStart={passSelectionPreviewOnHover}
    >
    </div>
      
  )
}

export default PlanningPhaseTile