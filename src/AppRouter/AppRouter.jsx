import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Navbar from '../Components/NavBar/Navbar'
import FrontPage from '../Pages/FrontPage/FrontPage'
import Summary from '../Pages/Summary/Summary'
import solarData from "../sun.json"

function AppRouter() {
  const { id } = useParams();
  return (
    <Routes>
        <Route index element={<FrontPage />}></Route>
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