import React, { useEffect, useState } from "react";
import "./resend.css"
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
import "../CandidateForm/CandidateForm.css";
import { CiCalendar } from "react-icons/ci";
import moment from 'moment';
import { useFormik } from "formik";
import ResendDocument from '../ResendDocument/ResendDocument'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { getRecruterView, updateStatus } from "../../service/allapi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Modal } from 'react-bootstrap';
import CandidateFileView from "./documentView";
import BottomSection from "./bottom";



const CandidateViewForm = () => {
  

    const [isResendModalOpen, setIsResendModalOpen] = useState(false)

    const [isVerified, setIsVerified] = useState(false);
    const [isResent, setIsResent] = useState(false);
  
    const [cData, setCdata] = useState([]);
    const [isSectionOpen, setIsSectionOpen] = useState(false);
    const [isShow, setInvokeModal] = useState(false);
  
    const navigate = useNavigate();

    const [photoFiles, setPhotoFiles] = useState([]);
  const [aadharCardFiles, setAadharCardFiles] = useState([]);
  // const [educationCertificateFiles, setEducationCertificateFiles] = useState(
  //   []
  // );
  const [tenthMarksheetFiles, setTenthMarksheetFiles] = useState([]);
  const [twelfthMarksheetFiles, setTwelfthMarksheetFiles] = useState([]);
  const [pgDegreeCertificateFiles, setPgDegreeCertificateFiles] = useState([]);
  const [pgMarksheetFiles, setPgMarksheetFiles] = useState([]);
  const [ugDegreeCertificateFiles, setUgDegreeCertificateFiles] = useState([]);
  const [ugMarksheetFiles, setUgMarksheetFiles] = useState([]);

  const [relievingLettersFiles, setRelievingLettersFiles] = useState([]);
  const [payslipFiles, setPayslipFiles] = useState([]);
  

    //create an object to store datas from input family details
    const [formData, setFormData] = useState({
    
      photoFiles: null,
      aadharCardFiles: null,
      // educationCertificateFiles: null,
      tenthMarksheetFiles: null,
      twelfthMarksheetFiles: null,
      pgDegreeCertificateFiles: null,
      pgMarksheetFiles: null,
      ugDegreeCertificateFiles: null,
      ugMarksheetFiles: null,
      relievingLettersFiles: null,
      payslipFiles: null,
      // id: id,
   
    });

 

    console.log(cData)
  
    const initModal = () => {
      setInvokeModal(!isShow);
    };
  
    const cancleVerify = () => {
      setInvokeModal(false)
     
    }
  
    const handleClick = () => {
      // Use navigate to go to the dashboard 
      navigate('/dashboard');
    };
  
    const handleToggleSection = () => {
      setIsSectionOpen((prevIsOpen) => !prevIsOpen);
    };
  
    // // param id 
    const{id} =useParams()
    console.log(id);
    //get details of the perticuler Candidate
    const getoneCandidate=async()=>{
      const {data}=await getRecruterView(id)
      setCdata(data);
        
    }
    console.log(cData);
    
        //create an object to store datas from input
        const [userData, setUser] = useState({
          status: "Completed",
          cid: id
      
        })
  
     // Function to handle the click on "Verify Documents" button
    //  const handleVerify = async () => {
    //   // Perform verification logic
    //   // Assume verification is successful for demonstration purposes
    //   cancleVerify()
    //   const response = await updateStatus(userData)
    //   console.log(response);
      
    //   setIsVerified(true);
    //   toast.success("Document verified Successfully", {
    //     position: "top-center"
    //   });
      
    // };
  
    // const openResendModal = () => {
    //   setIsResendModalOpen(true)
    //   setIsResent(false);
    // }
  
    // const closeResendModal = () => {
    //   setIsResendModalOpen(false)
    //   setIsResent(true);
    // }
  
    // const handleResendError = (error) => {
    //   toast.error(error, {
    //     position: "top-center"
    //   });
    // }
  
    // const handleResendSuccess = (successMessage) => {
    //   toast.success(successMessage, {
    //     position: "top-center"
    //   });
    // }

    
  const updateFamilyMembers = (data, contact) => {

    setFormData((prevData) => ({
      ...prevData,
      members: data,
      contact
    }))

    const combinedValues = {
      ...formData,
      members: data,
      contact
    };
 
  }


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
      // formik.setFieldValue(name, files[0]);
    } else {
      // Update both the form data and formik values for non-file inputs
      const key = name;
      const updatedValue = value;

      setFormData((prevData) => ({
        ...prevData,
        [key]: updatedValue,
      }));

      // formik.handleChange(e);
    }
  };

  console.log(formData);

  // console.log(formData);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Trigger Formik's validation
  //   // formik.handleSubmit();

  //   // Check if there are any errors in the form
  //   if (Object.keys(formik.errors).length === 0) {
  //     // Form is valid, proceed with form submission

  //     try {
  //       // Prepare FormData for file uploads
  //       const formData = new FormData();

  //       // Append all form fields, including file inputs      

  //       for (const key in formik.values) {
  //         if (key !== 'members' && key !== 'contact') {
  //           formData.append(key, formik.values[key] || "");
  //         }
  //       }

  //       formData.append('contact', JSON.stringify(formik.values.contact))

  //       // Append members array
  //       if (Array.isArray(formik.values.members)) {
  //         formData.append('members', JSON.stringify(formik.values.members));
  //       }

  //       // Send a POST request using Axios
  //       const response = await axios.post(
  //         "http://localhost:4000/api/candidates",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (response.status === 201) {
  //         console.log("Form data submitted successfully");
  //         toast.success("Form data submitted successfully");
  //         sessionStorage.clear();
  //         const response = await updateStatus(userData)
  //         console.log(response);
  //         // Optionally: Reset form or navigate to a success page
  //       } else {
  //         console.error("Failed to submit form data");
  //       }
  //     } catch (error) {
  //       console.error("Error while submitting form data:", error);
  //     }

  //     // Perform any additional actions or API calls if needed
  //   }
  // };

  const FileChange = (file, type) => {
    switch (type) {
      case "photo":
        setPhotoFiles(file);
        // formik.setFieldValue("photoFiles", file);
        break;
      case "aadharCard":
        setAadharCardFiles(file);
        // formik.setFieldValue("aadharCardFiles", file);
        break;
      // case "educationCertificate":
      //   setEducationCertificateFiles(file);
      //   formik.setFieldValue("educationCertificateFiles",file);
      //   break;
      case "tenthMarksheet":
        setTenthMarksheetFiles(file);
        // formik.setFieldValue("tenthMarksheetFiles", file);
        break;
      case "twelfthMarksheet":
        setTwelfthMarksheetFiles(file);
        // formik.setFieldValue("twelfthMarksheetFiles", file);
        break;
      case "PGDegreeCertificate":
        setPgDegreeCertificateFiles(file);
        // formik.setFieldValue("pgDegreeCertificateFiles", file);
        break;
      case "PGMarksheet":
        setPgMarksheetFiles(file);
        // formik.setFieldValue("pgMarksheetFiles", file);
        break;
      case "UGDegreeCertificate":
        setUgDegreeCertificateFiles(file);
        // formik.setFieldValue("ugDegreeCertificateFiles", file);
        break;
      case "UGMarksheet":
        setUgMarksheetFiles(file);
        // formik.setFieldValue("ugMarksheetFiles", file);
        break;
      case "relievingLetters":
        setRelievingLettersFiles(file);
        // formik.setFieldValue("relievingLettersFiles", file);
        break;
      case "payslip":
        setPayslipFiles(file);
        // formik.setFieldValue("payslipFiles", file);
        break;
      default:
        break;
    }
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
            <Nav.Link href="/dashboard" className="d-none d-md-block" style={{
              background: "rgb(242, 249, 251)",
              boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
              borderRadius: "5px",
              fontWeight: "600"
            }}
            onClick={handleClick} 
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
                <GoArrowLeft style={{cursor:"pointer",display:"inline-block"}} onClick={handleClick} /> Candidate Info
              </h5>
            </Col>
            <Col md={2} className="d-flex justify-content-end ">
              <h6 className={`text-end d-none d-sm-inline-block align-top ${isVerified === true ? 'green' : 'blue'}`}>
                {isVerified ==false ? "Review Pending" : "Completed" }
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
          <Form>
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
                  <Form.Label className="labelss" >
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={cData.firstName}
                    disabled

                  />

                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="labelss">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={cData.lastName}
                    name="lastName"
                    disabled

                  />

                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="labelss">Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={cData.email}
                    name="email"
                    disabled

                  />

                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  {/* <Form.Label className="labelss">
                    Phone Number
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

                    <Form.Control type="tel"
                      value={cData.phoneNumber}
                      name="phoneNumber"
                    />
                  </InputGroup> */}
                  <div className="phoneDiv mt-4">
                        <div className="labelss">
                            <p>Phone number</p>
                        </div>
                        <div className="phoneInput ">
                            <select className="country-code " disabled
                             onChange={(e) => setCountryCode(e.target.value)}
                            >
                                <option selected value="+91">IN(+91)</option>
                                <option  value="+880">BD(+880)</option>
                                <option value="+1">US(+1)</option>
                                <option value="+20">EG(+20)</option>
                            </select>
                            <input 
                            className="input-field form-control "
                            type="tel"
                            value={cData.phoneNumber}
                                name="emergencyContactNumber"
                                disabled
                                
                               
                            />
                        </div>
                        </div>

                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="designation">
                  <Form.Label className="labelss">
                    Designation
                  </Form.Label>
                  <Form.Control type="text"
                    value={cData.designation}
                    name="designation"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="dateOfJoining">
                  <Form.Label className="labelss">
                    Date of Joining
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <CiCalendar />
                    </InputGroup.Text>
                    <Form.Control type="date"
                      value={moment(cData.dateOfJoining).format("yyyy-MM-DD")}
                      name="dateOfJoining"
                      disabled
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="presentAddress">
                  <Form.Label className="labelss">
                    Present Address
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={cData.presentAddress}
                    name="presentAddress"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="permanentAddress">
                  <Form.Label className="labelss">
                    Permanent Address
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={cData.permanentAddress}
                    name="permanentAddress"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="aboutYourself">
                  <Form.Label className="labelss">
                    {" "}
                    About yourself
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={cData.aboutYourself}
                    name="aboutYourself"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="experience">
                  <Form.Label className="labelss">
                    Overall Work Experience
                  </Form.Label>
                  <Form.Control type="text"
                    value={cData.experience}
                    name="experience"
                    disabled

                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label className="labelss">
                    Previous Company
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={cData.company}
                    name="company"
                    disabled
                  />
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
                    value={cData.enjoyment}
                    name="enjoyment"
                    disabled
                  />
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
                    value={cData.sneakpeek}
                    name="sneakpeek"
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={4}>
              <Form.Label style={{ fontWeight: "500" }}>Documents</Form.Label>
              <CandidateFileView
                      label="Photo"
                      instruction="Accepted formats: JPG or PNG"
                      controlId="photo"
                      acceptedFiles={formData.photoFiles}
                      setAcceptedFiles={(files) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          photoFiles: files,
                        }))
                      }
                      onFileChange={(file) => FileChange(file, "photo")}
                    />
                    {/* {formik.touched.photoFiles && formik.errors.photoFiles ? (
               <div className="text-danger">{formik.errors.photoFiles}</div>
             ) : null} */}

                    <CandidateFileView
                      label="Aadhar Card "
                      instruction="Accepted format:pdf"
                      controlId="aadharCard"
                      acceptedFiles={formData.aadharCardFiles}
                      setAcceptedFiles={(files) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          aadharCardFiles: files,
                        }))
                      }
                      onFileChange={(file) => FileChange(file, "aadharCard")}
                    />
                    {/* {formik.touched.aadharCardFiles && formik.errors.aadharCardFiles ? (
               <div className="text-danger">{formik.errors.aadharCardFiles}</div>
             ) : null} */}
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: 'pointer'
                        }}
                      // onClick={handleToggleSection}
                      >
                        <h6 style={{ fontWeight: "500" }}>Educational Certificates</h6>
                        {/* {isSectionOpen ? <IoMdArrowDropupCircle size={20} /> : <IoMdArrowDropdownCircle size={20} />} */}
                      </div>
                      {/* {isSectionOpen && ( */}
                      <div>
                        <CandidateFileView
                          label="10th Marksheet"
                          instruction="Accepted format:pdf"
                          controlId="tenthMarksheet"
                          acceptedFiles={formData.tenthMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              tenthMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) => FileChange(file, "tenthMarksheet")}
                        />
                        <CandidateFileView
                          label="12th Marksheet"
                          instruction="Accepted format:pdf"
                          controlId="twelfthMarksheet"
                          acceptedFiles={formData.twelfthMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              twelfthMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) =>
                            FileChange(file, "twelfthMarksheet")
                          }
                        />
                        <CandidateFileView
                          label="PG Degree Certificate"
                          instruction="Accepted format:pdf"
                          controlId="PGDegreeCertificate"
                          acceptedFiles={formData.pgDegreeCertificateFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              PGDegreeCertificate: files,
                            }))
                          }
                          onFileChange={(file) =>
                            FileChange(file, "PGDegreeCertificate")
                          }
                        />
                        <CandidateFileView
                          label="PG Marksheet"
                          controlId="PGMarksheet"
                          instruction="Accepted format:pdf"
                          acceptedFiles={formData.pgMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              pgMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) => FileChange(file, "PGMarksheet")}
                        />
                        <CandidateFileView
                          label="UG Degree Certificate"
                          instruction="Accepted format:pdf"
                          controlId="UGDegreeCertificate"
                          acceptedFiles={formData.ugDegreeCertificateFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              ugDegreeCertificateFiles: files,
                            }))
                          }
                          onFileChange={(file) =>
                            FileChange(file, "UGDegreeCertificate")
                          }
                        />
                        <CandidateFileView
                          label="UG Marksheet"
                          instruction="Accepted format:pdf"
                          controlId="UGMarksheet"
                          acceptedFiles={formData.ugMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              ugMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) => FileChange(file, "UGMarksheet")}
                        />
                      </div>
                      {/* )} */}
                    </div>
                    {/* {formik.touched.educationCertificateFiles && formik.errors.educationCertificateFiles ? (
               <div className="text-danger">{formik.errors.educationCertificateFiles}</div>
             ) : null} */}

                    <CandidateFileView
                      label="Relieving Letters from all your previous organizations"
                      instruction="Accepted format:pdf"
                      controlId="relievingLetters"
                      acceptedFiles={formData.relievingLettersFiles}
                      setAcceptedFiles={(files) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          relievingLettersFiles: files,
                        }))
                      }
                      onFileChange={(file) => FileChange(file, "relievingLetters")}
                    />
                    {/* {formik.touched.relievingLettersFiles && formik.errors.relievingLettersFiles ? (
               <div className="text-danger">{formik.errors.relievingLettersFiles}</div>
             ) : null} */}

                    <CandidateFileView
                      label="3 Months Payslip "
                      instruction="Accepted format:pdf"
                      controlId="payslip"
                      acceptedFiles={formData.payslipFiles}
                      setAcceptedFiles={(files) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          payslipFiles: files,
                        }))
                      }
                      onFileChange={(file) => FileChange(file, "payslip")}
                    />
                {/* <div className="mt-3" style={{ display: "flex", gap: "10px" }}> */}
                  {/* <Button
                    style={{
                      height: "35px",
                      fontSize: "15px",
                      backgroundColor: "white",
                      color: "rgb(147, 48, 233)",
                      borderColor: "rgb(147, 48, 233)",
                      fontWeight: "500",
                    }}
                    onClick={initModal}
                    disabled={isVerified || isResent}
                  >
                    Verify 
                  </Button> */}
                  {/* <Button
                    style={{
                      height: "35px",
                      fontSize: "15px",
                      
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "black",
                      fontWeight: "500",
                    }}
                    onClick={openResendModal}
                    disabled={isVerified}
                  >
                    Resend documents
                  </Button>
                  <Modal className='deleteModal' show={isShow} onHide={initModal}> */}

