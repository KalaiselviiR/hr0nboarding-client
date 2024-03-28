import React, { useEffect, useState } from "react";
import "./resend.css";
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
  Spinner,
} from "react-bootstrap";
import { GoArrowLeft } from "react-icons/go";
import "../CandidateForm/CandidateForm.css";
import { CiCalendar } from "react-icons/ci";
import moment from "moment";
import { useFormik } from "formik";
import ResendDocument from "../ResendDocument/ResendDocument";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRecruterView,
  getSingleCandidateById,
  updateStatus,
} from "../../service/allapi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { Modal } from "react-bootstrap";
import CandidateFileView from "./documentView";
import BottomSection from "./bottom";
import { reuploadDocuments } from "../../service/allapi";

const CandidateViewForm = () => {
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const [isResent, setIsResent] = useState(false);

  const [cData, setCdata] = useState([]);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [isShow, setInvokeModal] = useState(false);
// form modal and loading
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(false);

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();

  const [photoFiles, setPhotoFiles] = useState([]);
  const [aadharCardFiles, setAadharCardFiles] = useState([]);
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

  // // param id
  const { id } = useParams();
  console.log(id);
  //get details of the perticuler Candidate
  const getoneCandidate = async () => {
    const { data } = await getRecruterView(id);
    setCdata(data);
  };
  console.log(cData);
  const [isOutsideIndia, setIsOutsideIndia] = useState();

  const getRegion = async () => {
    const { data } = await getSingleCandidateById(id);
    setIsOutsideIndia(data.candidate.region);
  };

  //create an object to store datas from input
  const [userData, setUser] = useState({
    status: "Completed",
    cid: id,
  });

  const updateFamilyMembers = (data, contact) => {
    setFormData((prevData) => ({
      ...prevData,
      members: data,
      contact,
    }));

    const combinedValues = {
      ...formData,
      members: data,
      contact,
    };
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
    } else {
      // Update both the form data and formik values for non-file inputs
      const key = name;
      const updatedValue = value;

      setFormData((prevData) => ({
        ...prevData,
        [key]: updatedValue,
      }));
    }
  };

  console.log(formData);
