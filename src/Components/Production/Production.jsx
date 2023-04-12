import React from 'react'
import { ProductionStyle } from './Production.style'

function Production(props) {
  return (
    <ProductionStyle>
      <p>Produktion lige nu</p>
        <h2>{props.Wh.toLocaleString('de-DE')} kWh</h2>
        
    </ProductionStyle>
  )
}

export default Production