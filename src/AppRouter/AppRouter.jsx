import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FrontPage from '../Pages/FrontPage/FrontPage'
import Summary from '../Pages/Summary/Summary'

function AppRouter() {
  return (
    <Routes>
        <Route index element={<FrontPage />}></Route>
        <Route path='/summary' element={<Summary />}></Route>
    </Routes>
  )
}

export default AppRouter