import React from 'react'
import { PowerPeakStyle } from './PowerPeak.style'

function PowerPeak(probs) {
  return (
    <PowerPeakStyle>
      {/* <img src="" alt="Image" /> */}
      <p>Power Peak</p>
      <h2>{probs.max.toFixed(0) < 0 ? 0 : probs.max.toFixed(0)} kW</h2>
    </PowerPeakStyle>
  )
}

export default PowerPeak