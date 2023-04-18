import React, { useState, useRef, useEffect } from 'react';
import DragLine from './canvas';
import AngleComponent from './Angle';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Failed to access camera', err);
      });
  }, []);

  const calculateAngle = () => {
    if (canvasRef.current && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      console.log(imageData);

      // Calculate the angle between two points on the screen
      const x1 = 200; // X coordinate of first point
      const y1 = 200; // Y coordinate of first point
      const x2 = 250; // X coordinate of second point
      const y2 = 200; // Y coordinate of second point

      const pixelIndex1 = (y1 * canvas.width + x1) * 4;
      const pixelIndex2 = (y2 * canvas.width + x2) * 4;

      const red1 = pixels[pixelIndex1];
      const green1 = pixels[pixelIndex1 + 1];
      const blue1 = pixels[pixelIndex1 + 2];
      const luminance1 = 0.2126 * red1 + 0.7152 * green1 + 0.0722 * blue1;

      const red2 = pixels[pixelIndex2];
      const green2 = pixels[pixelIndex2 + 1];
      const blue2 = pixels[pixelIndex2 + 2];
      const luminance2 = 0.2126 * red2 + 0.7152 * green2 + 0.0722 * blue2;

      const deltaX = x2 - x1;
      const deltaY = y2 - y1;
      const angleInRadians = Math.atan2(deltaY, deltaX);
      const angleInDegrees = angleInRadians * 180 / Math.PI;
        console.log(angleInDegrees);
      setAngle(angleInDegrees);
    }
  };
function savedAngle(params) {
    alert('saved angle: ' + window.localStorage.getItem('myAngle'))
}
  return (
    <div>
        <video ref={videoRef} autoPlay muted style={{ width: '100vw', height: '100vh' }} />
        <AngleComponent />
        <button onClick={savedAngle}>leeeeeeed</button>
        <DragLine />
        
      
      
    </div>
  );
};


export default Camera;
