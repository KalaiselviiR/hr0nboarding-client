import React, { useEffect, useState } from "react";
import "./RecruiterView.css";
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
import moment from "moment";
import RecruiterFileView from "./DocumentView";
import BottomSection from "./bottomsection";
import ResendDocument from "../ResendDocument/ResendDocument";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRecruterView,
  getSingleCandidateOutside,
  updateStatus,
} from "../../service/allapi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Modal } from "react-bootstrap";

const RecruiterForm = () => {
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [isResent, setIsResent] = useState(false);

  const [cData, setCdata] = useState([]);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isSectionPayslip, setIsSectionPayslip] = useState(false);
  const [isShow, setInvokeModal] = useState(false);
  const [isOutsideIndia, setIsOutsideIndia] = useState();
  const [statusC, setStatusc] = useState();

  const navigate = useNavigate();

  const initModal = () => {
    setInvokeModal(!isShow);
  };

  const cancleVerify = () => {
    setInvokeModal(false);
  };

  const handleClick = () => {
    // Use navigate to go to the dashboard
    navigate("/dashboard");
  };

  const handleToggleSection = () => {
    setIsSectionOpen((prevIsOpen) => !prevIsOpen);
  };

  const handlePayslipSection = () => {
    setIsSectionPayslip((prevIsOpen) => !prevIsOpen);
  };

  // param id
  const { id } = useParams();

  //get details of the perticuler candidate
  const getoneCandidatesFrom = async () => {
    const response = await getSingleCandidateOutside(id);
    setIsOutsideIndia(response.data.candidate.region);
    setStatusc(response.data.candidate.status);
  };

  //get details of the perticuler Candidate
  const getoneCandidate = async () => {
    const { data } = await getRecruterView(id);
    setCdata(data);
  };
  console.log(cData);
  //create an object to store datas from input
  const [userData, setUser] = useState({
    status: "Completed",
    cid: id,
  });

  // Function to handle the click on "Verify Documents" button
  const handleVerify = async () => {
    // Perform verification logic
    // Assume verification is successful for demonstration purposes
    cancleVerify();
    const response = await updateStatus(userData);
    console.log(response);

    setIsVerified(true);
    toast.success("Document verified Successfully", {
      position: "top-center",
    });
  };

  const openResendModal = () => {
    setIsResendModalOpen(true);
    setIsResent(false);
  };

  const closeResendModal = () => {
    setIsResendModalOpen(false);
    setIsResent(true);
  };

  const handleResendError = (error) => {
    toast.error(error, {
      position: "top-center",
    });
  };

  const handleResendSuccess = (successMessage) => {
    toast.success(successMessage, {
      position: "top-center",
    });
  };
  useEffect(() => {
    getoneCandidatesFrom();

    getoneCandidate();
  }, []);

  function capitalizeFirstLetter(string) {
    // Split the string into words
    let words = string.split(" ");

    // Capitalize the first letter of each word
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    // Join the words back into a single string
    return words.join(" ");
  }
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
              src="https://assets-global.website-files.com/65f2a5372687678051645610/65fbd8daab4f9c13e1513bb7_Techjays%20logo%20full-black.svg"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="/dashboard"
              className="d-none d-md-block"
              style={{
                background: "rgb(242, 249, 251)",
                boxShadow: "0 0 1px 1px rgba(0,0,0,0.1)",
                borderRadius: "5px",
                fontWeight: "600",
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
                <GoArrowLeft
                  style={{ cursor: "pointer", display: "inline-block" }}
                  onClick={handleClick}
                />{" "}
                Candidate Info
              </h5>
            </Col>
            <Col md={2} className="d-flex justify-content-end ">
              <h6
                className={`text-end d-none d-sm-inline-block align-top ${
                  statusC === "Completed" ? "green" : "blue"
                }`}
              >
                {statusC}
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
                  <Form.Label className="labelss">First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={cData.firstName}
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
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="labelss">Email</Form.Label>
                  <Form.Control type="email" value={cData.email} name="email" />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <div className="phoneDiv mt-4">
                    <div className="labelss">
                      <p>Phone number</p>
                    </div>
                    <div className="phoneInput ">
                      <select
                        className="country-code "
                        onChange={(e) => setCountryCode(e.target.value)}
                        value={cData.countryCode}
                      >
                        <option selected value="+91">
                          IN(+91)
                        </option>
                        <option value="+880">BD(+880)</option>
                        <option value="+1">US(+1)</option>
                        <option value="+20">EG(+20)</option>
                      </select>
                      <input
                        className="input-field form-control "
                        type="tel"
                        value={cData.phoneNumber}
                        name="emergencyContactNumber"
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="designation">
                  <Form.Label className="labelss">Designation</Form.Label>
                  <Form.Control
                    type="text"
                    value={cData.designation}
                    name="designation"
                  />
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
                      value={moment(cData.dateOfJoining).format("yyyy-MM-DD")}
                      name="dateOfJoining"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="presentAddress">
                  <Form.Label className="labelss">Present Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={cData.presentAddress}
                    name="presentAddress"
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="permanentAddress">
                  <Form.Label className="labelss">Permanent Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={cData.permanentAddress}
                    name="permanentAddress"
                  />
                </Form.Group>
              </Col>
              {isOutsideIndia && (
                <>
                  <Col md={6} xs={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="emergencyContactNumber"
                    >
                      <div className="phoneDiv mt-4">
                        <div className="labelss">
                          <p>Emergency Contact Number</p>
                        </div>
                        <div className="phoneInput ">
                          <select
                            className="country-code "
                            onChange={(e) => setCountryCode(e.target.value)}
                            value={cData.countryCode}
                          >
                            <option selected value="+91">
                              IN(+91)
                            </option>
                            <option value="+880">BD(+880)</option>
                            <option value="+1">US(+1)</option>
                            <option value="+20">EG(+20)</option>
                          </select>
                          <input
                            className="input-field form-control "
                            type="tel"
                            value={cData.emergencyContactNumber}
                            name="emergencyContactNumber"
                          />
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="relation">
                      <Form.Label className="labelss">
                        Relation To Emergency Contact
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={cData.relation}
                        name="relation"
                      />
                    </Form.Group>
                  </Col>
                </>
              )}
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="aboutYourself">
                  <Form.Label className="labelss"> About yourself</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    value={cData.aboutYourself}
                    name="aboutYourself"
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
                  <Form.Control
                    type="text"
                    value={cData.experience}
                    name="experience"
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label className="labelss">Previous Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={cData.company}
                    name="company"
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={4}>
                <Form.Label style={{ fontWeight: "500" }}>Documents</Form.Label>
                <div>
                  <RecruiterFileView
                    label={"photo"}
                    size={204800}
                    file={cData.photoFiles}
                    name={"Photo.jpg"}
                  />
                  <RecruiterFileView
                    label={
                      isOutsideIndia == true
                        ? "Government-issued ID Proof(Authorized)"
                        : "Adhar Card"
                    }
                    file={cData.aadharCardFiles}
                    size={204800}
                    name={
                      isOutsideIndia == true
                        ? "Government-issued ID.pdf"
                        : "Adhar Card.pdf"
                    }
                  />
                   <RecruiterFileView
                    label={
                      isOutsideIndia == true
                        ? ""
                        : "PAN Card"
                    }
                    file={cData.panCardFiles}
                    size={204800}
                    name={
                      isOutsideIndia == true
                        ? ""
                        : "PAN Card.pdf"
                    }
                  />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleToggleSection}
                    >
                      <h6 style={{ fontWeight: "500" }}>
                        Educational Certificates
                      </h6>
                      {isSectionOpen ? (
                        <IoMdArrowDropupCircle size={20} />
                      ) : (
                        <IoMdArrowDropdownCircle size={20} />
                      )}
                    </div>
                    {isSectionOpen && (
                      <div>
                        <RecruiterFileView
                          label={"10th Marksheet"}
                          size={204800}
                          file={
                            cData?.educationCertificateFiles?.tenthMarksheet
                          }
                          name={"10th Marksheet.pdf"}
                        />
                        <RecruiterFileView
                          label={"12th Marksheet"}
                          size={204800}
                          file={
                            cData?.educationCertificateFiles?.twelfthMarksheet
                          }
                          name={"12th Marksheet.pdf"}
                        />
                        <RecruiterFileView
                          label={"PG Degree Certificate"}
                          size={204800}
                          file={
                            cData?.educationCertificateFiles
                              ?.pgDegreeCertificate
                          }
                          name={"PG Degree.pdf"}
                        />
                        <RecruiterFileView
                          label={"PG Marksheet"}
                          size={204800}
                          file={cData?.educationCertificateFiles?.pgMarksheet}
                          name={"PG Marksheet.pdf"}
                        />
                        <RecruiterFileView
                          label={"UG Degree Certificate"}
                          size={204800}
                          file={
                            cData?.educationCertificateFiles
                              ?.ugDegreeCertificate
                          }
                          name={"UG Degree.pdf"}
                        />
                        <RecruiterFileView
                          label={"UG Marksheet"}
                          size={204800}
                          file={cData?.educationCertificateFiles?.ugMarksheet}
                          name={"UG Marksheet.pdf"}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={handlePayslipSection}
                    >
                      <h6 style={{ fontWeight: "500" }}>
                        3 Months payslips
                      </h6>
                      {isSectionPayslip ? (
                        <IoMdArrowDropupCircle size={20} />
                      ) : (
                        <IoMdArrowDropdownCircle size={20} />
                      )}
                    </div>
                    {isSectionPayslip && (
                      <div>
                        <RecruiterFileView
                          label={"Payslip - Month 1"}
                          size={204800}
                          file={
                            cData?.payslipFiles?.payslipOne
                          }
                          name={"Payslip one.pdf"}
                        />
                          <RecruiterFileView
                          label={"Payslip - Month 2"}
                          size={204800}
                          file={
                            cData?.payslipFiles?.payslipTwo
                          }
                          name={"Payslip Two.pdf"}
                        />
                          <RecruiterFileView
                          label={"Payslip - Month 3"}
                          size={204800}
                          file={
                            cData?.payslipFiles?.payslipThree
                          }
                          name={"Payslip Three.pdf"}
                        />
                      </div>
                    )}
                  </div>
                  <RecruiterFileView
                    label={"Relieving Letters"}
                    size={204800}
                    file={cData.relievingLettersFiles}
                    name={"Relieving Letters.pdf"}
                  />
                  <RecruiterFileView
                    label={"Declaration"}
                    size={204800}
                    file={cData.declarationFiles}
                    name={"Declaration.pdf"}
                  />
                </div>
                <div className="mt-3" style={{ display: "flex", gap: "10px" }}>
                  <Button
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
                    Verify documents
                  </Button>
                  <Button
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
                  <Modal
                    className="deleteModal"
                    show={isShow}
                    onHide={initModal}
                  >
                    <div className="deleteModalBody">
                      <div className="deleteModalContent">
                        <h3>Verify documents</h3>
                        <p>
                          Are you sure you have completed document verification?
                          This action is irreversible
                        </p>
                      </div>

                      <div className="deleteModalButtons">
                        <button
                          onClick={cancleVerify}
                          className="deleteButtonNo"
                        >
                          No
                        </button>
                        <button
                          onClick={handleVerify}
                          className="deleteButtonYes"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div className="mt-5 mb-3">
                  <Button
                    style={{
                      height: "35px",
                      fontSize: "15px",
                      backgroundColor: "rgb(236, 236, 237)",
                      color: "rgb(147, 48, 233)",
                      fontWeight: "500",
                      opacity: isVerified ? "1" : "0.5",
                      borderColor: "white",
                    }}
                    disabled={!isVerified && !isResent}
                  >
                    Good to go
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
        <BottomSection cData={cData} isOutsideIndia={isOutsideIndia} />
      </div>
      {isResendModalOpen && (
        <ResendDocument
          closeModal={closeResendModal}
          onApiError={handleResendError}
          onApiSuccess={handleResendSuccess}
          id={id}
          isOutsideIndia={isOutsideIndia}
        />
      )}
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default RecruiterForm;
