import React, { useEffect, useState } from "react";
import "../CandidateForm/CandidateForm.css"; // Assuming you have a custom CSS file for styling
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
import moment from "moment";
import { CSVLink } from "react-csv";

const Bottomdata = {
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
  bankName: "",
  accountNumber: "",
  branch: "",
  ifsc: "",
  prefix: "",
  firstNamehr: "",
  middleName: "",
  lastNamehr: "",
  bloodGroup: "",
  nationality: "",
};

function BottomSection({ cData, isOutsideIndia }) {
  const [cbData, setCbData] = useState(Bottomdata);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [contact, setEmergencyContact] = useState('');

  useEffect(() => {
    if (cData) {
      setCbData(cData);
      setFamilyMembers(cData.members)
      setEmergencyContact(cData?.contact)
    } else {
      setCbData(Bottomdata);
    }
  }, [cData]);
  console.log(cbData);

  const handleExportCSV = () => {
    // Prepare data for CSV export
    const csvData = [
      [
        "Family member name",
        "Relationship",
        "Date of Birth",
      ],
      ...familyMembers?.map(member => [
        member.memberName,
        member.relationship,
        moment(member.dateOfBirth).format("YYYY-MM-DD"),
      ]),
    ];

    const csvFileName = "family_details.csv";
    // const csvHeaders = { headers: ["Content-Disposition"]: `attachment; filename=${csvFileName}` };

    const csvLink = document.createElement("a");
    csvLink.href = encodeURI(
      `data:text/csv;charset=utf-8,${csvData
        .map((row) => row.join(","))
        .join("\n")}`
    );
    csvLink.target = "_blank";
    csvLink.download = csvFileName;
    csvLink.click();
  };

  const csvHeaders = [
    "epfoUan",
    "pfNo",
    "adharCard",
    "panCard",
    "employeesName",
    "dateOfBirthAs",
    "gender",
    "maritalStatus",
    "fatherName",
    "bankName",
    "accountNumber",
    "branch",
    "ifsc",
  ];

  const HRData = [
    [
      "Prefix",
      "First Name",
      "Middle Name",
      "Last Name",
      "Blood Group",
      "Nationality",
    ],
    [
      cbData.prefix,
      cbData.firstNamehr,
      cbData.middleName,
      cbData.lastNamehr,
      cbData.bloodGroup,
      cbData.nationality,
    ],
  ];

  return (
    <div className=" margin-mobile" style={{ width: "100%" }}>
      {
        familyMembers?.length > 0 &&
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
            <h3 className="heading"> Family details For Medical Insurance</h3>
            <div className="buttons">
              <Button
                style={{ backgroundColor: "#7F56D9", border: "none" }}
                className="buttonss"
                onClick={handleExportCSV}
              >
                <CiExport
                  className="me-2 icon"
                  style={{
                    color: "white",
                    fontSize: "19px",
                    fontWeight: "bolder",
                  }}
                />
                Export
              </Button>
            </div>
          </div>
        </Container>
      }
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
          <Form className="forms">
            {
              familyMembers?.length > 0 ? (
                familyMembers?.map((member, index) => (
                  <Row className="mb-3" key={member?._id}>
                    <Col xs={12} md={4}>
                      <Form.Group controlId="formGroupEmail" className="mt-3">
                        <Form.Label className="labelss">
                          Family member name
                        </Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={member?.memberName}
                          name="memberName"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                      <Form.Group controlId="realtionShip" className="mt-3">
                        <Form.Label className="labelss">Relationship</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          name="relationship"
                          value={member?.relationship}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                      <Form.Group controlId="dateOfBirth" className="mt-3">
                        <Form.Label className="labelss">Date of Birth</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <CiCalendar />
                          </InputGroup.Text>
                          <Form.Control
                            className="input-field"
                            type="date"
                            value={moment(member?.dateOfBirth).format("yyyy-MM-DD")}
                            name="dateOfBirth"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                ))
              )
                : (
                  <h4 className="heading text-center mt-2 mb-2">
                    No Family Members Added for Medical Insurance
                  </h4>
                )
            }
            <Row>
              {
                contact?.emergencyContactNumber &&
                <Col xs={12} md={4}>
                  <Form.Group controlId="EmergencyPhoneNumber" className="mt-3">
                    <div className="phoneDiv mt-4">
                      <div className="labelss">
                        <p>Emergency contact number</p>
                      </div>
                      <div className="phoneInput ">
                        <select
                          className="country-code "
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
                          placeholder="+91(555) 000-0000"
                          value={contact?.emergencyContactNumber}
                          name="emergencyContactNumber"
                        />
                      </div>
                    </div>
                  </Form.Group>
                </Col>

              }
              {
                contact?.relationToEmergencyContact &&
                <Col xs={12} md={4}>
                  <Form.Group controlId="emailAddress" className="mt-4">
                    <Form.Label className="labelss">Relation to emergency contact</Form.Label>
                    <Form.Control
                      className="input-field"
                      type="email"
                      value={contact?.relationToEmergencyContact}
                      name="emailAddress"
                    />
                  </Form.Group>
                </Col>
              }
            </Row>
          </Form>
        </div>
      </Container>
      {/* <br /> */}

      {!isOutsideIndia &&
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
              <div className="buttons">
                {/* <Button
               style={{ backgroundColor: '#7F56D9', border: 'none' }}
               className='buttonss'
             >
               <CiExport
                 className='me-2 icon'
                 style={{ color: 'white', fontSize: '19px', fontWeight: 'bolder' }}
               />
               Export
             </Button> */}
                <CSVLink
                  data={[cbData]}
                  headers={csvHeaders}
                  filename={"PF Account_details.csv"}
                  className="buttonss"
                >
                  <Button
                    style={{ backgroundColor: "#7F56D9", border: "none" }}
                    className="buttonss"
                  >
                    <CiExport
                      className="me-2 icon"
                      style={{
                        color: "white",
                        fontSize: "19px",
                        fontWeight: "bolder",
                      }}
                    />
                    Export
                  </Button>
                </CSVLink>
              </div>
            </div>
          </Container>


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
                        value={cbData.epfoUan}
                        name="epfoUan"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="pfNo" className="mt-3">
                      <Form.Label className="labelss">PF NO</Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        value={cbData.pfNo}
                        name="pfNo"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={4}>
                    <Form.Group controlId="adharCard" className="ms mt-3">
                      <Form.Label className="labelss">AADHAR CARD NO</Form.Label>
                      <Form.Control
                        className="input-field"
                        type="text"
                        value={cbData.adharCard}
                        name="adharCard"
                      />
                    </Form.Group>
                  </Col>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3" controlId="panCardNo">
                        <Form.Label className="labelss">PAN CARD NO</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.panCard}
                          name="panCard"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 ms-1" controlId="employeeName">
                        <Form.Label className="labelss">
                          Employee's name (As per Aadhar)
                        </Form.Label>
                        <Form.Control
                          className="input-field "
                          type="text"
                          value={cbData.employeesName}
                          name="employeesName"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 " controlId="dateOfBirthAs">
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
                            value={moment(cbData.dateOfBirthAs).format(
                              "yyyy-MM-DD"
                            )}
                            name="dateOfBirthAs"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 " controlId="formGroupEmail">
                        <Form.Label className="labelss">Gender</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.gender}
                          name="gender"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 ms-2" controlId="formGroupEmail">
                        <Form.Label className="labelss">Marital status</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.maritalStatus}
                          name="maritalStatus"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 ms-1" controlId="formGroupEmail">
                        <Form.Label className="labelss">Father's name</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.fatherName}
                          name="fatherName"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Group className="mb-3 ms-1" controlId="formGroupEmail">
                        <Form.Label className="labelss">Bank Name</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.bankName}
                          name="bankName"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 ms-1" controlId="formGroupEmail">
                        <Form.Label className="labelss">Bank branch</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.branch}
                          name="branch"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3" controlId="formGroupEmail">
                        <Form.Label className="labelss">Bank A/C No</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.accountNumber}
                          name="accountNumber"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                      <Form.Group className="mt-3 ms-1" controlId="formGroupEmail">
                        <Form.Label className="labelss">Bank IFSC No</Form.Label>
                        <Form.Control
                          className="input-field"
                          type="text"
                          value={cbData.ifsc}
                          name="ifsc"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
                {/* Continue adding more rows and columns as needed */}
              </Form>
            </div>
          </Container>

        </>
      }



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
          <div className="buttons">
            <CSVLink
              data={HRData}
              filename={"Details_of_HROne_Portal.csv"}
              className="buttonss"
            >
              <Button
                style={{ backgroundColor: "#7F56D9", border: "none" }}
                className="buttonss"
              >
                <CiExport
                  className="me-2 icon"
                  style={{
                    color: "white",
                    fontSize: "19px",
                    fontWeight: "bolder",
                  }}
                />
                Export
              </Button>
            </CSVLink>
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
                    value={cbData.prefix}
                    name="prefix"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="labelss">First name</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    value={cbData.firstNamehr}
                    name="firstNamehr"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="middleName">
                  <Form.Label className="labelss">Middle name</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    value={cbData.middleName}
                    name="middleName"
                  />
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
                    value={cbData.lastNamehr}
                    name="lastNamehr"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="bloodGroup">
                  <Form.Label className="labelss">Blood group</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    value={cbData.bloodGroup}
                    name="bloodGroup"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="nationality">
                  <Form.Label className="labelss">Nationality</Form.Label>
                  <Form.Control
                    className="input-field"
                    type="text"
                    value={cbData.nationality}
                    name="nationality"
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
