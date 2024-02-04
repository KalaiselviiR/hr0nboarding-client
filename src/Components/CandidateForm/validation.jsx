

import { useFormik } from "formik";
import * as Yup from "yup";

// Initial values for the form
export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode:"+91",
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
  //bottom-1
  // memberName: "",
  // relationship: "",
  // dateOfBirth: null,
  // emergencyContactNumber: "",
  // emailAddress: "",
  
  //bottom-2
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
  //bottom-3
  prefix: "",
  firstNamehr: "",
  lastNamehr: "",
  middleName: "",
  bloodGroup: "",
  nationality: "",
  // officialEmail: "",
  // employeeId: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/@techjays\.com$/, "Email must includes @techjays.com domain"),

  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  designation: Yup.string()
    .matches(/^[^\d]+$/, "Designation should not contain numbers")
    .required("Designation is required"),
  dateOfJoining: Yup.date().required("Date of Joining is required"),
  presentAddress: Yup.string().required("Present Address is required"),
  permanentAddress: Yup.string().required("Permanent Address is required"),
  aboutYourself: Yup.string().required("About yourself is required"),
  // experience: Yup.string().required("Experience is required"),
  // company: Yup.string()
  //   .matches(/^[^\d]+$/, "Company should not contain numbers")
  //   .required("Previous Company is required"),
  enjoyment: Yup.string().required("Enjoyment is required"),
  sneakpeek: Yup.string().required("Sneak peek is required"),
  // photoFiles: Yup.mixed().required("Photo is required"),
  // aadharCardFiles: Yup.mixed().required("Aadhar Card is required"),
  // educationCertificateFiles: Yup.mixed().required("Education Certificate is required"),
  // relievingLettersFiles: Yup.mixed().required("Relieving Letters are required"),
  // payslipFiles: Yup.mixed().required("Payslip is required"),

  // Other fields...
  photoFiles: Yup.mixed().test(
    "fileRequired",
    "Photo is required",
    // (value) => value && value.length > 0
    (value) => value && value.size > 0
  ),
  aadharCardFiles: Yup.mixed().test(
    "fileRequired",
    "Aadhar Card is required",
    (value) => value && value.size > 0
  ),
  tenthMarksheetFiles: Yup.mixed().test(
    "fileRequired",
    "10th marksheet is required",
    (value) => value && value.size > 0
  ),
  twelfthMarksheetFiles: Yup.mixed().test(
    "fileRequired",
    "12th marksheet is required",
    (value) => value && value.size > 0
  ),
  relievingLettersFiles: Yup.mixed().test(
    "fileRequired",
    "Relieving Letters are required",
    (value) => value && value.size > 0
  ),
  payslipFiles: Yup.mixed().test(
    "fileRequired",
    "Payslip is required",
    (value) => value && value.size > 0
  ),

  // bottom form-1
  // memberName: Yup.string()
  //   .matches(/^[^\d]+$/, "Member Name should not contain numbers")
  //   .required("Member Name is required"),
  // relationship: Yup.string()
  //   .matches(/^[^\d]+$/, "Relationship Name should not contain numbers"),
    // .required("Relationship Name is required"),
  // dateOfBirth: Yup.date().required("Date of Birth is required"),
  // emergencyContactNumber: Yup.string()
  //   .matches(/^\+?[0-9]+$/, "Invalid phone number"),
    // .required("Phone Number is required"),
  // emailAddress: Yup.string()
  //   .email("Invalid email"),
    // .required("Email is required"),
  //   .matches(/@techjays\.com$/, "Email must includes @techjays.com domain"),
          

  // bottomForm-2
  epfoUan: Yup.string()
  .matches(/^\d{10}$/, "It contains 10 digits"),
  // .required("EPFO UAN is required"),
