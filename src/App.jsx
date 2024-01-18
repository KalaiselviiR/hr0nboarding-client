import { useState } from 'react'
import './App.css'

import Dashboard from './Components/Dashboard/Dashboard'
import { Navigate,Route, Routes } from "react-router-dom";
import TopForm from './Components/CandidateForm/TopForm';
import AddNewCandidate from './Components/AddNewCandidate/AddNewCandidate';
import EditNewCandidate from './Components/EditNewCandidate/EditNewCandidate';
import Login from './Components/Login/Login';
import VerifyEmail from './Components/ForgetPassword/VerifyEmail';
import UpdatePassword from './Components/ForgetPassword/UpdatePassword';

function App() {
 

  return (
    <>
          {/* Defining the routes using React Router's `Routes` component */}
      <Routes>
      {/* Route for the Login page */}
      <Route path="/" element={<Login />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/updatepass" element={<UpdatePassword />} />
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit" element={<EditNewCandidate />} />
        {/* Route for the candidate Form */}
        <Route path="/candidateForm" element={<TopForm />} />

       


      </Routes>
    </>
 
  )
}

export default App
