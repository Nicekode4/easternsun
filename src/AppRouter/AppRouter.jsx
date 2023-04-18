import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Navbar from '../Components/NavBar/Navbar'
import FrontPage from '../Pages/FrontPage/FrontPage'
import MobileMap from '../Pages/Map/Map'
import SolarPanels from '../Pages/SolarPanels/SolarPanels'
import Summary from '../Pages/Summary/Summary'
import solarData from "../sun.json"
import Camera from '../Pages/Camera/Camera'
import SolarPanelEstimator from '../Pages/SelfEstimate/SelfEstimator'

function AppRouter() {
  const { id } = useParams();
  console.log("active");
  return (
    <Routes>
        <Route index element={<FrontPage />}></Route>
        <Route path='map' element={<MobileMap />}></Route>
        <Route path='select' element={<SolarPanels />}></Route>
        <Route path='cam' element={<Camera />}></Route>
        <Route path='esti' element={<SolarPanelEstimator />}></Route>
        {solarData.map(function(item, index){
          return (
            <Route key={index} path={`/:id`} element={<FrontPage />}></Route>
          )})}
                  {solarData.map(function(item, index){
          return (
            <Route key={index} path={`/summary/:id`} element={<Summary />}></Route>
          )})}
          <Route path='*' element={<Navbar />}></Route>
    </Routes>
  )
}

export default AppRouter