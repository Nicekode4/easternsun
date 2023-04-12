import React from 'react'
import { PowerPeakStyle } from './PowerPeak.style'

function PowerPeak(props) {
  return (
    <PowerPeakStyle>
      {/* <img src="" alt="Image" /> */}
      <p>Power Peak</p>
      <h2>{props.max.toFixed(0) < 0 ? 0 : props.max.toFixed(0)} kW</h2>
    </PowerPeakStyle>
  )
}

export default PowerPeak