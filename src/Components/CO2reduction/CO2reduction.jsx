import React from 'react'
import { CO2reductionStyle } from './CO2reduction.style'

function CO2reduction(props) {
  return (
    <CO2reductionStyle>
      {/* <img src="" alt="Image" /> */}
      <p>Sparet CO2 i dag</p>
      <h2>{props.co2 > 1000 ? (probs.co2 / 1000).toFixed(1) + " kg": probs.co2 + " g"} </h2>
    </CO2reductionStyle>
  )
}

export default CO2reduction