import React, { useState, useRef, useEffect } from 'react';
import DragLine from './canvas';
import AngleComponent from './Angle';
import Video from './Video';

const Camera = () => {
    const [output, setOutput] = useState(null)
    const [value, setValue] = useState(null)

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
        setOutput(powerProduction.toFixed(1))
        return powerProduction;
      }
function handleChange(e) {
    console.log(e);
    setValue(e.target.value)
    calculateSolarPanelPowerProduction(!window.localStorage.getItem("myAngle") ? window.localStorage.getItem("myAngle") : 10 , 75,300 * value)
}      
function savedAngle() {
    
    calculateSolarPanelPowerProduction(!window.localStorage.getItem("myAngle") ? window.localStorage.getItem("myAngle") : 10 , 75,300 * value)
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
        <h2>Anlægget vil her vil have {value} paneler og lave {output} Wh i timen på en dag som idag</h2>
        <label htmlFor="paneler">Antal paneler</label>
        <select onChange={handleChange} name="paneler" id="paneler">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <button onClick={savedAngle}>leeeeeeed</button>
        
      
      
    </div>
  );
};


export default Camera;
