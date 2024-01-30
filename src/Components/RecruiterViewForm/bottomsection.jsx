import React from 'react';
import '../CandidateForm/CandidateForm.css'; // Assuming you have a custom CSS file for styling
import { CiExport, CiCalendar } from 'react-icons/ci';
import { InputGroup, Row, Col, Button, Dropdown,Form, Container } from 'react-bootstrap';
import { MdOutlineMail } from "react-icons/md";




function BottomSection() {


  return (
    
    <div className=' margin-mobile' style={{width:"100%"}}>
     
    <Container
        style={{
          background: "white",
         
          marginBottom: "10px",
          marginTop: "20px",
         
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 0px 2px 2px rgba(0,0,0,0.1)",
          borderRadius:"5px 5px 0px 0px",
        }}
      >
         <div className='FamilyDet'>
        <h3 className='heading'> Family details For Medical Insurance</h3>
        <div className='buttons'>
          <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='buttonss'
          >
            <CiExport
              className='me-2 icon'
              style={{ color: 'white', fontSize: '19px', fontWeight: 'bolder' }}
            />
            Export
          </Button>
        </div>
      </div>
      </Container>
      <Container
      className="mt"
      style={{
        background: "white",
        borderRadius: "0px 0px 5px 5px",
        boxShadow: "0 0px 0px 2px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      
       
      }}>
     
     
      {/* Family details form */}
      <div >
      <Form className='forms'>
        <Row className='mb-3'>
          <Col xs={12} md={4}>
            <Form.Group controlId='formGroupEmail'>
              <Form.Label className='labelss'>Family member name</Form.Label>
              <Form.Control
                className='input-field'
                type='text'
               
                name='memberName'
               
                />
               
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId='realtionShip'>
              <Form.Label className='labelss'>Relationship</Form.Label>
              <Form.Control
                className='input-field'
                type='text'
                name='relationship'
               
              />
             
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId='dateOfBirth'>
              <Form.Label className='labelss'>Date of Birth</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <CiCalendar />
                </InputGroup.Text>
                <Form.Control
                  className='input-field'
                  type='date'
                 
                  name='dateOfBirth'
                 
                />
              </InputGroup>
             
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId='EmergencyPhoneNumber'>
              <Form.Label className='labelss'>
                Emergency contact number
              </Form.Label>
              <InputGroup>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='outline-secondary'
                    id='dropdown-basic'
                  >
                    IN
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href='#'>+91</Dropdown.Item>
                    <Dropdown.Item href='#'>+44</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Form.Control
                  className='input-field'
                  type='tel'
                  
                  name='emergencyContactNumber'
                 
                />
              </InputGroup>
            
            </Form.Group>
          </Col>

          <Col xs={12} md={4}>
            <Form.Group controlId='emailAddress'>
              <Form.Label className='labelss'>Email address</Form.Label>
              <Form.Control
                className='input-field'
                type='email'
               
                name='emailAddress'
                
              />
             
            </Form.Group>
          </Col>
        </Row>
      </Form>
      
      </div>
      </Container>
      {/* <br /> */}
      <Container
        style={{
          background: "white",
         
          marginBottom: "10px",
          marginTop: "20px",
         
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 0px 2px 2px rgba(0,0,0,0.1)",
          borderRadius:"5px 5px 0px 0px",
        }}
      >
         <div className='FamilyDet'>
        <h3 className='heading'>PF Account</h3>
        <div className='buttons'>
          <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='buttonss'
          >
            <CiExport
              className='me-2 icon'
              style={{ color: 'white', fontSize: '19px', fontWeight: 'bolder' }}
            />
            Export
          </Button>
        </div>
      </div>
      </Container>

      {/* Details of PF */}
      <Container
      className="mt"
      style={{
        background: "white",
        borderRadius: "0px 0px 5px 5px",
        boxShadow: "0 1px 2px 2px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}>
        

      
      {/* PF details form */}
      <div>
      <Form className='forms'>
        <Row className='mb-3'>
          <Col xs={12} md={4}>
            <Form.Group controlId='epfoUan'>
              <Form.Label className='labelss'>EPFO UAN (If already allotted)</Form.Label>
              <Form.Control className='input-field' type='text'
             
               name='epfoUan'
              
             />
            
               
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId='pfNo'>
              <Form.Label className='labelss'>PF NO</Form.Label>
              <Form.Control className='input-field' type='text' 
              
              name='pfNo'
              
             />
             
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group controlId='adharCard' className='ms'>
              <Form.Label className='labelss'>AADHAR CARD NO</Form.Label>
              <Form.Control className='input-field' type='text' 
             
              name='adharCard'
             
            />
           
            </Form.Group>
          </Col>
          <Row>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3" controlId="panCardNo">
                <Form.Label className='labelss'>PAN CARD NO</Form.Label>
                <Form.Control  className='input-field' type="text" 
              
                name='panCard'
               
              />
              
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 ms-1" controlId="employeeName">
                <Form.Label className='labelss'>Employee's name (As per Aadhar)</Form.Label>
                <Form.Control  className='input-field ' type="text"
               
                 name='employeesName'
                
               />
              
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
      
      <Form.Group className="mb-3 " controlId="dateOfBirthAs">
                <Form.Label className='labelss ms-1' >Date of birth (As per the Aadhar)</Form.Label>
                <InputGroup className='ms-1'>
                  <InputGroup.Text>
                    <CiCalendar />
                  </InputGroup.Text>
                  <Form.Control  className='input-field' type="date"
                
                   name='dateOfBirthAs'
                  
                   />
                </InputGroup>
               
              </Form.Group>
        </Col>
        
      </Row>
      <Row>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 " controlId="formGroupEmail">
                <Form.Label className='labelss'>Gender</Form.Label>
                <Form.Control  className='input-field' type="text" 
             
                name='gender'
                
              />
             
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 ms-2" controlId="formGroupEmail">
                <Form.Label className='labelss'>Marital status</Form.Label>
                <Form.Control  className='input-field' type="text" 
              
                name='maritalStatus'
                
              />
             
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                <Form.Label className='labelss'>Father's name</Form.Label>
                <Form.Control  className='input-field' type="text" 
                
                name='fatherName'
              
              />
              
     </Form.Group>
        </Col>
        
      </Row>
      <Row>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className='labelss'>Bank A/C No</Form.Label>
                <Form.Control  className='input-field' type="text" 
              
                name='accountNumber'
              
              />
              
              
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                <Form.Label className='labelss'>Bank branch</Form.Label>
                <Form.Control  className='input-field' type="text" 
              
                name='branch'
                
              />
             
     </Form.Group>
        </Col>
        <Col  xs={12} md={4}>
        <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                <Form.Label className='labelss'>Bank IFSC No</Form.Label>
                <Form.Control  className='input-field' type="text" 
                
                name='ifsc'
               
              />
              
                
     </Form.Group>
        </Col>
        
      </Row>
        </Row>
        {/* Continue adding more rows and columns as needed */}
      </Form>
      </div>
      </Container>
     
      <Container
        style={{
          background: "white",
          
          marginBottom: "10px",
          marginTop: "20px",
          borderRadius: "5px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 0px 2px 2px rgba(0,0,0,0.1)",
        
        }}
      >
       <div className='FamilyDet'>
        <h3 className='heading'>Details of HROne Portal</h3>
        <div className='buttons'>
          <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='buttonss'
          >
            <CiExport
              className='me-2 icon'
              style={{ color: 'white', fontSize: '19px', fontWeight: 'bolder' }}
            />
            Export
          </Button>
        </div>
      </div>
      </Container>
      {/* Details of HROne */}
      <Container
      className="mt"
      style={{
        background: "white",
        marginBottom: "50px",
        borderRadius: "0px 0px 5px 5px",
        boxShadow: "0 1px 2px 2px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}>
      {/* <div className='FamilyDet'>
        <h3 className='heading'>Details of HROne</h3>
        <div className='buttons'>
          <Button
            style={{ backgroundColor: '#7F56D9', border: 'none' }}
            className='buttonss'
          >
            <CiExport
              className='me-2 icon'
              style={{ color: 'white', fontSize: '19px', fontWeight: 'bolder' }}
            />
            Export
          </Button>
        </div>
      </div> */}
     
      {/* HROne details form */}
      <div>
      <Form className='forms'>
      <Row>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="prefix">
            <Form.Label className='labelss'>Prefix</Form.Label>
            <Form.Control className='input-field' type="text"
             
             name='prefix'
             
           />
           
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label className='labelss'>First name</Form.Label>
            <Form.Control className='input-field' type="text" 
           
            name='firstNamehr'
            
          />
          
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="middleName">
            <Form.Label className='labelss'>Middle name</Form.Label>
            <Form.Control className='input-field' type="text" 
           
            name='middleName'
           
          />
          
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label className='labelss'>Last name</Form.Label>
            <Form.Control className='input-field' type="text"
             
             name='lastNamehr'
             
           />
           
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="bloodGroup">
            <Form.Label className='labelss'>Blood group</Form.Label>
            <Form.Control className='input-field' type="text"
           
             name='bloodGroup'
            
           />
          
          </Form.Group>
        </Col>
        <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="nationality">
            <Form.Label className='labelss'>Nationality</Form.Label>
            <Form.Control className='input-field' type="text"
           
             name='nationality'
            
           />
          
          </Form.Group>
        </Col>
      </Row>

      {/* <Row> */}
        {/* <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="officialEmailAddress">
            <Form.Label className='labelss'>Official email address</Form.Label>
            <InputGroup> */}
              {/* <InputGroup.Text>
                <MdOutlineMail  />
              </InputGroup.Text> */}
              {/* <Form.Control className='input-field' type="email"
               placeholder="✉️ olivia@untitleedui.com" 
               name='officialEmail'
            
               />
            </InputGroup>
           
          </Form.Group>
        </Col> */}
        {/* <Col xs={12} md={4}>
          <Form.Group className="mb-3" controlId="employeeId">
            <Form.Label className='labelss'>Employee ID</Form.Label>
            <Form.Control className='input-field' type="text"
             placeholder="olivia"
             name='employeeId'
             
           />
          
          </Form.Group>
        </Col>
      
      </Row> */}
    </Form>
      </div>
      </Container>
    </div>
  );
}

export default BottomSection;