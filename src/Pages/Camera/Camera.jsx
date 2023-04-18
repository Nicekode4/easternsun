import React, { useState, useRef, useEffect } from 'react';
import DragLine from './canvas';
import AngleComponent from './Angle';
import Video from './Video';

const Camera = () => {
    const [output, setOutput] = useState(null)
    function calculateSolarPanelPowerProduction(tiltAngle, azimuthAngle, panelCapacity) {
        // convert tilt angle and azimuth angle to radians
        const tiltAngleInRadians = tiltAngle * Math.PI / 180;
        const azimuthAngleInRadians = azimuthAngle * Math.PI / 180;
        
        // calculate the cosine of the tilt angle
        const tiltCosine = Math.cos(tiltAngleInRadians);
        
        // calculate the angle of incidence
        const angleOfIncidence = Math.acos(tiltCosine * Math.cos(azimuthAngleInRadians));
        
        // calculate the power production
        const powerProduction = panelCapacity * tiltCosine * Math.cos(angleOfIncidence);
        setOutput(powerProduction)
        return powerProduction;
      }
      
function savedAngle(params) {
    
    calculateSolarPanelPowerProduction(window.localStorage.getItem("myAngle") ? window.localStorage.getItem("myAngle") : 10 , 75, 300)
}
  return (
    <div>
        <Video />
        <div style={{
            height: "200px", 
            width: "1px", 
            marginLeft: "13rem", 
            backgroundColor: "blue", 
            position: "absolute",
            top: "2rem",
            }}></div>
        <AngleComponent />
        <h2>Solcellen vil her lave {output} W</h2>
        <button onClick={savedAngle}>leeeeeeed</button>
        
      
      
    </div>
  );
};


export default Camera;
