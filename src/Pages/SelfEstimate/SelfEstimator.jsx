import React, { useState } from 'react';

function SolarPanelEstimator() {
  const [roofArea, setRoofArea] = useState('');
  const [panelCapacity, setPanelCapacity] = useState('');
  const [tiltAngle, setTiltAngle] = useState('');
  const [azimuthAngle, setAzimuthAngle] = useState('');
  const [powerProduction, setPowerProduction] = useState(0);

  const calculatePowerProduction = () => {
    const roofAreaInSquareMeters = Number(roofArea);
    const panelCapacityInWatts = Number(panelCapacity);
    const tiltAngleInDegrees = Number(tiltAngle);
    const azimuthAngleInDegrees = Number(azimuthAngle);

    const roofAreaInSquareFeet = roofAreaInSquareMeters * 10.764;
    const panelCount = Math.ceil(roofAreaInSquareFeet / 250); // assume each panel is 250 sq ft
    const powerProductionInWatts = panelCapacityInWatts * panelCount;
    const powerProductionInKWh = powerProductionInWatts / 1000;

    setPowerProduction(calculateSolarPanelPowerProduction(tiltAngleInDegrees, azimuthAngleInDegrees, panelCapacityInWatts) * panelCount);
  };

  return (
    <div>
      <label htmlFor="roofArea">Roof Area (in square meters): </label>
      <input type="text" id="roofArea" value={roofArea} onChange={(e) => setRoofArea(e.target.value)} />
      <br />
      <label htmlFor="panelCapacity">Panel Capacity (in watts): </label>
      <input type="text" id="panelCapacity" value={panelCapacity} onChange={(e) => setPanelCapacity(e.target.value)} />
      <br />
      <label htmlFor="tiltAngle">Tilt Angle (in degrees): </label>
      <input type="text" id="tiltAngle" value={tiltAngle} onChange={(e) => setTiltAngle(e.target.value)} />
      <br />
      <label htmlFor="azimuthAngle">Azimuth Angle (in degrees): </label>
      <input type="text" id="azimuthAngle" value={azimuthAngle} onChange={(e) => setAzimuthAngle(e.target.value)} />
      <br />
      <button onClick={calculatePowerProduction}>Calculate Power Production</button>
      <br />
      <div>Estimated Power Production: {powerProduction.toFixed(2)} watts</div>
    </div>
  );
}

function calculateSolarPanelPowerProduction(tiltAngle, azimuthAngle, panelCapacity) {
  const tiltAngleInRadians = tiltAngle * Math.PI / 180;
  const azimuthAngleInRadians = azimuthAngle * Math.PI / 180;
  const tiltCosine = Math.cos(tiltAngleInRadians);
  const angleOfIncidence = Math.acos(tiltCosine * Math.cos(azimuthAngleInRadians));
  const powerProduction = panelCapacity * tiltCosine * Math.cos(angleOfIncidence);

  return powerProduction;
}

export default SolarPanelEstimator;
