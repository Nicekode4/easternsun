import React from 'react'
import { PowerPeakStyle } from './PowerPeak.style'

function PowerPeak(props) {
  return (
    <PowerPeakStyle>
      {/* <img src="" alt="Image" /> */}

      <p>Højeste effekt</p>
      <h2>{props.max.toFixed(1) == 0 ? props.max.toFixed(2) : props.max.toFixed(1)} kWh</h2>

    </PowerPeakStyle>
  )
}

export default PowerPeak