//handle change function
  const FileChange = (file, type) => {
    switch (type) {
      case "photo":
        setPhotoFiles(file);
        break;
      case "aadharCard":
        setAadharCardFiles(file);
        break;
      case "tenthMarksheet":
        setTenthMarksheetFiles(file);
        break;
      case "twelfthMarksheet":
        setTwelfthMarksheetFiles(file);
        break;
      case "PGDegreeCertificate":
        setPgDegreeCertificateFiles(file);
        break;
      case "PGMarksheet":
        setPgMarksheetFiles(file);
        break;
      case "UGDegreeCertificate":
        setUgDegreeCertificateFiles(file);
        break;
      case "UGMarksheet":
        setUgMarksheetFiles(file);
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

  useEffect(() => {
    getoneCandidate();
    getRegion();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formValues = new FormData();
      for (const key in formData) {
        formValues.append(key, formData[key] || "");
      }
     
      const response = await reuploadDocuments(id, formValues);
      if (response?.status === 200) {
        handleCloseModal();
        toast.success("Document uploaded successfully");
        setTimeout(()=>{
          navigate("/formsubmitted")
        },2000)
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(`Error: ${error?.message}`);
    }
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
              <h5 style={{ gap: "20px" }}>Candidate Info</h5>
            </Col>
            <Col md={2} className="d-flex justify-content-end ">
              <h6
                className={`text-end d-none d-sm-inline-block align-top ${
                  isVerified === true ? "green" : "blue"
                }`}
              >
                pending
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
                    value={cData?.firstName}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="labelss">Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={cData?.lastName}
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
                    value={cData?.email}
                    name="email"
                    disabled
                  />
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
                        disabled
                        onChange={(e) => setCountryCode(e.target.value)}
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
                        value={cData?.phoneNumber}
                        name="emergencyContactNumber"
                        disabled
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
                    value={cData?.designation}
                    name="designation"
                    disabled
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
                      value={moment(cData?.dateOfJoining).format("yyyy-MM-DD")}
                      name="dateOfJoining"
                      disabled
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
                    value={cData?.presentAddress}
                    name="presentAddress"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="permanentAddress">
                  <Form.Label className="labelss">Permanent Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={cData?.permanentAddress}
                    name="permanentAddress"
                    disabled
                  />
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
                    value={cData?.aboutYourself}
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
                  <Form.Control
                    type="text"
                    value={cData?.experience}
                    name="experience"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="mb-3" controlId="company">
                  <Form.Label className="labelss">Previous Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={cData?.company}
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
                    value={cData?.enjoyment}
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
                    value={cData?.sneakpeek}
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
                  acceptedFiles={formData?.photoFiles}
                  presize={204800}
                  prefile={cData?.photoFiles}
                  prename={"Photo.jpg"}
                  setAcceptedFiles={(files) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      photoFiles: files,
                    }))
                  }
                  onFileChange={(file) => FileChange(file, "photo")}
                />
                <CandidateFileView
                  label={
                    isOutsideIndia == true
                      ? "Government-issued ID Proof(Authorized)"
                      : "Adhar Card"
                  }
                  instruction="Accepted format:pdf"
                  controlId="aadharCard"
                  presize={204800}
                  acceptedFiles={formData?.aadharCardFiles}
                  prefile={cData?.aadharCardFiles}
                  prename={
                    isOutsideIndia == true
                      ? "Government-issued ID.pdf"
                      : "Adhar Card.pdf"
                  }
                  setAcceptedFiles={(files) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      aadharCardFiles: files,
                    }))
                  }
                  onFileChange={(file) => FileChange(file, "aadharCard")}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <h6 style={{ fontWeight: "500" }}>
                      Educational Certificates
                    </h6>
                  </div>
                  <div>
                    <CandidateFileView
                      label="10th Marksheet"
                      instruction="Accepted format:pdf"
                      controlId="tenthMarksheet"
                      presize={204800}
                      prefile={cData?.educationCertificateFiles?.tenthMarksheet}
                      prename={"10th Marksheet.pdf"}
                      acceptedFiles={formData?.tenthMarksheetFiles}
                      setAcceptedFiles={(files) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          tenthMarksheetFiles: files,
                        }))
                      }
                      onFileChange={(file) =>
                        FileChange(file, "tenthMarksheet")
                      }
                    />
                    <CandidateFileView
                      label="12th Marksheet"
                      instruction="Accepted format:pdf"
                      presize={204800}
                      prefile={
                        cData?.educationCertificateFiles?.twelfthMarksheet
                      }
                      prename={"12th Marksheet.pdf"}
                      controlId="twelfthMarksheet"
                      acceptedFiles={formData?.twelfthMarksheetFiles}
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
                      presize={204800}
                      prefile={
                        cData?.educationCertificateFiles?.pgDegreeCertificate
                      }
                      prename={"PG Degree.pdf"}
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
                      presize={204800}
                      prefile={cData?.educationCertificateFiles?.pgMarksheet}
                      prename={"PG Marksheet.pdf"}
                      instruction="Accepted format:pdf"
                      acceptedFiles={formData?.pgMarksheetFiles}
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
                      presize={204800}
                      prefile={
                        cData?.educationCertificateFiles?.ugDegreeCertificate
                      }
                      prename={"UG Degree.pdf"}
                      controlId="UGDegreeCertificate"
                      acceptedFiles={formData?.ugDegreeCertificateFiles}
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
                      presize={204800}
                      prefile={cData?.educationCertificateFiles?.ugMarksheet}
                      prename={"UG Marksheet.pdf"}
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
                </div>
                <CandidateFileView
                  label="Relieving Letters from all your previous organizations"
                  instruction="Accepted format:pdf"
                  presize={204800}
                  controlId="relievingLetters"
                  prefile={cData?.relievingLettersFiles}
                  prename={"Relieving Letters.pdf"}
                  acceptedFiles={formData?.relievingLettersFiles}
                  setAcceptedFiles={(files) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      relievingLettersFiles: files,
                    }))
                  }
                  onFileChange={(file) => FileChange(file, "relievingLetters")}
                />
                <CandidateFileView
                  label="3 Months Payslip "
                  presize={204800}
                  instruction="Accepted format:pdf"
                  prefile={cData?.payslipFiles}
                  prename={"Payslips.pdf"}
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

                <Button
                  style={{
                    fontSize: "15px",
                    borderColor: "rgb(147, 48, 233)",
                    color: "#ffff",
                    backgroundColor: "rgb(147, 48, 233)",
                    fontWeight: "500",
                    marginTop: "25px",
                  }}
                  onClick={handleOpenModal}
                >
                  Submit
                </Button>
                <Modal
              show={showModal}
              onHide={handleCloseModal}
              className="form-modal"
            >
              <div className="form-modal-body">
                {loading ? ( 
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Submitting form...</p>
                  </div>
                ) : (
                  <div className="form-modal-content">
                    <h3>Final Confirmation</h3>
                    <p>Submitting this form is irreversible. Proceed?</p>
                  </div>
                )}
                <div className="form-modal-buttons">
                  <button onClick={handleCloseModal} className="form-button-no">
                    No
                  </button>
                  <button onClick={handleSubmit} className="form-button-yes">
                    Yes
                  </button>
                </div>
              </div>
            </Modal>
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
        />
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default CandidateViewForm;