pfNo: Yup.string()
.matches(/^\d{10}$/, "It contains 10 digits"),
//   .required("PF NO is required"),
  adharCard: Yup.string()
    .matches(/^\d{13}$/, "Invalid AdharCard Number(It contains 13 digit)")
    .required("AdharCard Number is required"),
  panCard: Yup.string()
    .matches(/^\+?[a-zA-Z0-9]+$/, "Invalid PanCard Number")
    .required("PanCard Number is required"),
  employeesName: Yup.string()
    .matches(/^[^\d]+$/, "employee Name should not contain numbers")
    .required("employee Name is required"),

  dateOfBirthAs: Yup.string().required("Date of Birth"),
  gender: Yup.string()
    .matches(/^[^\d]+$/, "Gender should not contain numbers")
    .required("Gender is Required"),
  maritalStatus: Yup.string()
    .matches(/^[^\d]+$/, "Marital status should not contain numbers")
    .required("Marital Status is Required"),
  fatherName: Yup.string()
    .matches(/^[^\d]+$/, "Father Name should not contain numbers")
    .required("Father Name is required"),
  bankName: Yup.string()
    .matches(/^[^\d]+$/, "Bank Name should not contain numbers")
    .required("Bank Name is required"),  
  accountNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid Account Number")
    .required("Account Number is required"),
  branch: Yup.string()
    .matches(/^[^\d]+$/, "Branch should not contain numbers")
    .required("Branch Name is required"),
  ifsc: Yup.string()
    .matches(/^\+?[a-zA-Z0-9]+$/, "Invalid IFSC Code")
    .required("IFSC code is required"),
  //bottomForm-3
  // prefix: Yup.string()
  //   .matches(/^[^\d]+$/, "Prefix should not contain numbers")
  //   .required("Prefix is required"),
  firstNamehr: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("First Name is required"),
  lastNamehr: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Last Name is required"),
  // middleName: Yup.string()
  //   .matches(/^[^\d]+$/, "Middle Name should not contain numbers")
  //   .required("Middle Name is required"),
  bloodGroup: Yup.string().required("Blood Group is Required"),
  nationality: Yup.string()
    .matches(/^[^\d]+$/, "Nationality should not contain numbers")
    .required("Nationality is required"),
  // officialEmail: Yup.string()
  //   .email("Invalid email")
  //   .required("Email is required")
  //   .matches(
  //     /@techjays\.com$/,
  //     "Email must includes from @techjays.com domain"
  //   ),
  // employeeId: Yup.string().required("Employee Id is Required"),
});

export const handleFieldChange = (formik, e) => {
  const { name, value,type, files } = e.target;
  formik.handleChange(e); // Use Formik's handleChange for field-level changes
  formik.setFieldTouched(name, true, false); // Mark field as touched without validating

  // Additional custom validation logic
  switch (name) {
    case "firstName":
    case "lastName":
    case "memberName":
    case "relationship":
    case "employeesName":
    case "fatherName":
    case "branch":
    case "firstNamehr":
    case "lastNamehr":
    // case "middleName":
    case "nationality":
    case "bankName":  
    // case "maritalStatus":
    case "gender":
      // Check if the value contains a number
      if (/\d/.test(value)) {
        formik.setFieldError(name, `${name} should not contain numbers`);
      } else {
        formik.setFieldError(name, ""); // Clear the error if the value is valid
      }
      break;

    case "photoFiles":
    case "aadharCardFiles":
    case "relievingLettersFiles":
    case "payslipFiles":
      // Check if files are selected
      if (files && files.length > 0) {
        formik.setFieldError(name, ""); 
      } else {
        formik.setFieldError(
          name,
          `Please upload a ${name} file`
        );
      }
      break;

    case "email":
    // case "emailAddress":
    // case "officialEmail":
      // Your custom email validation logic
      // For example, checking if it contains '@'
      const requiredDomain = "techjays";

      if (!value.includes("@") || value.split("@")[1] !== requiredDomain) {
        formik.setFieldError(name, "Invalid email must include @techjays");
      } else {
        formik.setFieldError(name, "");
      }

      break;

    case "phoneNumber":
    case "emergencyContactNumber":
      // Your custom phone number validation logic
      // For example, checking if it contains only digits
      if (!/^\d+$/.test(value)) {
        formik.setFieldError(name, "Invalid phone number");
      } else {
        formik.setFieldError(name, "");
      }
      break;

    case "epfoUan":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\d{10}$/.test(value)) {
        formik.setFieldError(name, "Invalid EpfoUan");
      } else {
        formik.setFieldError(name, "");
      }
      break;

      case "pfNo":
        // PF Number validation logic (first two capitalized letters, remaining numbers)
        if (!/^[A-Z]{2}\d+$/.test(value)) {
          formik.setFieldError(name, "Invalid PF Number");
        } else {
          formik.setFieldError(name, "");
        }
        break;
      

    case "adharCard":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\d{12}$/.test(value)) {
        formik.setFieldError(
          name,
          "Invalid Number(Adhar contains 12 digit number)"
        );
      } else {
        formik.setFieldError(name, "");
      }
      break;

    case "panCard":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\+?[a-zA-Z0-9]+$/.test(value)) {
        formik.setFieldError(name, "Invalid Number(Invalid PAN number)");
      } else {
        formik.setFieldError(name, "");
      }
      break;

    case "designation":
    case "dateOfJoining":
    case "dateOfBirth":
    case "presentAddress":
    case "permanentAddress":
    case "aboutYourself":
    case "experience":
    case "company":
    case "enjoyment":
    case "sneakpeek":
    case "ifsc":
    case "bloodGroup":
    case "employeeId":
      // Example: Check if the value is not empty
      if (value.trim() === "") {
        formik.setFieldError(name, `${name} is required`);
      } else {
        formik.setFieldError(name, "");
      }
      break;

    default:
      break;
  }
};
