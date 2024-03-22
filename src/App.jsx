import { useState } from 'react'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './Components/Dashboard/Dashboard'
import { Navigate,Route, Routes } from "react-router-dom";
import TopForm from './Components/CandidateForm/TopForm';
import AddNewCandidate from './Components/AddNewCandidate/AddNewCandidate';
import EditNewCandidate from './Components/EditNewCandidate/EditNewCandidate';
import Login from './Components/Login/Login';
import VerifyEmail from './Components/ForgetPassword/VerifyEmail';
import UpdatePassword from './Components/ForgetPassword/UpdatePassword';
import RecruiterForm from './Components/RecruiterViewForm/RecruiterView';
import CandidateViewForm from './Components/resendform/candidateView';
import TopForms from './Components/OutsideIndia/TopForms';


function App() {
 
  const login = localStorage.getItem("email");
  
  return (
    <>
          {/* Defining the routes using React Router's `Routes` component */}
      <Routes>
      {/* Route for the Login page */}
      <Route path="/" element={ <Login />}></Route>
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/updatepass/:id" element={<UpdatePassword />} />
        {/* Route for the Dashboard page */}
        <Route path="/dashboard" element
        ={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />


        {/* Route for the candidate Form */}
        <Route path="/edit" element={<EditNewCandidate />} />
        <Route path="/add" element={<AddNewCandidate />} />
        <Route path="/candidateForm" element={<TopForm />} />
        {/* Route for the candidate Form Recruiter View*/}
        <Route path="/recruiterView/:id" element={<RecruiterForm />} />
        <Route path="/candidateView/:id" element={<CandidateViewForm />} />
        <Route path="/candidateForm/:token" element={<TopForm />} />
        <Route path="/candidateFormOutside/:token" element={<TopForms />} />

       


      </Routes>
    </>
 
  )
}

export default App


export function ProtectedRoutes(props){
  if(localStorage.getItem('email')){
    return props.children
  }
  else{
    return <Navigate to="/"/>
  }
}
