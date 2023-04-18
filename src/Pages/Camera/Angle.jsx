import React, { useState, useEffect } from "react";

function AngleComponent() {
  const [angle, setAngle] = useState(null);

  useEffect(() => {
    function handleOrientation(event) {
      setAngle(event.alpha);
    }

    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);
window.localStorage.setItem('myAngle', angle)
  return <div>{angle != null ? `Device angle: ${angle}` : "Loading..."}</div>;
}

export default AngleComponent;
