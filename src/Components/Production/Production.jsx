import React from 'react'
import { ProductionStyle } from './Production.style'

function Production(probs) {
  return (
    <ProductionStyle>
      <p>Produktion lige nu</p>
        <h2>{probs.Wh} Wh</h2>
        
    </ProductionStyle>
  )
}

export default Production