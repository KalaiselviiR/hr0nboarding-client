import React, { useEffect, useState } from "react";
import BASE_URL from "../../service/baseurl";
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
import { useParams } from "react-router-dom";
import axios from "axios";
import { getSingleCandidate, updateStatusRview } from "../../service/allapi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openDB, deleteDB } from "idb";
import { IoMdStar } from "react-icons/io";
const TopForm = () => {
  //State management for document upload
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

  const [id, setId] = useState(null);
  const [isOutsideIndia, setIsOutsideIndia] = useState();
  const [statusC, setStatusc] = useState();

  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const handleToggleSection = () => {
    setIsSectionOpen((prevIsOpen) => !prevIsOpen);
  };

  // param id
  const { token } = useParams();
  //get details of the perticuler expense
  const getoneCandidate = async () => {
    const { data } = await getSingleCandidate(token);
    console.log(data);
    setId(data._id);
    setIsOutsideIndia(data.region);
    setStatusc(data.status);
  };
  console.log(id);

  useEffect(() => {
    console.log("Updated id:", id);
    setFormData((prevData) => ({
      ...prevData,
      id: id,
    }));
    formik.setFieldValue("id", id);
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
    tenthMarksheetFiles: null,
    twelfthMarksheetFiles: null,
    pgDegreeCertificateFiles: null,
    pgMarksheetFiles: null,
    ugDegreeCertificateFiles: null,
    ugMarksheetFiles: null,
    relievingLettersFiles: null,
    payslipFiles: null,
    id: id,
    members: [],
    contact: {},
  });

  const [form2Data, setForm2Data] = useState({
    epfoUan: "",
    pfNo: "",
    adharCard: "",
    panCard: "",
    employeesName: "",
    dateOfBirthAs: "",
    gender: "",
    maritalStatus: "",
    bankName: "",
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

  const handleSaveDraft = async () => {
    const db = await openDB("FilesDB", 1);

    const newTaskObject = {
      photoFiles: formData?.photoFiles,
      aadharCardFiles: formData?.aadharCardFiles,
      tenthMarksheetFiles: formData?.tenthMarksheetFiles,
      twelfthMarksheetFiles: formData?.twelfthMarksheetFiles,
      pgDegreeCertificateFiles: formData?.pgDegreeCertificateFiles,
      pgMarksheetFiles: formData?.pgMarksheetFiles,
      ugDegreeCertificateFiles: formData?.ugDegreeCertificateFiles,
      ugMarksheetFiles: formData?.ugMarksheetFiles,
      relievingLettersFiles: formData?.relievingLettersFiles,
      payslipFiles: formData?.payslipFiles,
    };

    const addedTask = await db.add("files", newTaskObject);

    // Convert the form data to a string before storing it in sessionStorage
    const formDataString = JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      designation: formData.designation,
      dateOfJoining: formData.dateOfJoining,
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      aboutYourself: formData.aboutYourself,
      experience: formData.experience,
      company: formData.company,
      enjoyment: formData.enjoyment,
      sneakpeek: formData.sneakpeek,
      id: formData.firstName,
    });

    // Store the form data string in sessionStorage
    sessionStorage.setItem("draftFormData", formDataString);

    toast.success("Details Saved Successfully", {
      position: "top-center",
    });

    // You can also display a message or perform other actions if needed
    console.log("Form data saved as draft.");
  };

  const updateFamilyMembers = (data, contact) => {
    setFormData((prevData) => ({
      ...prevData,
      members: data,
      contact,
    }));

    const combinedValues = {
      ...formik.values,
      members: data,
      contact,
    };
    formik.setValues(combinedValues);
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
          if (key !== "members" && key !== "contact") {
            formData.append(key, formik.values[key] || "");
          }
        }

        formData.append("contact", JSON.stringify(formik.values.contact));

        // Append members array
        if (Array.isArray(formik.values.members)) {
          formData.append("members", JSON.stringify(formik.values.members));
        }

        // Send a POST request using Axios
        const response = await axios.post(
          `${BASE_URL}/api/candidates`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Form data submitted successfully");
          toast.success("Form data submitted successfully");
          sessionStorage.clear();
          const response = await updateStatusRview(id);
          console.log(response);

          const dbName = "FilesDB";
          try {
            await deleteDB(dbName);
            setFormData((prev) => ({
              ...prev,
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
            }));
          } catch (error) {
            console.error(`Error deleting database '${dbName}':`, error);
          }

          // Optionally: Reset form or navigate to a success page
        } else {
          console.error("Failed to submit form data");
        }
      } catch (error) {
        console.error("Error while submitting form data:", error);
      }

      // Perform any additional actions or API calls if needed
    }
  };

  const FileChange = (file, type) => {
    switch (type) {
      case "photo":
        setPhotoFiles(file);
        formik.setFieldValue("photoFiles", file);
        break;
      case "aadharCard":
        setAadharCardFiles(file);
        formik.setFieldValue("aadharCardFiles", file);
        break;
      case "tenthMarksheet":
        setTenthMarksheetFiles(file);
        formik.setFieldValue("tenthMarksheetFiles", file);
        break;
      case "twelfthMarksheet":
        setTwelfthMarksheetFiles(file);
        formik.setFieldValue("twelfthMarksheetFiles", file);
        break;
      case "PGDegreeCertificate":
        setPgDegreeCertificateFiles(file);
        formik.setFieldValue("pgDegreeCertificateFiles", file);
        break;
      case "PGMarksheet":
        setPgMarksheetFiles(file);
        formik.setFieldValue("pgMarksheetFiles", file);
        break;
      case "UGDegreeCertificate":
        setUgDegreeCertificateFiles(file);
        formik.setFieldValue("ugDegreeCertificateFiles", file);
        break;
      case "UGMarksheet":
        setUgMarksheetFiles(file);
        formik.setFieldValue("ugMarksheetFiles", file);
        break;
      case "relievingLetters":
        setRelievingLettersFiles(file);
        formik.setFieldValue("relievingLettersFiles", file);
        break;
      case "payslip":
        setPayslipFiles(file);
        formik.setFieldValue("payslipFiles", file);
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
      ...formik.values,
      permanentAddress: isChecked
        ? formik.values.presentAddress
        : formik.values.permanentAddress,
    });
  };

  useEffect(() => {
    getoneCandidate();
  }, []);

  useEffect(() => {
    const createDB = async () => {
      const db = await openDB("FilesDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("files")) {
            const store = db.createObjectStore("files", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      const storedFiles = await db.getAll("files");
      if (storedFiles) {
        formik.setFieldValue(
          "photoFiles",
          storedFiles[storedFiles.length - 1]?.photoFiles
        );
        formik.setFieldValue(
          "aadharCardFiles",
          storedFiles[storedFiles.length - 1]?.aadharCardFiles
        );
        formik.setFieldValue(
          "tenthMarksheetFiles",
          storedFiles[storedFiles.length - 1]?.tenthMarksheetFiles
        );
        formik.setFieldValue(
          "twelfthMarksheetFiles",
          storedFiles[storedFiles.length - 1]?.twelfthMarksheetFiles
        );
        formik.setFieldValue(
          "pgDegreeCertificateFiles",
          storedFiles[storedFiles.length - 1]?.pgDegreeCertificateFiles
        );
        formik.setFieldValue(
          "pgMarksheetFiles",
          storedFiles[storedFiles.length - 1]?.pgMarksheetFiles
        );
        formik.setFieldValue(
          "ugDegreeCertificateFiles",
          storedFiles[storedFiles.length - 1]?.ugDegreeCertificateFiles
        );
        formik.setFieldValue(
          "ugMarksheetFiles",
          storedFiles[storedFiles.length - 1]?.ugMarksheetFiles
        );
        formik.setFieldValue(
          "relievingLettersFiles",
          storedFiles[storedFiles.length - 1]?.relievingLettersFiles
        );
        formik.setFieldValue(
          "payslipFiles",
          storedFiles[storedFiles.length - 1]?.payslipFiles
        );
        setFormData((prev) => ({
          ...prev,
          photoFiles: storedFiles[storedFiles.length - 1]?.photoFiles,
          aadharCardFiles: storedFiles[storedFiles.length - 1]?.aadharCardFiles,
          tenthMarksheetFiles:
            storedFiles[storedFiles.length - 1]?.tenthMarksheetFiles,
          twelfthMarksheetFiles:
            storedFiles[storedFiles.length - 1]?.twelfthMarksheetFiles,
          pgDegreeCertificateFiles:
            storedFiles[storedFiles.length - 1]?.pgDegreeCertificateFiles,
          pgMarksheetFiles:
            storedFiles[storedFiles.length - 1]?.pgMarksheetFiles,
          ugDegreeCertificateFiles:
            storedFiles[storedFiles.length - 1]?.ugDegreeCertificateFiles,
          ugMarksheetFiles:
            storedFiles[storedFiles.length - 1]?.ugMarksheetFiles,
          relievingLettersFiles:
            storedFiles[storedFiles.length - 1]?.relievingLettersFiles,
          payslipFiles: storedFiles[storedFiles.length - 1]?.payslipFiles,
        }));
      }
    };
    // Function to retrieve draft data from sessionStorage
    const retrieveDraftData = () => {
      const storedData = sessionStorage.getItem("draftFormData");
      if (storedData) {
        const formDataFromStorage = JSON.parse(storedData);
        // Set the formData in your state
        setFormData(formDataFromStorage);
      }
    };

    // Call the function when your component mounts
    createDB();
    retrieveDraftData();
  }, []);

  const [isLinkValid, setisLinkValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/verifyToken/${token}`
        );
        console.log(response);
        if (response.data.status === "success") {
          setisLinkValid(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      {isLinkValid ? (
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
          <ToastContainer />
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
                <Col md={2} className="d-flex justify-content-end">
                  <h6
                    className={`text-end d-none d-sm-inline-block align-top ${
                      statusC === "Pending" ? "orange" : "blue"
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
                      <Form.Label className="labelss">
                        First Name
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.firstName
                            ? formData.firstName
                            : formik.values.firstName
                        }
                      />
                      {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="text-danger">
                          {formik.errors.firstName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="lastName">
                      <Form.Label className="labelss">
                        Last Name
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.lastName
                            ? formData.lastName
                            : formik.values.lastName
                        }
                      />
                      {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="text-danger">
                          {formik.errors.lastName}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label className="labelss">
                        Email
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="✉️ Email"
                        name="email"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.email ? formData.email : formik.values.email
                        }
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="phoneNumber">
                      <div className="phoneDiv ">
                        <div>
                          <p className="labelss">
                            Phone number
                            <IoMdStar
                              style={{ color: "red", fontSize: "7px" }}
                            />
                          </p>
                        </div>
                        <div className="phoneInput ">
                          <select
                            className="country-code  "
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
                            type="text"
                            className=" form-control"
                            placeholder="(555) 000-0000"
                            name="phoneNumber"
                            onChange={handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formData.phoneNumber
                                ? formData.phoneNumber
                                : formik.values.phoneNumber
                            }
                          />
                        </div>
                        {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? (
                          <div className="text-danger">
                            {formik.errors.phoneNumber}
                          </div>
                        ) : null}
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="designation">
                      <Form.Label className="labelss">
                        Designation
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Designation"
                        name="designation"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.designation
                            ? formData.designation
                            : formik.values.designation
                        }
                      />
                      {formik.touched.designation &&
                      formik.errors.designation ? (
                        <div className="text-danger">
                          {formik.errors.designation}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="dateOfJoining">
                      <Form.Label className="labelss">
                        Date of Joining
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
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
                          value={
                            formData.dateOfJoining
                              ? formData.dateOfJoining
                              : formik.values.dateOfJoining
                          }
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
                      <Form.Label className="labelss">
                        Present Address
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Present Address"
                        name="presentAddress"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.presentAddress
                            ? formData.presentAddress
                            : formik.values.presentAddress
                        }
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
                      <Form.Label className="labelss">
                        Permanent Address
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Permanent Address"
                        name="permanentAddress"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.permanentAddress
                            ? formData.permanentAddress
                            : formik.values.permanentAddress
                        }
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
                      <Form.Label className="labelss">
                        {" "}
                        About yourself
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter a description..."
                        name="aboutYourself"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.aboutYourself
                            ? formData.aboutYourself
                            : formik.values.aboutYourself
                        }
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
                        value={
                          formData.experience
                            ? formData.experience
                            : formik.values.experience
                        }
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
                      <Form.Label className="labelss">
                        Previous Company
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your previous company name"
                        name="company"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.company
                            ? formData.company
                            : formik.values.company
                        }
                      />
                      {formik.touched.company && formik.errors.company ? (
                        <div className="text-danger">
                          {formik.errors.company}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="enjoyment">
                      <Form.Label className="labelss">
                        What do you enjoy outside of your work?
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter a description..."
                        name="enjoyment"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.enjoyment
                            ? formData.enjoyment
                            : formik.values.enjoyment
                        }
                      />
                      {formik.touched.enjoyment && formik.errors.enjoyment ? (
                        <div className="text-danger">
                          {formik.errors.enjoyment}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col md={6} xs={12}>
                    <Form.Group className="mb-3" controlId="sneakpeek">
                      <Form.Label className="labelss">
                        Sneak peek at your bucket list
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Enter a description..."
                        name="sneakpeek"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          formData.sneakpeek
                            ? formData.sneakpeek
                            : formik.values.sneakpeek
                        }
                      />
                    </Form.Group>
                    {formik.touched.sneakpeek && formik.errors.sneakpeek ? (
                      <div className="text-danger">
                        {formik.errors.sneakpeek}
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col md={4}>
                    <Form.Label style={{ fontWeight: "500" }}>
                      Documents
                    </Form.Label>
                    <FileUpload
                      // label="Photo"
                      label={
                        <span style={{ display: "inline" }}>
                          Photo
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </span>
                      }
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
                      draftFile={formData?.photoFiles}
                    />
                    <FileUpload
                      label={
                        <span style={{ display: "inline" }}>
                          Aadhar Card
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </span>
                      }
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
                      draftFile={formData?.aadharCardFiles}
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
                        <FileUpload
                          label={
                            <span style={{ display: "inline" }}>
                              10th Marksheet
                              <IoMdStar
                                style={{ color: "red", fontSize: "7px" }}
                              />
                            </span>
                          }
                          instruction="Accepted format:pdf"
                          controlId="tenthMarksheet"
                          acceptedFiles={formData.tenthMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              tenthMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) =>
                            FileChange(file, "tenthMarksheet")
                          }
                          draftFile={formData?.tenthMarksheetFiles}
                        />
                        <FileUpload
                          label={
                            <span style={{ display: "inline" }}>
                              12th Marksheet
                              <IoMdStar
                                style={{ color: "red", fontSize: "7px" }}
                              />
                            </span>
                          }
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
                          draftFile={formData?.twelfthMarksheetFiles}
                        />
                        <FileUpload
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
                          draftFile={formData?.pgDegreeCertificateFiles}
                        />
                        <FileUpload
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
                          onFileChange={(file) =>
                            FileChange(file, "PGMarksheet")
                          }
                          draftFile={formData?.pgMarksheetFiles}
                        />
                        <FileUpload
                          label={
                            <span style={{ display: "inline" }}>
                              UG Degree Certificate
                              <IoMdStar
                                style={{ color: "red", fontSize: "7px" }}
                              />
                            </span>
                          }
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
                          draftFile={formData?.ugDegreeCertificateFiles}
                        />
                        <FileUpload
                          label={
                            <span style={{ display: "inline" }}>
                              UG Marksheet
                              <IoMdStar
                                style={{ color: "red", fontSize: "7px" }}
                              />
                            </span>
                          }
                          instruction="Accepted format:pdf"
                          controlId="UGMarksheet"
                          acceptedFiles={formData.ugMarksheetFiles}
                          setAcceptedFiles={(files) =>
                            setFormData((prevData) => ({
                              ...prevData,
                              ugMarksheetFiles: files,
                            }))
                          }
                          onFileChange={(file) =>
                            FileChange(file, "UGMarksheet")
                          }
                          draftFile={formData?.ugMarksheetFiles}
                        />
                      </div>
                    </div>
                    <FileUpload
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
                      onFileChange={(file) =>
                        FileChange(file, "relievingLetters")
                      }
                      draftFile={formData?.relievingLettersFiles}
                    />
                    <FileUpload
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
                      draftFile={formData?.payslipFiles}
                    />
                    <div
                      style={{
                        display: "flex",
                        marginTop: "50px",
                        marginBottom: "25px",
                        gap: "10px",
                      }}
                    >
                      <Button
                        onClick={handleSaveDraft}
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
                    </div>
                  </Col>
                </Row>
              </Form>
            </Container>

            <Form2
              updateForm2Data={updateForm2Data}
              updateCandidateData={updateCandidateData}
              onFamilyDetailsChange={updateFamilyMembers}
              isOutsideIndia={isOutsideIndia}
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
                disabled={!formik.isValid}
                style={{
                  marginTop: "-10px",
                  height: "45px",
                  width: "95px",
                  fontSize: "15px",
                  backgroundColor: " rgb(149, 89, 201)",
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
      ) : (
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            backgroundColor: "#0000002e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "60vh",
              backgroundColor: "white",
              boxShadow: "rgb(16 24 40 / 30%) 1px 1px 10px 2px",
              borderRadius: "10px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontSize: "36px",
                letterSpacing: "3px",
                color: "rgb(102 98 98)",
                textAlign: "center",
              }}
            >
              Oops! It seems you've reached an expired link.
            </p>

            <p
              style={{ fontSize: "18px", letterSpacing: "3px", color: "gray" }}
            >
              Please reach out to your HR representative
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TopForm;
