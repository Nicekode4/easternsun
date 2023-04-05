import React from 'react'
import { CapacityStyle } from './Capacity.style'

function Capacity(probs) {
  return (
    <CapacityStyle>
      <img src="" alt="Image" />
      <p>Capacity</p>
      <h2>{probs.kapacitet} W</h2>
    </CapacityStyle>
  )
}

export default Capacity