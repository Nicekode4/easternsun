import solarData from "./sun.json"
let eff = 0.20 // 20%
let cloudcover = 12 / 100 // 46%
let hoursOfDay = 13
let hoursOfSun = hoursOfDay - cloudcover * hoursOfDay
let powerRating = solarData[5].Antal_solceller * solarData[5].kapasitet_pr_panel_i_Wh //Watts

let energyProduction = calculateSolarEnergyProduced(powerRating, hoursOfSun, eff); // in watt-hours
let carbonIntensity = 0.5; // in kg CO2 per kWh

let co2Reduction = calculateCO2Reduction(energyProduction, carbonIntensity);

console.log(hoursOfSun);
function calculateSolarEnergyProduced(power, hoursOfSunlight, efficiency) {
  // Convert power from watts to kilowatts
  power = power / 1000;

  // Calculate energy produced in kilowatt-hours
  let energyProduced = power * hoursOfSunlight * efficiency;

  // Convert energy produced back to watt-hours
  energyProduced = energyProduced * 1000;

  return energyProduced;
}

function calculateCO2Reduction(energyProduction, carbonIntensity) {
  // Convert energy production to kilowatt-hours
  energyProduction = energyProduction / 1000;
  
  // Calculate CO2 reduction in kilograms
  let co2Reduction = energyProduction * carbonIntensity;
  
  return co2Reduction;
}
console.log("CO2 reduction: " + co2Reduction + " kg");
console.log(calculateSolarEnergyProduced(powerRating, hoursOfSun, eff),"Wh");
function App() {
  return (
    <div className="App">
      <h1>Production: {calculateSolarEnergyProduced(powerRating, hoursOfSun, eff).toFixed(1)} Wh på 13 timer</h1>
      <h2>Skydække: {(cloudcover * 100).toFixed(0)}%</h2>
      <h2>Timers sol: {hoursOfSun.toFixed(1)}</h2>
      <h2>CO2 reduction: {calculateCO2Reduction(energyProduction, carbonIntensity).toFixed(1)} kg</h2>
    </div>
  );
}

export default App;
