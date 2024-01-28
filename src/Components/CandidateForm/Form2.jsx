import React, { useState } from "react";
import "./CandidateForm.css"; // Assuming you have a custom CSS file for styling
import { CiExport, CiCalendar } from "react-icons/ci";
import {
  InputGroup,
  Row,
  Col,
  Button,
  Dropdown,
  Form,
  Container,
} from "react-bootstrap";
import { MdOutlineMail } from "react-icons/md";
import { useFormik } from "formik";
import {
  handleFieldChange,
  initialValues,
  validationSchema,
} from "./validation";
import {  createCandidateDetails } from "../../service/allapi";


function Form2({updateForm2Data ,updateCandidateData}) {
  //create an object to store datas from input family details
  const [candidateData, setCandidate] = useState({
    memberName: "",
    relationship: "",
    dateOfBirth: "",
    emergencyContactNumber: "",
    emailAddress: "",
    epfoUan: "",
    pfNo: "",
    adharCard: "",
    panCard: "",
    employeesName: "",
    dateOfBirthAs: "",
    gender: "",
    maritalStatus: "",
    fatherName: "",
    accountNumber: "",
    branch: "",
    ifsc: "",
    prefix: "",
    firstNamehr: "",
    middleName: "",
    lastNamehr: "",
    bloodGroup: "",
    nationality: "",
    officialEmail: "",
    employeeId: "",
  });



  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  

  const handleChange = (e) => {
    handleFieldChange(formik, e);
    //prevent the event
    e.preventDefault();
    //access value to update in userData
    const { value } = e.target;
    //access key to update in userData
    const key = e.target.name;
    //update the data with existing data
    setCandidate({ ...candidateData, [key]: value });
    updateForm2Data(candidateData)
    updateCandidateData(candidateData);
  };


  

  const handleSubmitBottom = async (e) => {
    e.preventDefault();
     formik.handleSubmit()
    //api call
    const response = await createCandidateDetails(candidateData);

    if (response.status == 200) {
      toast.success(response.data.message);

      //reset all states datas
      setCandidate({
        memberName: "",
        relationship: "",
        dateOfBirth: "",
        emergencyContactNumber: "",
        emailAddress: "",
        epfoUan: "",
        pfNo: "",
        adharCard: "",
        panCard: "",
        employeesName: "",
        dateOfBirthAs: "",
        gender: "",
        maritalStatus: "",
        fatherName: "",
        accountNumber: "",
        branch: "",
        ifsc: "",
        prefix: "",
        firstNamehr: "",
        middleName: "",
        lastNamehr: "",
        bloodGroup: "",
        nationality: "",
        officialEmail: "",
        employeeId: ""
      });
    } else {
      toast.error(response.data.message);
    }
  };




  return (
    <div className=" margin-mobile" style={{ width: "100%" }}>
      <Container
        style={{
          background: "white",

          marginBottom: "10px",
          marginTop: "20px",

          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 0px 2px 2px rgba(0,0,0,0.1)",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <div className="FamilyDet">
          <h3 className="heading"> Family details</h3>
        </div>
      </Container>
      <Container
        className="mt"
        style={{
          background: "white",
          borderRadius: "0px 0px 5px 5px",
          boxShadow: "0 0px 0px 2px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
        }}
      >
        {/* Family details form */}
        <div>
          <Form
            className="forms"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label className="labelss">
                    Family member name
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Name"
                    name="memberName"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.memberName}
                  />
                  {formik.touched.memberName && formik.errors.memberName ? (
                    <div className="text-danger">
                      {formik.errors.memberName}
                    </div>
                  ) : null}
                </Form.Group>
                <Button
                  style={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    height: "35px",
                    fontSize: "15px",
                    backgroundColor: "white",
                    color: "rgb(147, 48, 233)",
                    borderColor: "rgb(147, 48, 233)",
                    fontWeight: "500",
                  }}
                >
                  + Add
                </Button>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId="realtionShip">
                  <Form.Label className="labelss">Relationship</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Relationship"
                    name="relationship"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.relationship}
                  />
                  {formik.touched.relationship && formik.errors.relationship ? (
                    <div className="text-danger">
                      {formik.errors.relationship}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId="dateOfBirth">
                  <Form.Label className="labelss">Date of Birth</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <CiCalendar />
                    </InputGroup.Text>
                    <Form.Control
                    type="date"
                      className="input-field"
                      placeholder="Date"
                      name="dateOfBirth"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dateOfBirth}
                    />
                  </InputGroup>
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="text-danger">
                      {formik.errors.dateOfBirth}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId="EmergencyPhoneNumber">
                  <Form.Label className="labelss">
                    Emergency contact number
                  </Form.Label>
                  <InputGroup>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                      >
                        IN
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#">+91</Dropdown.Item>
                        <Dropdown.Item href="#">+44</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                      className="input-field"
                      type="tel"
                      placeholder="+91(555) 000-0000"
                      name="emergencyContactNumber"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.emergencyContactNumber}
                    />
                  </InputGroup>
                  {formik.touched.emergencyContactNumber &&
                  formik.errors.emergencyContactNumber ? (
                    <div className="text-danger">
                      {formik.errors.emergencyContactNumber}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>

              <Col xs={12} md={4}>
                <Form.Group controlId="emailAddress">
                  <Form.Label className="labelss">Email address</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    name="emailAddress"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.emailAddress}
                  />
                  {formik.touched.emailAddress && formik.errors.emailAddress ? (
                    <div className="text-danger">
                      {formik.errors.emailAddress}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                marginBottom: "25px",
                gap: "10px",
              }}
            >
              {/* <Button
                onClick={handleSubmit}
                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "rgb(210, 164, 250)",
                  color: "white",
                  borderColor: "rgb(210, 164, 250)",
                  fontWeight: "500",
                }}
              >
                Submit
              </Button>
              <Button
                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "white",
                  color: "rgb(147, 48, 233)",
                  borderColor: "rgb(147, 48, 233)",
                  fontWeight: "500",
                }}
              >
                Save as draft
              </Button> */}
            </div>
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
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <div className="FamilyDet">
          <h3 className="heading">Details of PF</h3>
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
        }}
      >
        {/* PF details form */}
        <div>
          <Form className="forms">
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <Form.Group controlId="epfoUan">
                  <Form.Label className="labelss">
                    EPFO UAN (If already allotted)
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="EPFO UAN"
                    name="epfoUan"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.epfoUan}
                  />
                  {formik.touched.epfoUan && formik.errors.epfoUan ? (
                    <div className="text-danger">{formik.errors.epfoUan}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="pfNo">
                  <Form.Label className="labelss">PF NO</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="PF No"
                    name="pfNo"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pfNo}
                  />
                  {formik.touched.pfNo && formik.errors.pfNo ? (
                    <div className="text-danger">{formik.errors.pfNo}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="adharCard" className="ms">
                  <Form.Label className="labelss">AADHAR CARD NO</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Adhar Card No"
                    name="adharCard"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.adharCard}
                  />
                  {formik.touched.adharCard && formik.errors.adharCard ? (
                    <div className="text-danger">{formik.errors.adharCard}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3" controlId="panCardNo">
                    <Form.Label className="labelss">PAN CARD NO</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Pan Card No"
                      name="panCard"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.panCard}
                    />
                    {formik.touched.panCard && formik.errors.panCard ? (
                      <div className="text-danger">{formik.errors.panCard}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 ms-1" controlId="employeeName">
                    <Form.Label className="labelss">
                      Employee's name (As per Aadhar)
                    </Form.Label>
                    <Form.Control
                      className="input-field "
                      type="text"
                      placeholder="Employee's Name"
                      name="employeesName"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.employeesName}
                    />
                    {formik.touched.employeesName &&
                    formik.errors.employeesName ? (
                      <div className="text-danger">
                        {formik.errors.employeesName}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 " controlId="dateOfBirthAs">
                    <Form.Label className="labelss ms-1">
                      Date of birth (As per the Aadhar)
                    </Form.Label>
                    <InputGroup className="ms-1">
                      <InputGroup.Text>
                        <CiCalendar />
                      </InputGroup.Text>
                      <Form.Control
                        className="input-field"
                        type="date"
                        placeholder="Date"
                        name="dateOfBirthAs"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dateOfBirthAs}
                      />
                    </InputGroup>
                    {formik.touched.dateOfBirthAs &&
                    formik.errors.dateOfBirthAs ? (
                      <div className="text-danger">
                        {formik.errors.dateOfBirthAs}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 " controlId="formGroupEmail">
                    <Form.Label className="labelss">Gender</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Gender"
                      name="gender"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    />
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-danger">{formik.errors.gender}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 ms-2" controlId="formGroupEmail">
                    <Form.Label className="labelss">Marital status</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Marital Status"
                      name="maritalStatus"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.maritalStatus}
                    />
                    {formik.touched.maritalStatus &&
                    formik.errors.maritalStatus ? (
                      <div className="text-danger">
                        {formik.errors.maritalStatus}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                    <Form.Label className="labelss">Father's name</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Father's Name"
                      name="fatherName"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fatherName}
                    />
                    {formik.touched.fatherName && formik.errors.fatherName ? (
                      <div className="text-danger">
                        {formik.errors.fatherName}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className="labelss">Bank A/C No</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Account Number"
                      name="accountNumber"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.accountNumber}
                    />
                    {formik.touched.accountNumber &&
                    formik.errors.accountNumber ? (
                      <div className="text-danger">
                        {formik.errors.accountNumber}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                    <Form.Label className="labelss">Bank branch</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="Branch"
                      name="branch"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.branch}
                    />
                    {formik.touched.branch && formik.errors.branch ? (
                      <div className="text-danger">{formik.errors.branch}</div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                    <Form.Label className="labelss">Bank IFSC No</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="text"
                      placeholder="IFSC"
                      name="ifsc"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.ifsc}
                    />
                    {formik.touched.ifsc && formik.errors.ifsc ? (
                      <div className="text-danger">{formik.errors.ifsc}</div>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>
            </Row>

            {/* <div
              style={{
                display: "flex",
                marginTop: "50px",
                marginBottom: "25px",
                gap: "10px",
              }}
            > */}

              {/* <Button
                onClick={handleSubmitOne}

              <Button
                onClick={handleSubmit}

                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "rgb(210, 164, 250)",
                  color: "white",
                  borderColor: "rgb(210, 164, 250)",
                  fontWeight: "500",
                }}
              >
                Submit
              </Button>
              <Button
                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "white",
                  color: "rgb(147, 48, 233)",
                  borderColor: "rgb(147, 48, 233)",
                  fontWeight: "500",
                }}
              >
                Save as draft
              </Button> */}
            {/* </div> */}
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
        <div className="FamilyDet">
          <h3 className="heading">Details of HROne</h3>
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
        }}
      >
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
          <Form className="forms">
            <Row>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="prefix">
                  <Form.Label className="labelss">Prefix</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="olivia"
                    name="prefix"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prefix}
                  />
                  {formik.touched.prefix && formik.errors.prefix ? (
                    <div className="text-danger">{formik.errors.prefix}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="labelss">First name</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="First Name"
                    name="firstNamehr"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstNamehr}
                  />
                  {formik.touched.firstNamehr && formik.errors.firstNamehr ? (
                    <div className="text-danger">
                      {formik.errors.firstNamehr}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="middleName">
                  <Form.Label className="labelss">Middle name</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Middle Name"
                    name="middleName"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.middleName}
                  />
                  {formik.touched.middleName && formik.errors.middleName ? (
                    <div className="text-danger">
                      {formik.errors.middleName}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="labelss">Last name</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastNamehr"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastNamehr}
                  />
                  {formik.touched.lastNamehr && formik.errors.lastNamehr ? (
                    <div className="text-danger">
                      {formik.errors.lastNamehr}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="bloodGroup">
                  <Form.Label className="labelss">Blood group</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Blood Group"
                    name="bloodGroup"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bloodGroup}
                  />
                  {formik.touched.bloodGroup && formik.errors.bloodGroup ? (
                    <div className="text-danger">
                      {formik.errors.bloodGroup}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="nationality">
                  <Form.Label className="labelss">Nationality</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nationality}
                  />
                  {formik.touched.nationality && formik.errors.nationality ? (
                    <div className="text-danger">
                      {formik.errors.nationality}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="officialEmailAddress">
                  <Form.Label className="labelss">
                    Official email address
                  </Form.Label>
                  <InputGroup>
                    {/* <InputGroup.Text>
                <MdOutlineMail  />
              </InputGroup.Text> */}
                    <Form.Control
                      className="input-field"
                      type="email"
                      placeholder="✉️ Email"
                      name="officialEmail"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.officialEmail}
                    />
                  </InputGroup>
                  {formik.touched.officialEmail &&
                  formik.errors.officialEmail ? (
                    <div className="text-danger">
                      {formik.errors.officialEmail}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="employeeId">
                  <Form.Label className="labelss">Employee ID</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Employee ID"
                    name="employeeId"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.employeeId}
                  />
                  {formik.touched.employeeId && formik.errors.employeeId ? (
                    <div className="text-danger">
                      {formik.errors.employeeId}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            {/* <div
              style={{
                display: "flex",
                marginTop: "50px",
                marginBottom: "25px",
                gap: "10px",
              }} 
            >*/}

              {/* <Button
                onClick={handleSubmitTwo}

              <Button
                onClick={handleSubmit}
                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "rgb(210, 164, 250)",
                  color: "white",
                  borderColor: "rgb(210, 164, 250)",
                  fontWeight: "500",
                }}
              >
                Submit
              </Button>
              <Button
                style={{
                  height: "35px",
                  fontSize: "15px",
                  backgroundColor: "white",
                  color: "rgb(147, 48, 233)",
                  borderColor: "rgb(147, 48, 233)",
                  fontWeight: "500",
                }}
              >
                Save as draft
              </Button> */}
            {/* </div> */}
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Form2;
