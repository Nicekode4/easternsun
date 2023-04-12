import React from 'react'
import { CapacityStyle } from './Capacity.style'
import capacity from '../../Images/capacity.png'

function Capacity(props) {
  return (
    <CapacityStyle>
      <img src={capacity} alt="Image" />

      <p>Kapacitet</p>
      <h2>{props.kapacitet} W</h2>

    </CapacityStyle>
  )
}

export default Capacity