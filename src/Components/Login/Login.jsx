import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { InputGroup, Button, Form } from 'react-bootstrap';
import { MdOutlineMailOutline } from "react-icons/md";
import Logo from '../../assets/techjays.png';
import { loginHr, registerHr } from '../../service/allapi';
import './Login.css'

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /\b@techjays\.com$/;
    if (!emailRegex.test(email)) {
      setEmailError(' Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    
    if (password.length < 8) {
      setPasswordError('Invalid password');
    }  else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      try {
        const userData = {
          email: email,
          password: password,
          role: "user"
        };

        const register = await registerHr(userData);

        if (register.status === 201 && register.data.message === "Signup Successfully") {
          localStorage.setItem("email", email);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);

          let userId = register.data.session.userId;
          let userToken = register.data.session.token;
          localStorage.setItem("userId", userId);
          localStorage.setItem("userToken", userToken);
        }

        const response = await loginHr(userData);

        if (response.status === 200 && response.data.message === "Login successful") {
          localStorage.setItem("email", email);
          toast.success(response.data.message);

          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);

          let userId = response.data.session.userId;
          let userToken = response.data.session.token;
          localStorage.setItem("userId", userId);
          localStorage.setItem("userToken", userToken);
        } else if (response.status === 200 && response.data.message === "Invalid Credentials") {
          toast.error(response.data.message);
        } else {
          toast.error('Unexpected error occurred');
        }
      } catch (error) {
        console.error('API call failed', error);
        toast.error('Failed to perform the operation. Please try again later.');
      }
    }
  };
  const hasErrors = emailError || passwordError;
  const containerHeight = hasErrors ? '500px' : '450px';
  

  return (
    <div className='header1'>
      <div className='Logo '>
        <img className='logo-img' src={Logo} alt="Logo" />
      </div>
      <div className={`header2 ${hasErrors ? 'has-errors' : ''}`} style={{ height: containerHeight }}>
        <div className="subhead "><b>Log in to HR Portal</b></div>
        <div>
          <div className=' mb-3'>
            <label className='labelss' style={{ lineHeight: "30px" }}>Email</label>
            <div className='box form-control'>
              <div className='EmailInput'>
                <MdOutlineMailOutline className='MailIcon' />
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                  className='InputEmail'
                  type="email"
                  placeholder="Enter the email"
                />
              </div>
              
            </div>
            <div className="error-message">{emailError}</div>
          </div>

          <Form.Group className="mb-3" controlId="officialPassword" >
            <Form.Label className='labelss'>Password</Form.Label>
            <InputGroup>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                className='input-field'
                type="password"
                placeholder="Enter your password"
              />
            </InputGroup>
            <div className="error-message">{passwordError}</div>
          </Form.Group>
        </div>
        <div className="forgot-password">
          <div className='password'>
            <a className='Frgtpass' href="/verify" >Forgot password?</a>
          </div>
        </div>
        <div className="submit-box">
          <Button
            style={{ backgroundColor: '#7F56D9', border: '10px' }}
            className='btn-login'
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
      <ToastContainer autoClose={800} position="top-center" />
    </div>
  );
}

export default Login;
