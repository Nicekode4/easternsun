import React from 'react'
import { ProductionStyle } from './Production.style'

function Production(probs) {
  return (
    <ProductionStyle>
        <h2>{probs.Wh} Wh</h2>
        <p>Produktion lige nu</p>
    </ProductionStyle>
  )
}

export default Production