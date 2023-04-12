import React from 'react'
import { NavLink } from 'react-router-dom'
import { SummaryButtonStyle } from './SummaryButton.style'
import summary from '../../Images/summary.png'
import arrow from '../../Images/arrow.png'

function SummaryButton(props) {
  return (
    <SummaryButtonStyle>
       <NavLink to={`/summary/${props.SolarId}`}> 
       <div>
           <img src={summary} alt="" className='summary'/> 
           <h2>Anlægs oversigt</h2>
           <img src={arrow} alt="" className='arrow' />
        </div>
        </NavLink>
    </SummaryButtonStyle>
  )
}

export default SummaryButton