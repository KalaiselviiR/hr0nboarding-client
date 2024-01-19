import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CiExport, CiCalendar } from 'react-icons/ci';
import { InputGroup, Row, Col, Button, Dropdown,Form } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";
import email_icon from '../../assets/gmail.jpg'
import password_icon from '../../assets/password.png'
import Logo from '../../assets/techjays.png'

function UpdatePassword() {
         //create an object to store datas from input
  const [userData, setUser] = useState({
    email: "",
    psw: ""

  })
    //object for useNavigate
const navigate=useNavigate()
   // a function to update userdata when user enter the input in html
const userDetails = (e) => {
  //prevent the event
  e.preventDefault()
  //access value to update in userData
  const { value } = e.target
  //access key to update in userData
  const key = e.target.name
  //update the data with existing data
  setUser({ ...userData, [key]: value })

}
console.log(userData);

const handleSubmit = async (e) => {

 
  e.preventDefault()
  const { email } = userData
  
 if (email == "") {
    toast.error('email requierd')
  }

 
  else {
 
   
    //api call
    const response = await Verifymail(userData)
    console.log(response);
    if(response.status==200){
    
      if(response.data.message === "login Successfull"){
        toast.success(response.data.message);
      setTimeout(()=> {
        navigate('/')
      }, 1500);
       
      }else{
        toast.error(response.data.message);
      }

    //reset all states datas
    setUser({
      email: ""
   
    })
    

    //redirection to home
      
    }else{
    
      toast.error(response.data.message)
    }

  }
}
    
  return (
    <div className='header1'>
    <div className='Logo  '>
      
      <img className='logo-img' src={Logo} alt="Logo" />
     
    
    </div>
     <div className='header2'>
      
        <div className="subhead "><b>Update Password</b>
        </div>
       
      
      <div  >
      <Form.Group className="mb-3" controlId="officialEmailAddress" >
            <Form.Label className='labelss'>Password</Form.Label>
            <InputGroup>
            
              <Form.Control onChange={userDetails} name='psw' className='input-field' type="password" placeholder="Enter password" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="officialEmailAddress" >
            <Form.Label className='labelss'>Confirm Password</Form.Label>
            <InputGroup>
            
              <Form.Control onChange={userDetails} name='psw' className='input-field' type="password" placeholder="Enter password" />
            </InputGroup>
          </Form.Group>
  
      </div>

      <div className="submit-box">
      <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='btn-login' onClick={handleSubmit}
          >
          
            Submit
          </Button>
      </div>

      </div>
      
      <ToastContainer autoClose={800}  position="top-center" />
      </div>
  )
}

export default UpdatePassword