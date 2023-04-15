import React from 'react'
import { ProductionStyle } from './Production.style'

function Production(props) {
  return (
    <ProductionStyle>
      <p>Produktion lige nu</p> 
        <h2>{!props.Wh < 0 ? (props.Wh * 1000).toLocaleString("de-DE") : props.Wh.toLocaleString("de-DE")} {!props.Wh < 0 ? "Wh" : "kWh"}</h2>
        
    </ProductionStyle>
  )
}

export default Production