{/* <div className="deleteModalBody">

  <div className="deleteModalContent">
    <h3>Verify documents</h3>
    <p>Are you sure you've completed document verification? This action is irreversible</p>
  </div>

  <div className="deleteModalButtons">
    <button onClick={cancleVerify} className='deleteButtonNo'>No</button>
    <button onClick={handleVerify} className='deleteButtonYes'>Yes</button>
  </div>

</div>


</Modal>
                </div> */}
                {/* <div className="mt-5 mb-3">
                  <Button
                    style={{
                      height: "35px",
                      fontSize: "15px",
                      backgroundColor: "rgb(236, 236, 237)",
                      color: "rgb(147, 48, 233)",
                      fontWeight: "500",
                     opacity: isVerified ? "1" : "0.5",
                      borderColor: "white"
                    }}
                    disabled={!isVerified && !isResent}
                  >
                    Good to go
                  </Button>
                </div> */}
              </Col>
            </Row>
          </Form>

        </Container>

        <BottomSection cData={cData} />
      </div>

      {isResendModalOpen &&
       <ResendDocument closeModal={closeResendModal}
       onApiError={handleResendError}
       onApiSuccess={handleResendSuccess}
       />}
       <ToastContainer
       autoClose={2000}
       />
    </>
  );
};

export default CandidateViewForm;