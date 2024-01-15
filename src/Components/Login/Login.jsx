import React from 'react'
import './Login.css'

import email_icon from '../../assets/gmail.jpg'
import password_icon from '../../assets/password.png'
import logo from '../../assets/techjays.png'






function Login() {
  return (
    <div className='container1'> 
    
    <div className='logo'>
    <img src={logo} alt="logo" /></div>
     <div className='container'>
      
      <div className="header">
        <div classname="text"><b>Log in to HR Portal</b>
        </div>
        <div classname="underline"></div>
      </div>
      <div classname="inputs">
        <div className="user">Email</div>
        <i class="fa-regular fa-envelope"></i>
        <div className="input">
          {/* <img src={email_icon} alt="email" /> */}
          <input type="email" placeholder="Enter email" />
          {/* <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> */}
        </div>
        <div className="word">Password</div>
        <div className="input">
        <i class="fa-regular fa-envelope"></i>
        
          {/* <img src={password_icon} alt="password" /> */}
          <input type="password" placeholder="Enter password" img src='password.png'/>
        </div>
      </div>
      <div classname="forgot-password"><span style={{marginLeft:"270px",textDecoration:"none"}}><a href="http://localhost:5173/" style={{textDecoration:"none"}}>Forgot password?</a></span></div>
      <div classname="submit container">
        <div classname="submit"><p><p></p></p><button style={{width:"410px",height:"45px",borderRadius:"10px",background:"rgb(106,90,205)", borderColor: "rgb(106,90,205)",color:"white", fontSize: 17, fontWeight:"bold"}}>Login</button></div>
      </div>

      </div>
      </div>
  )
}

export default Login