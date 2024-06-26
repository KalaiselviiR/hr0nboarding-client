import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,useParams } from 'react-router-dom';
import { CiExport, CiCalendar } from 'react-icons/ci';
import { InputGroup, Row, Col, Button, Dropdown,Form } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";
import email_icon from '../../assets/gmail.jpg'
import password_icon from '../../assets/password.png'
import Logo from '../../assets/techjays.png'
import axios from 'axios';
import BASE_URL from '../../service/baseurl';


// const items = JSON.parse(localStorage.getItem('userId'));



function UpdatePassword() {
         //create an object to store datas from input
  const [userData, setUser] = useState({
    psw: "",
    cpsw: ""

  })

  
  // param id 
  const{id} =useParams()
  console.log(id);



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
// console.log(userData);

const handleSubmit = async (e) => {

 
  e.preventDefault()
  const { psw, cpsw } = userData
  
 if (psw === "") {
    toast.error('Enter valid password')
  }
  if (cpsw === "") {
    toast.error('Confirm password requierd')
  }
  else if (psw !== cpsw)
  {
    toast.error('Password does not match')
  }


  else {
    
    if(psw.length>8){
    const items = localStorage.getItem('userId');
   

    const newPassword = psw;




    console.log(userData);
    //api call
    const response = axios.put(`${BASE_URL}/api/changePassword/${id}`, { password: newPassword }) 
    .then(response => {
      console.log(response.data);
      console.log(response.status);
      if(response.status==200){

        toast.success(response.data.message);
      setTimeout(()=> {
        navigate('/')
      }, 1500);

    //reset all states datas
    setUser({
        psw: "",
        cpsw: ""
    
    })

      
    }else{
    
      toast.error(response.data.message);
    }

    })
    .catch(error => {
      console.log(error);
    });

  }
  else{
    toast.error('Enter valid password')
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
            <Form.Label className='labelss'>New Password</Form.Label>
            <InputGroup>
            
              <Form.Control onChange={userDetails}  name='psw' className='input-field' type="password" placeholder="Enter password" />
            </InputGroup>
            {userData.psw.length > 0 && userData.psw.length <= 8 && <p className="error-message">Password must be more than 8 characters</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="officialEmailAddress" >
            <Form.Label className='labelss'>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control onChange={userDetails} name='cpsw' className='input-field' type="password" placeholder="Enter password" />
            </InputGroup>
            {/* {userData.cpsw === "" && <p className="error-message">Confirm password required</p>} */}
            

          </Form.Group>
          {userData.psw !== userData.cpsw && <p className="error-message">Passwords do not match</p>}
  
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