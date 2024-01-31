import React, { useEffect, useState } from "react";
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
import "./CandidateForm.css";
import { CiCalendar } from "react-icons/ci";
import FileUpload from "./FileUpload";
import { useFormik } from "formik";
import {
  handleFieldChange,
  initialValues,
  validationSchema,
} from "./validation";
import Form2 from "./Form2";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import { getSingleCandidate } from "../../service/allapi";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const TopForm = () => {
  //State management for document upload
  const [photoFiles, setPhotoFiles] = useState([]);
  const [aadharCardFiles, setAadharCardFiles] = useState([]);
  const [educationCertificateFiles, setEducationCertificateFiles] = useState(
    []
  );
  const [relievingLettersFiles, setRelievingLettersFiles] = useState([]);
  const [payslipFiles, setPayslipFiles] = useState([]);

  const [scrollToError, setScrollToError] = useState(null);

  const [id, setId] = useState(null);


        // param id 
        const{token} =useParams()
        //get details of the perticuler expense
        const getoneCandidate=async()=>{
          
          const {data}=await getSingleCandidate(token)
          console.log(data);
            setId(data._id)
        }
        console.log(id);

        useEffect(() => {
          console.log('Updated id:', id);
          setFormData((prevData) => ({
            ...prevData,
            id: id,
          }));
        }, [id]);

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
    id:id
    
  });

  const [form2Data, setForm2Data] = useState({
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
    // officialEmail: "",
    // employeeId: "",
  });

  //input form validation using formk and yup library
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log(values);
    },
  });

  // Function to update form2 data
  const updateForm2Data = (data) => {
    const combinedValues = {
      ...formik.values,
      ...data,
    };
    formik.setValues(combinedValues);
    setForm2Data(data);
  };

  // Function to update candidate data from Form2
  const updateCandidateData = (data) => {
    // Update formData with candidateData from Form2
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };




  
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

    // Update formik values for file input
    formik.setFieldValue(name, files[0]);
  } else {
    // Update both the form data and formik values for non-file inputs
    const key = name;
    const updatedValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [key]: updatedValue,
    }));

    formik.handleChange(e);
  }
};


  console.log(formData);

  console.log(formik.values);
    console.log(formik.dirty);
    console.log(formik.errors);
    // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    // Trigger Formik's validation
    formik.handleSubmit();
  
    // Check if there are any errors in the form
    if (Object.keys(formik.errors).length === 0) {
      // Form is valid, proceed with form submission
  
      try {
        // Prepare FormData for file uploads
        const formData = new FormData();
        
        // Append all form fields, including file inputs
        for (const key in formik.values) {
          formData.append(key, formik.values[key] || '');
        }
           
        // Send a POST request using Axios
        const response = await axios.post('http://localhost:4000/api/candidates', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 201) {
          console.log('Form data submitted successfully');
          // Optionally: Reset form or navigate to a success page
        } else {
          console.error('Failed to submit form data');
        }
      } catch (error) {
        console.error('Error while submitting form data:', error);
      }
  
      // Perform any additional actions or API calls if needed
    }
  };
  

  const FileChange = (file, type) => {
    switch (type) {
      case "photo":
        setPhotoFiles(file);
        formik.setFieldValue("photoFiles",file);
        break;
      case "aadharCard":
        setAadharCardFiles(file);
        formik.setFieldValue("aadharCardFiles",file);
        break;
      case "educationCertificate":
        setEducationCertificateFiles(file);
        formik.setFieldValue("educationCertificateFiles",file);
        break;
      case "relievingLetters":
        setRelievingLettersFiles(file);
        formik.setFieldValue("relievingLettersFiles",file);
        break;
      case "payslip":
        setPayslipFiles(file);
        formik.setFieldValue("payslipFiles",file);
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
      permanentAddress: isChecked
        ? formik.values.presentAddress
        : formik.values.permanentAddress,
    });
  };

  useEffect(()=>{
 
    getoneCandidate()
   
  },[])
  

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
                <div className="phoneDiv ">
                        <div className="labelss">
                            <p>Phone number</p>
                        </div>
                        <div className="phoneInput ">
                            <select className="country-code  "
                             onChange={(e) => setCountryCode(e.target.value)}
                            >
                                <option selected value="+91">IN(+91)</option>
                                <option  value="+880">BD(+880)</option>
                                <option value="+1">US(+1)</option>
                                <option value="+20">EG(+20)</option>
                            </select>
                            <input type="text"
                            className=" form-control"
                                placeholder='8845789956'
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNumber}
                               
                            />
                        </div>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-danger">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                    </div >
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
                      type="date"
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
                  label="Photo  (Allowed Formats: JPG or PNG)"
                  controlId="photo"
                  acceptedFiles={formData.photoFiles}
                  setAcceptedFiles={(files) => setFormData((prevData) => ({ ...prevData, photoFiles: files }))}
                  onFileChange={(file) => FileChange(file, "photo")}
                />
                 {/* {formik.touched.photoFiles && formik.errors.photoFiles ? (
                    <div className="text-danger">{formik.errors.photoFiles}</div>
                  ) : null} */}

                <FileUpload
                  label="Aadhar Card (Allowed Formats :pdf)"
                  controlId="aadharCard"
                  acceptedFiles={formData.aadharCardFiles}
                  setAcceptedFiles={(files) => setFormData((prevData) => ({ ...prevData, aadharCardFiles: files }))}
                  onFileChange={(file) => FileChange(file, "aadharCard")}
                />
                {/* {formik.touched.aadharCardFiles && formik.errors.aadharCardFiles ? (
                    <div className="text-danger">{formik.errors.aadharCardFiles}</div>
                  ) : null} */}


                <FileUpload
                  label="Education Certificate  (Allowed Format: Pdf)"
                  controlId="educationCertificate"
                  acceptedFiles={formData.educationCertificateFiles}
                  setAcceptedFiles={(files) => setFormData((prevData) => ({ ...prevData, educationCertificateFiles: files }))}
                  onFileChange={(file) =>
                    FileChange(file, "educationCertificate")
                  }
                />
              {/* {formik.touched.educationCertificateFiles && formik.errors.educationCertificateFiles ? (
                    <div className="text-danger">{formik.errors.educationCertificateFiles}</div>
                  ) : null} */}

                <FileUpload
                  label="Relieving Letters from all your previous organizations  (Allowed Format: Pdf)"
                  controlId="relievingLetters"
                  acceptedFiles={formData.relievingLettersFiles}
                  setAcceptedFiles={(files) => setFormData((prevData) => ({ ...prevData, relievingLettersFiles: files }))}
                  onFileChange={(file) => FileChange(file, "relievingLetters")}
                />
                 {/* {formik.touched.relievingLettersFiles && formik.errors.relievingLettersFiles ? (
                    <div className="text-danger">{formik.errors.relievingLettersFiles}</div>
                  ) : null} */}

                <FileUpload
                  label="3 Months Payslip (Allowed Format: Pdf)"
                  controlId="payslip"
                  acceptedFiles={formData.payslipFiles}
                  setAcceptedFiles={(files) => setFormData((prevData) => ({ ...prevData, payslipFiles: files }))}
                  onFileChange={(file) => FileChange(file, "payslip")}
                />
                 {/* {formik.touched.payslipFiles && formik.errors.payslipFiles ? (
                    <div className="text-danger">{formik.errors.payslipFiles}</div>
                  ) : null} */}

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

        <Form2
          updateForm2Data={updateForm2Data}
          updateCandidateData={updateCandidateData}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleSubmit}
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
