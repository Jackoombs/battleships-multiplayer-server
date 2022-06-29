import React from "react";
import PlanningPhaseInfo from "./PlanningPhaseInfo";

function GameInfo(props) {

  const renderPhaseInfo = () => {
    if (props.gamePhase === "planning") {
      return (<PlanningPhaseInfo />)
    }
  }

  return (
    <aside>
      {
      props.gamePhase === "planning"
        ?<PlanningPhaseInfo />
        :"hi"
      }
    </aside>
  )
}

export default GameInfo