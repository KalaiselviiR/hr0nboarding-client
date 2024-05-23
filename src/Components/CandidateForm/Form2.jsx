import React, { useEffect, useState } from "react";
import "./CandidateForm.css";
import { CiExport, CiCalendar, CiTrash } from "react-icons/ci";
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
import { allBanks } from "./Bank";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdStar } from "react-icons/io";

function Form2({
  updateForm2Data,
  updateCandidateData,
  onFamilyDetailsChange,
  isOutsideIndia,
}) {
  const [familyMembers, setFamilyMembers] = useState([
    { memberName: "", relationship: "", dateOfBirth: "" },
  ]);

  const [contact, setEmergencyContact] = useState({
    countryCode: "+91",
    emergencyContactNumber: "",
    relationToEmergencyContact: "",
  });

  
  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { memberName: "", relationship: "", dateOfBirth: "" },
    ]);

    formik.setFieldValue("members", [
      ...formik.values?.members,
      { memberName: "", relationship: "", dateOfBirth: "" },
    ]);
  };

  //create an object to store datas from input family details
  const [candidateData, setCandidate] = useState({
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
    highestQualification: "",
    prefix: "",
    firstNamehr: "",
    middleName: "",
    lastNamehr: "",
    bloodGroup: "",
    nationality: "",
  });

  //save as draft for medical issurance details
  const handleSaveDraft1 = () => {
    const formData = familyMembers.map((member) => ({
      memberName: member.memberName,
      relationship: member.relationship,
      dateOfBirth: member.dateOfBirth,
    }));

    sessionStorage.setItem("medicalInsurance", JSON.stringify(formData));

    toast.success("Details Saved Successfully", {
      position: "top-center",
    });

    console.log("Form data saved as draft.");
  };

  const handleSaveDraftContact = () => {
    const contactDetails = JSON.stringify({
      countryCode: contact.countryCode,
      emergencyContactNumber: contact.emergencyContactNumber,
      relationToEmergencyContact: contact.relationToEmergencyContact,
    });

    sessionStorage.setItem("contact", contactDetails);
    console.log("Form data saved as draft.");
  };

  const handleSaveDraftAll = () => {
    handleSaveDraft1();
    handleSaveDraftContact();
  };

  //save as draft for pf account
  const handleSaveDraft2 = () => {
    const pfAccount = JSON.stringify({
      epfoUan: candidateData.epfoUan,
      pfNo: candidateData.pfNo,
      adharCard: candidateData.adharCard,
      panCard: candidateData.panCard,
      employeesName: candidateData.employeesName,
      dateOfBirthAs: candidateData.dateOfBirthAs,
      gender: candidateData.gender,
      maritalStatus: candidateData.maritalStatus,
      fatherName: candidateData.fatherName,
      accountNumber: candidateData.accountNumber,
      branch: candidateData.branch,
      ifsc: candidateData.ifsc,
      highestQualification: candidateData.highestQualification,
    });

    sessionStorage.setItem("pfAccount", pfAccount);

    toast.success("Details Saved Successfully", {
      position: "top-center",
    });

    console.log("Form data saved as draft.");
  };

  //save as draft for hrone details
  const handleSaveDraft3 = () => {
    const hrOneDetails = JSON.stringify({
      prefix: candidateData.prefix,
      firstNamehr: candidateData.firstNamehr,
      middleName: candidateData.middleName,
      lastNamehr: candidateData.lastNamehr,
      bloodGroup: candidateData.bloodGroup,
      nationality: candidateData.nationality,
    });

    sessionStorage.setItem("hrOneDetails", hrOneDetails);

    toast.success("Details Saved Successfully", {
      position: "top-center",
    });

    console.log("Form data saved as draft.");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e) => {
    handleFieldChange(formik, e);
    // prevent the event
    e.preventDefault();
    // access value to update in userData
    const { value } = e.target;
    // access key to update in userData
    const key = e.target.name;
    // update the data with existing data
    setCandidate((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleFamilyDetailsChange = (index, key, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][key] = value;
    setFamilyMembers(updatedMembers);
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
  };

  useEffect(() => {
    // This will run whenever candidateData changes
    updateForm2Data(candidateData);
    updateCandidateData(candidateData);
  }, [candidateData]);

  useEffect(() => {
    onFamilyDetailsChange(familyMembers, contact);
  }, [familyMembers, contact]);

  //save as draft for medical insurance information

  useEffect(() => {
    // Function to retrieve draft data from sessionStorage
    const retrieveDraftData = () => {
      const storedData = sessionStorage.getItem("medicalInsurance");
      if (storedData) {
        const formDataFromStorage1 = JSON.parse(storedData);
        setFamilyMembers(formDataFromStorage1);
      }
    };

    // Call the function when your component mounts
    retrieveDraftData();
  }, []);

  //save as draft for contact details

  useEffect(() => {
    // Function to retrieve draft data from sessionStorage
    const retrieveDraftData = () => {
      const storedData = sessionStorage.getItem("contact");
      if (storedData) {
        const formDataFromStorage1 = JSON.parse(storedData);
        setEmergencyContact(formDataFromStorage1);
      }
    };

    // Call the function when your component mounts
    retrieveDraftData();
  }, []);

  //save as draft for pf account

  useEffect(() => {
    // Function to retrieve draft data from sessionStorage
    const retrieveDraftData = () => {
      const pfData = sessionStorage.getItem("pfAccount");
      if (pfData) {
        const pfAccountDetails = JSON.parse(pfData);
        setCandidate((prevData) => ({ ...prevData, ...pfAccountDetails }));
      }
    };
    // Call the function when your component mounts
    retrieveDraftData();
  }, []);

  //save as draft for hrone details

  useEffect(() => {
    // Function to retrieve draft data from sessionStorage
    const retrieveDraftData = () => {
      const hrData = sessionStorage.getItem("hrOneDetails");
      if (hrData) {
        const hrOneDetails = JSON.parse(hrData);
        setCandidate((prevData) => ({ ...prevData, ...hrOneDetails }));
      }
    };
    // Call the function when your component mounts
    retrieveDraftData();
  }, []);

  const isNameInvalid = (name) => /\d/.test(name);

  return (
    <div className=" margin-mobile" style={{ width: "100%" }}>
      <ToastContainer />
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
          <h3 className="heading"> Family Details For Medical Insurance</h3>
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
            {/* Mapping over familyMembers array */}
            {familyMembers.map((member, index) => (
              <>
                <Row key={index} className="mb-3">
                  {/* Render input fields for each family member */}
                  <Col xs={12} md={4} className="mt-">
                    <Form.Group >
                      <Form.Label className="labelss mt-4">
                        Family member name {index + 1}
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="Name"
                        name="memberName"
                        onChange={(e) =>
                          handleFamilyDetailsChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        onBlur={formik.handleBlur}
                        value={
                          familyMembers[index]?.memberName
                            ? familyMembers[index]?.memberName
                            : familyMembers?.memberName
                        }
                        isInvalid={isNameInvalid(
                          familyMembers[index]?.memberName
                        )}
                      />
                      {isNameInvalid(familyMembers[index]?.memberName) && (
                        <Form.Control.Feedback type="invalid">
                          Name should not contain numbers.
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="relationship">
                      <Form.Label className="labelss mt-4">
                        Relationship
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Select
                        className="input-field"
                        name="relationship"
                        onChange={(e) =>
                          handleFamilyDetailsChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        onBlur={formik.handleBlur}
                        value={
                          familyMembers[index]?.relationship
                            ? familyMembers[index]?.relationship
                            : familyMembers?.relationship
                        }
                        title="Select relationship"
                      >
                        <option value="" label="Select Relationship" />
                        <option value="Father" label="Father" />
                        <option value="Mother" label="Mother" />
                        <option value="Spouse" label="Spouse" />
                        <option value="Child1" label="Child 1" />
                        <option value="Child2" label="Child 2" />
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="dateOfBirth">
                      <Form.Label className="labelss mt-4">
                        Date of Birth
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <CiCalendar />
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          className="input-field"
                          placeholder="Date"
                          name="dateOfBirth"
                          onChange={(e) =>
                            handleFamilyDetailsChange(
                              index,
                              e.target.name,
                              e.target.value
                            )
                          }
                          onBlur={formik.handleBlur}
                          value={
                            familyMembers[index]?.dateOfBirth
                              ? familyMembers[index]?.dateOfBirth
                              : familyMembers?.dateOfBirth
                          }
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col className="d-flex justify-content-between mt-3">
                      <Button
                        onClick={addFamilyMember}
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
                      {index !== 0 && (
                        <CiTrash
                          onClick={() => handleRemoveMember(index)}
                          style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginRight: "-20px",
                            height: "35px",
                            fontSize: "22px",
                            color: "rgb(147, 48, 233)",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </Row>
              </>
            ))}
            <Row>
              <Col xs={12} md={4}>
                <Form.Group controlId="EmergencyPhoneNumber">
                  <div className="phoneDiv mt-4">
                    <div className="labelss">
                      <p>
                        Emergency contact number
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </p>
                    </div>
                    <div className="phoneInput ">
                      <select
                        className="country-code "
                        onChange={(e) =>
                          setEmergencyContact((prev) => ({
                            ...prev,
                            countryCode: e.target.value,
                          }))
                        }
                        title="Select your country code"
                      >
                        <option selected value="+91">
                          IN(+91)
                        </option>
                        <option value="+880">BD(+880)</option>
                        <option value="+1">US(+1)</option>
                        <option value="+20">EG(+20)</option>
                      </select>
                      <input
                        className="input-field form-control phoneNumberSize "
                        type="tel"
                        placeholder="(555) 000-0000"
                        name="emergencyContactNumber"
                        onChange={(e) =>
                          setEmergencyContact((prev) => ({
                            ...prev,
                            emergencyContactNumber: e.target.value,
                          }))
                        }
                        onBlur={formik.handleBlur}
                        value={contact?.emergencyContactNumber}
                      />
                    </div>
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="emailAddress">
                  <Form.Label className="labelss mt-4">
                    Relation to emergency contact
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Relation"
                    name="relation"
                    onChange={(e) =>
                      setEmergencyContact((prev) => ({
                        ...prev,
                        relationToEmergencyContact: e.target.value,
                      }))
                    }
                    onBlur={formik.handleBlur}
                    value={contact?.relationToEmergencyContact}
                    isInvalid={isNameInvalid(
                      contact?.relationToEmergencyContact
                    )}
                  />
                  {isNameInvalid(contact?.relationToEmergencyContact) && (
                    <Form.Control.Feedback type="invalid">
                      Name should not contain numbers.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              {/* <div
                style={{
                  display: "flex",
                  marginTop: "50px",
                  marginBottom: "25px",
                  gap: "10px",
                }}
              >
                <Button
                  onClick={handleSaveDraftAll}
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
            </Row>
          </Form>
        </div>
      </Container>

      {!isOutsideIndia && (
        <>
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
              <h3 className="heading">Details For PF Account</h3>
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
                    <Form.Group controlId="epfoUan" className="mt-3">
                      <Form.Label className="labelss">
                        EPFO UAN (If already allotted)
                      </Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="XXXXXXXXXX"
                        name="epfoUan"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          candidateData.epfoUan
                            ? candidateData.epfoUan
                            : formik.values.epfoUan
                        }
                      />
                      {formik.touched.epfoUan && formik.errors.epfoUan ? (
                        <div className="text-danger">
                          {formik.errors.epfoUan}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="pfNo" className="mt-3">
                      <Form.Label className="labelss  ">PF NO</Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="XX/XXXXX/XXXXX"
                        name="pfNo"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          candidateData.pfNo
                            ? candidateData.pfNo
                            : formik.values.pfNo
                        }
                      />
                      {formik.touched.pfNo && formik.errors.pfNo ? (
                        <div className="text-danger">{formik.errors.pfNo}</div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="adharCard" className="ms mt-3">
                      <Form.Label className="labelss  ">
                        AADHAR CARD NO
                        <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                      </Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        name="adharCard"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={
                          candidateData.adharCard
                            ? candidateData.adharCard
                            : formik.values.adharCard
                        }
                      />
                      {formik.touched.adharCard && formik.errors.adharCard ? (
                        <div className="text-danger">
                          {formik.errors.adharCard}
                        </div>
                      ) : null}
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3" controlId="panCardNo">
                        <Form.Label className="labelss">
                          PAN CARD NO
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          placeholder="Pan Card No"
                          name="panCard"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.panCard
                              ? candidateData.panCard
                              : formik.values.panCard
                          }
                        />
                        {formik.touched.panCard && formik.errors.panCard ? (
                          <div className="text-danger">
                            {formik.errors.panCard}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3 ms-1"
                        controlId="employeeName"
                      >
                        <Form.Label className="labelss">
                          Employee's name (As per Aadhar)
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field "
                          type="text"
                          placeholder="Employee's Name"
                          name="employeesName"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.employeesName
                              ? candidateData.employeesName
                              : formik.values.employeesName
                          }
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
                      <Form.Group className="mt-3 " controlId="dateOfBirthAs">
                        <Form.Label className="labelss ms-1">
                          Date of birth (As per the Aadhar)
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
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
                            value={
                              candidateData.dateOfBirthAs
                                ? candidateData.dateOfBirthAs
                                : formik.values.dateOfBirthAs
                            }
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
                      <Form.Group className="mt-3" controlId="formGroupGender">
                        <Form.Label className="labelss">
                          Gender
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Select
                          className="input-field"
                          name="gender"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.gender
                              ? candidateData.gender
                              : formik.values.gender
                          }
                          title="Select your gender"

                        >
                          <option value="" label="Select Gender" />
                          <option value="Male" label="Male" />
                          <option value="Female" label="Female" />
                          <option value="Other" label="Other" />
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3 ms-2"
                        controlId="formGroupMaritalStatus"
                      >
                        <Form.Label className="labelss">
                          Marital status
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Select
                          className="input-field"
                          name="maritalStatus"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.maritalStatus
                              ? candidateData.maritalStatus
                              : formik.values.maritalStatus
                          }
                          title="Select marital status"

                        >
                          <option value="" label="Select Marital Status" />
                          <option value="unmarried">Unmarried</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>

                          <option value="separated">Separated</option>
                        </Form.Select>
                        {formik.touched.maritalStatus &&
                        formik.errors.maritalStatus ? (
                          <div className="text-danger">
                            {formik.errors.maritalStatus}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3 ms-1"
                       
                      >
                        <Form.Label className="labelss">
                          Father's name
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          placeholder="Father's Name"
                          name="fatherName"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.fatherName
                              ? candidateData.fatherName
                              : formik.values.fatherName
                          }
                        />
                        {formik.touched.fatherName &&
                        formik.errors.fatherName ? (
                          <div className="text-danger">
                            {formik.errors.fatherName}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3">
                        <Form.Label className="labelss">
                          Bank Name
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Select
                          className="input-field"
                          name="bankName"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.bankName
                              ? candidateData.bankName
                              : formik.values.bankName
                          }
                          title="Select your bank"
                        >
                          <option value="" label="Select Bank" />
                          {allBanks
                            .filter((bank) =>
                              bank
                                .toLowerCase()
                                .includes(formik.values.bankName.toLowerCase())
                            )
                            .map((filteredBank) => (
                              <option
                                key={filteredBank}
                                value={filteredBank}
                                label={filteredBank}
                                
                              />
                            ))}
                        </Form.Select>

                        {formik.touched.bankName && formik.errors.bankName && (
                          <div className="text-danger">
                            {formik.errors.bankName}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3 ms-1"
                  
                      >
                        <Form.Label className="labelss">
                          Bank branch
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          placeholder="Branch"
                          name="branch"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.branch
                              ? candidateData.branch
                              : formik.values.branch
                          }
                        />
                        {formik.touched.branch && formik.errors.branch ? (
                          <div className="text-danger">
                            {formik.errors.branch}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3" >
                        <Form.Label className="labelss">
                          Bank A/C No
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          placeholder="Account Number"
                          name="accountNumber"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.accountNumber
                              ? candidateData.accountNumber
                              : formik.values.accountNumber
                          }
                        />
                        {formik.touched.accountNumber &&
                        formik.errors.accountNumber ? (
                          <div className="text-danger">
                            {formik.errors.accountNumber}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3 ms-1"
                        controlId="formGroupEmail"
                      >
                        <Form.Label className="labelss">
                          Bank IFSC No
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          placeholder="IFSC"
                          name="ifsc"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.ifsc
                              ? candidateData.ifsc
                              : formik.values.ifsc
                          }
                        />
                        {formik.touched.ifsc && formik.errors.ifsc ? (
                          <div className="text-danger">
                            {formik.errors.ifsc}
                          </div>
                        ) : null}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group
                        className="mt-3"
                        controlId=" highestQualification"
                      >
                        <Form.Label className="labelss">
                          Highest qualification
                          <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                        </Form.Label>
                        <Form.Control
                          className="input-field "
                          type="text"
                          placeholder="Highest qualification"
                          name="highestQualification"
                          onChange={handleChange}
                          onBlur={formik.handleBlur}
                          value={
                            candidateData.highestQualification
                              ? candidateData.highestQualification
                              : formik.values.highestQualification
                          }
                        />
                        {formik.touched.highestQualification &&
                        formik.errors.highestQualification ? (
                          <div className="text-danger">
                            {formik.errors.highestQualification}
                          </div>
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
                >
                  <Button
                    onClick={handleSaveDraft2}
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
              </Form>
            </div>
          </Container>
        </>
      )}

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
          <h3 className="heading">Details For HROne Portal</h3>
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
        {/* HROne details form */}
        <div>
          <Form className="forms">
            <Row>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="prefix">
                  <Form.Label className="labelss">
                    Prefix
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Select
                    className="input-field"
                    name="prefix"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      candidateData.prefix
                        ? candidateData.prefix
                        : formik.values.prefix
                    }
                    title="Select your prefix"
                  >
                    <option value="">Select Prefix</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="labelss">
                    First name
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="First Name"
                    name="firstNamehr"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      candidateData.firstNamehr
                        ? candidateData.firstNamehr
                        : formik.values.firstNamehr
                    }
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
                    value={
                      candidateData.middleName
                        ? candidateData.middleName
                        : formik.values.middleName
                    }
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
                  <Form.Label className="labelss">
                    Last name
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Last Name"
                    name="lastNamehr"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      candidateData.lastNamehr
                        ? candidateData.lastNamehr
                        : formik.values.lastNamehr
                    }
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
                  <Form.Label className="labelss">
                    Blood group
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Select
                    className="input-field"
                    name="bloodGroup"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      candidateData.bloodGroup
                        ? candidateData.bloodGroup
                        : formik.values.bloodGroup
                    }
                    title="Select your blood group"
                  >
                    <option value="" label="Select Blood Group" />
                    <option value="A+" label="A+" />
                    <option value="A-" label="A-" />
                    <option value="B+" label="B+" />
                    <option value="B-" label="B-" />
                    <option value="AB+" label="AB+" />
                    <option value="AB-" label="AB-" />
                    <option value="O+" label="O+" />
                    <option value="O-" label="O-" />
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="nationality">
                  <Form.Label className="labelss">
                    Nationality
                    <IoMdStar style={{ color: "red", fontSize: "7px" }} />
                  </Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    placeholder="Nationality"
                    name="nationality"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      candidateData.nationality
                        ? candidateData.nationality
                        : formik.values.nationality
                    }
                  />
                  {formik.touched.nationality && formik.errors.nationality ? (
                    <div className="text-danger">
                      {formik.errors.nationality}
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
            >
              <Button
                onClick={handleSaveDraft3}
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
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Form2;
