import React, { useState, useRef, useEffect } from 'react';
import DragLine from './canvas';
import AngleComponent from './Angle';
import Video from './Video';

const Camera = () => {
function savedAngle(params) {
    alert('saved angle: ' + window.localStorage.getItem('myAngle'))
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
        <button onClick={savedAngle}>leeeeeeed</button>
        
      
      
    </div>
  );
};


export default Camera;
