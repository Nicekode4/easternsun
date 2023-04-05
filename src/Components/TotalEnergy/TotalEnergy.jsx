import React from 'react'
import { TotalEnergyStyle } from './TotalEnergy.style'

function TotalEnergy(probs) {
  return (
    <TotalEnergyStyle>
      <img src="" alt="Image" />
      <p>Total today</p>
      <h2>{probs.total.toFixed(1)} W</h2>
    </TotalEnergyStyle>
  )
}

export default TotalEnergy