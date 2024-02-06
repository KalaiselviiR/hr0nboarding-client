import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { CiExport, CiCalendar } from 'react-icons/ci';
import { InputGroup, Row, Col, Button, Dropdown,Form } from 'react-bootstrap';
import { MdOutlineMail, MdOutlineMailOutline } from "react-icons/md";
import email_icon from '../../assets/gmail.jpg'
import password_icon from '../../assets/password.png'
import Logo from '../../assets/techjays.png'
import { Verifymail } from '../../service/allapi';
// import { MdOutlineMailOutline } from 'react-icons/md';

function VerifyEmail() {
     //create an object to store datas from input
  const [userData, setUser] = useState({
    email: "",
    psw: ""

  })
const [emailError, setEmailError] = useState("");   
const navigate=useNavigate()
  
const userDetails = (e) => {

  e.preventDefault()
  
  const { value, name } = e.target
 
  const key = e.target.name

  setUser({ ...userData, [key]: value })

  if (name === 'email') {
    setEmailError("");
  }

}
console.log(userData);

const handleSubmit = async (e) => {
  e.preventDefault();
  const { email } = userData;

  if (email === "") {
    setEmailError("Email is required");
    return;
  } else if (!isValidEmail(email)) {
    setEmailError("Invalid email format");
    return;
  } else {
    setEmailError("");
   
    //api call
    const response = await Verifymail(userData)
    console.log(response);
    if(response.status==200){
    
    
        toast.success(response.data.message);
      setTimeout(()=> {
        navigate('/')
      }, 1500);
       
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

const isValidEmail = (email) => {
  // Add your custom email validation logic here
  const validDomains = ["gmail.com", "techjays.com"];
  const minEmailLength = 5;

  const emailParts = email.split('@');
  if (emailParts.length !== 2 || emailParts[0].length < minEmailLength) {
    return false;
  }

  const domain = emailParts[1].toLowerCase();
  return validDomains.includes(domain);
};
  return (
    <div className='header1'>
    <div className='Logo  '>
      
      <img className='logo-img' src={Logo} alt="Logo" />
     
    
    </div>
     <div className='header2'>
      
        <div className="subhead "><b>Forget Password</b>
        </div>
       
        <div>
        <div className=' mb-3'>
            <label className='labelss' style={{paddingBottom:'10px'}}>Email</label>
            <div>
            <div className='box form-control'>
              <div className='EmailInput'>
                <MdOutlineMailOutline className='MailIcon' />
                <input
                 name='email' // Add the name attribute
                 onChange={userDetails} // Correct the event handler
                 className='InputEmail'
                 type="email"
                 placeholder="Enter the email"
                />
              </div>
              
            </div>
           
            <p className="error-message">{emailError}</p>
            </div>
          </div>
          </div>

      <div className="submit-box">
      <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='btn-login' onClick={handleSubmit}
          >
          
            Submit
          </Button>
      </div>
      <div className="submit-box">
      <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='btn-login' href='/'
          >
          
            Go Back
          </Button>
      </div>
      </div>
      
      <ToastContainer autoClose={800}  position="top-center" />
      </div>
  )
}

export default VerifyEmail