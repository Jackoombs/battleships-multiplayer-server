function BattleTile(props) {

  const handleHover = () => {
    props.setCurrentTile({x: props.x, y:props.y})
  }

  const handleClick = () => {
    if (props.playerTurn) {
      sendFire()
    }
  }

  const sendFire = () => {
    
  }

  const tileStyle = () => {
    if (props.playerTurn 
    && props.opponentTiles[props.x][props.y]) {
      return props.opponentTiles[props.x][props.y]
    }
    if (!props.playerTurn 
    && props.selectedTiles[props.x][props.y]) {
      return props.selectedTiles[props.x][props.y]
      }
    if (props.currentTile.x === props.x 
    && props.currentTile.y ===props.y
    && props.playerTurn) {
      return "bomb"
    }
  }

  return (
    <div 
      className={`tile ${tileStyle()}`}
      onMouseEnter={handleHover}
      onClick={handleClick}
    >

    </div>
  )
}

export default BattleTile