import React from 'react'
import { CapacityStyle } from './Capacity.style'
import capacity from '../../Images/capacity.png'

function Capacity(probs) {
  return (
    <CapacityStyle>
      <img src={capacity} alt="Image" />
      <p>Capacity</p>
      <h2>{probs.kapacitet} W</h2>
    </CapacityStyle>
  )
}

export default Capacity