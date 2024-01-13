import { useState } from 'react'
import './App.css'

import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import { Navigate,Route, Routes } from "react-router-dom";


function App() {
 

  return (
    <>
          {/* Defining the routes using React Router's `Routes` component */}
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />

        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </>
 
  )
}

export default App
