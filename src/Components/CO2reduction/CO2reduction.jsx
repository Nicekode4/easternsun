import React from 'react'
import { CO2reductionStyle } from './CO2reduction.style'

function CO2reduction(probs) {
  return (
    <CO2reductionStyle>
      <img src="" alt="Image" />
      <p>CO2 reduction</p>
      <h2>{probs.co2} kg</h2>
    </CO2reductionStyle>
  )
}

export default CO2reduction