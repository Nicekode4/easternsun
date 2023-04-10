import React from 'react'
import { TotalEnergyStyle } from './TotalEnergy.style'
import solar from '../../Images/solar_panel.png'

function TotalEnergy(probs) {
  return (
    <TotalEnergyStyle>
      <img src={solar} alt="Image" />
      <p>Antal paneler</p>
      <h2>{probs.total}</h2>
    </TotalEnergyStyle>
  )
}

export default TotalEnergy