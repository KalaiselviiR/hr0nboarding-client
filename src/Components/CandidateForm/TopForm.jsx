import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { GoArrowLeft } from "react-icons/go";
import "./candidateForm.css";
import { CiCalendar } from "react-icons/ci";
import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import {
  handleFieldChange,
  initialValues,
  validationSchema,
} from "./validation";
import Form2 from "./Form2";

const TopForm = () => {
  //State management for document upload
  const [photoFiles, setPhotoFiles] = useState([]);
  const [aadharCardFiles, setAadharCardFiles] = useState([]);
  const [educationCertificateFiles, setEducationCertificateFiles] = useState(
    []
  );
  const [relievingLettersFiles, setRelievingLettersFiles] = useState([]);
  const [payslipFiles, setPayslipFiles] = useState([]);


  const [inputType, setInputType] = useState('text');


  const handleFocus = () => {
    setInputType('date');
  };

  //create an object to store datas from input family details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    dateOfJoining: null,
    presentAddress: "",
    permanentAddress: "",
    aboutYourself: "",
    experience: "",
    company: "",
    enjoyment: "",
    sneakpeek: "",
    photoFiles: null,
    aadharCardFiles: null,
    educationCertificateFiles: null,
    relievingLettersFiles: null,
    payslipFiles: null,
  })

  //input form validation using formk and yup library
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });
  // handle change function for validation errors
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // If the input is a file input, update the corresponding file name property
      const fileNameProperty = `${name}FileName`;
      setFormData((prevData) => ({
        ...prevData,
        [fileNameProperty]: files[0].name,
      }));
    }

    // Update both the form data and formik values
    const key = name;
    const updatedValue = type === "file" ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [key]: updatedValue,
    }));

    formik.handleChange(e); // Update formik values
  };

  console.log(formData)

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Trigger Formik's validation
    formik.handleSubmit();
  
    // Check if there are any errors in the form
    // if (formik.isValid) {
    //   console.log("Form is valid. Proceeding with form submission.");
  
      // Create an updated form data object
      const updatedFormData = {
        ...formData,
        photoFiles: photoFiles || null,
        aadharCardFiles: aadharCardFiles || null,
        educationCertificateFiles: educationCertificateFiles || null,
        relievingLettersFiles: relievingLettersFiles || null,
        payslipFiles: payslipFiles || null,
      };
  
      // Log the updated form data
      console.log(updatedFormData);
  
      // Perform any additional actions or API calls if needed
    // } else {
    //   console.log("Form contains validation errors. Please fix them.");
    // }
  };

  
  
    e.preventDefault()

    console.log(formData)

    const updatedFormData = {
      ...formData, // Keep the existing formData properties
      photoFiles: photoFiles || null,
      aadharCardFiles: aadharCardFiles || null,
      educationCertificateFiles: educationCertificateFiles || null,
      relievingLettersFiles: relievingLettersFiles || null,
      payslipFiles: payslipFiles || null,
    };

    console.log(updatedFormData);
  }

  const FileChange = (file, type) => {
    switch (type) {
      case "photo":
        setPhotoFiles(file);
        break;
      case "aadharCard":
        setAadharCardFiles(file);
        break;
      case "educationCertificate":
        setEducationCertificateFiles(file);
        break;
      case "relievingLetters":
        setRelievingLettersFiles(file);
        break;
      case "payslip":
        setPayslipFiles(file);
        break;
      default:
        break;
    }
  };


  const handleSameAsPresentAddressChange = (e) => {
    const isChecked = e.target.checked;

    // If checkbox is checked, update permanentAddress with presentAddress
    // If checkbox is unchecked, leave permanentAddress unchanged
    formik.setValues({
      ...formik.values, // Spread other form values
      permanentAddress: isChecked ? formik.values.presentAddress : formik.values.permanentAddress,
    });
  };


  return (
    <>
      <Navbar
        bg="white"
        variant="black"
        style={{
          background: "white",
          marginBottom: "10px",
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 1px 2px 2px rgba(0,0,0,0.1)",
        }}
      >
        <Container style={{ gap: "25px" }}>
          <Navbar.Brand href="#home">
            <img
              alt="Techjays Logo"
              src="https://www.thenewstuff.in/sites/default/files/inline-images/download.png"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className="d-none d-md-block"
              style={{
                background: "rgb(242, 249, 251)",
                boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
                borderRadius: "5px",
                fontWeight: "600",
              }}
            >
              Dashboard
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="container-fluid">
        <Container
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "10px",
            marginTop: "20px",
            borderRadius: "5px",
            width: "100%",
            boxSizing: "border-box",
            boxShadow: "0 1px 2px 2px rgba(0,0,0,0.1)",
          }}
        >
          <Row>
            <Col md={10}>
              <h5 style={{ gap: "20px" }}>
                <GoArrowLeft /> Candidate Info
              </h5>
            </Col>
            <Col md={2} className="d-flex justify-content-end">
              <h6 className="text-end d-none d-sm-inline-block align-top">
                Review Pending
              </h6>
            </Col>
          </Row>
        </Container>

        <Container
          className="mt-4 margin-mobile"
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "5px",
            boxShadow: "0 1px 2px 2px rgba(0,0,0,0.1)",
            boxSizing: "border-box",
          }}
        >
          <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Row>
              <Col
                md={12}
                className="d-flex align-items-center"
                style={{
                  borderBottom: "2px solid  rgba(0,0,0,0.1)",
                  marginBottom: "20px",
                }}
              >
                <h5>Basic Information</h5>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="labelss">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="text-danger">{formik.errors.firstName}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="labelss">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="text-danger">{formik.errors.lastName}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="labelss">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="✉️ Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label className="labelss">Phone Number</Form.Label>
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
                      type="tel"
                      placeholder="+91(555) 000-0000"
                      name="phoneNumber"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                  </InputGroup>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-danger">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="designation">
                  <Form.Label className="labelss">Designation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Designation"
                    name="designation"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.designation}
                  />
                  {formik.touched.designation && formik.errors.designation ? (
                    <div className="text-danger">
                      {formik.errors.designation}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="dateOfJoining">
                  <Form.Label className="labelss">Date of Joining</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <CiCalendar />
                    </InputGroup.Text>
                    <Form.Control
                      type={inputType}
                      onFocus={handleFocus}
                      placeholder="Date"
                      name="dateOfJoining"
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.dateOfJoining}
                    />
                  </InputGroup>
                  {formik.touched.dateOfJoining &&
                    formik.errors.dateOfJoining ? (
                    <div className="text-danger">
                      {formik.errors.dateOfJoining}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="presentAddress">
                  <Form.Label className="labelss">Present Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Present Address"
                    name="presentAddress"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.presentAddress}
                  />

                  {formik.touched.presentAddress &&
                    formik.errors.presentAddress ? (
                    <div className="text-danger">
                      {formik.errors.presentAddress}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="permanentAddress">
                  <Form.Label className="labelss">Permanent Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Permanent Address"
                    name="permanentAddress"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.permanentAddress}
                    disabled={formik.values.sameAsPresentAddress}
                  />
                  <Form.Check
                    type="checkbox"
                    id="sameAsPresentAddress"
                    label="Same as Present Address"
                    name="sameAsPresentAddress"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      formik.setValues({
                        ...formik.values,
                        sameAsPresentAddress: isChecked,
                        permanentAddress: isChecked
                          ? formik.values.presentAddress
                          : formik.values.permanentAddress,
                      });
                    }}
                  />
                  {formik.touched.permanentAddress &&
                    formik.errors.permanentAddress ? (
                    <div className="text-danger">
                      {formik.errors.permanentAddress}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="aboutYourself">
                  <Form.Label className="labelss"> About yourself</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter a description..."
                    name="aboutYourself"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.aboutYourself}
                  />
                  {formik.touched.aboutYourself &&
                    formik.errors.aboutYourself ? (
                    <div className="text-danger">
                      {formik.errors.aboutYourself}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="experience">
                  <Form.Label className="labelss">
                    Overall Work Experience
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Experience"
                    name="experience"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.experience}
                  />
                  {formik.touched.experience && formik.errors.experience ? (
                    <div className="text-danger">
                      {formik.errors.experience}
                    </div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label className="labelss">Previous Company</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your previous company name"
                    name="company"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.company}
                  />
                  {formik.touched.company && formik.errors.company ? (
                    <div className="text-danger">{formik.errors.company}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="enjoyment">
                  <Form.Label className="labelss">
                    What do you enjoy outside of your work?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter a description..."
                    name="enjoyment"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.enjoyment}
                  />
                  {formik.touched.enjoyment && formik.errors.enjoyment ? (
                    <div className="text-danger">{formik.errors.enjoyment}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="sneakpeek">
                  <Form.Label className="labelss">
                    Sneak peek at your bucket list
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter a description..."
                    name="sneakpeek"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sneakpeek}
                  />
                </Form.Group>
                {formik.touched.sneakpeek && formik.errors.sneakpeek ? (
                  <div className="text-danger">{formik.errors.sneakpeek}</div>
                ) : null}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={4}>
                <Form.Label style={{ fontWeight: "500" }}>Documents</Form.Label>
                <FileUpload
                  label="Photo"
                  controlId="photo"
                  acceptedFiles={photoFiles}
                  setAcceptedFiles={setPhotoFiles}
                  onFileChange={(file) => FileChange(file, "photo")}
                />

                <FileUpload
                  label="Aadhar Card"
                  controlId="aadharCard"
                  acceptedFiles={aadharCardFiles}
                  setAcceptedFiles={setAadharCardFiles}
                  onFileChange={(file) => FileChange(file, "aadharCard")}
                />

                <FileUpload
                  label="Education Certificate"
                  controlId="educationCertificate"
                  acceptedFiles={educationCertificateFiles}
                  setAcceptedFiles={setEducationCertificateFiles}
                  onFileChange={(file) => FileChange(file, "educationCertificate")}
                />

                <FileUpload
                  label="Relieving Letters from all your previous organizations"
                  controlId="relievingLetters"
                  acceptedFiles={relievingLettersFiles}
                  setAcceptedFiles={setRelievingLettersFiles}
                  onFileChange={(file) => FileChange(file, "relievingLetters")}
                />

                <FileUpload
                  label="3 Months Payslip"
                  controlId="payslip"
                  acceptedFiles={payslipFiles}
                  setAcceptedFiles={setPayslipFiles}
                  onFileChange={(file) => FileChange(file, "payslip")}
                />

                {/* <div
                  style={{
                    display: "flex",
                    marginTop: "50px",
                    marginBottom: "25px",
                    gap: "10px",
                  }}
                >
                  <Button onClick={handleSubmit}
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
                  </Button>
                </div> */}
              </Col>
            </Row>
          </Form>
        </Container>

        <Form2 />

  <div style={{ display: "flex", 
  justifyContent: "center",
  marginBottom:"20px",
  
  }}>
  <Button onClick={handleSubmit}
    style={{
      height: "35px",
      fontSize: "15px",
      backgroundColor: "rgb(210, 164, 250)",
      color: "white",
      borderColor: "rgb(210, 164, 250)",
      fontWeight: "500",
      marginRight: "10px",
    }}
  >
    Submit
  </Button>
 
</div>

               
      </div>
    </>
  );
};

export default TopForm;
