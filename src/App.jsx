const eff = 0.20 // 20%
const cloudcover = 69 / 100 // 46%
const hoursOfDay = 13
const hoursOfSun = hoursOfDay - cloudcover * hoursOfDay
const powerRating = 300 //Watts

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

console.log(calculateSolarEnergyProduced(powerRating, hoursOfSun, eff),"Wh");
function App() {
  return (
    <div className="App">
      <h1>Production: {calculateSolarEnergyProduced(powerRating, hoursOfSun, eff).toFixed(1)} Wh på 13 timer</h1>
      <h2>Skydække: {(cloudcover * 100).toFixed(0)}%</h2>
      <h2>Timers sol: {hoursOfSun.toFixed(1)}</h2>
    </div>
  );
}

export default App;
