import { useFormik } from "formik";
import * as Yup from "yup";

// Initial values for the form
export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
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

  contact: {
    countryCode: "",
    emergencyContactNumber: "",
    relationToEmergencyContact: "",
  },

  //bottom-3
  prefix: "",
  firstNamehr: "",
  lastNamehr: "",
  middleName: "",
  bloodGroup: "",
  nationality: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),

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

  enjoyment: Yup.string().required("Enjoyment is required"),
  sneakpeek: Yup.string().required("Sneak peek is required"),

  // Other fields...
  photoFiles: Yup.mixed().test(
    "fileRequired",
    "Photo is required",
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
  // relievingLettersFiles: Yup.mixed().test(
  //   "fileRequired",
  //   "Relieving Letters are required",
  //   (value) => value && value.size > 0
  // ),
  // payslipFiles: Yup.mixed().test(
  //   "fileRequired",
  //   "Payslip is required",
  //   (value) => value && value.size > 0
  // ),

  firstNamehr: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("First Name is required"),
  lastNamehr: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Last Name is required"),

  bloodGroup: Yup.string().required("Blood Group is Required"),
  nationality: Yup.string()
    .matches(/^[^\d]+$/, "Nationality should not contain numbers")
    .required("Nationality is required"),
});

export const handleFieldChange = (formik, e) => {
  const { name, value, type, files } = e.target;
  formik.handleChange(e);
  formik.setFieldTouched(name, true, false);

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
    case " highestQualification":
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
        formik.setFieldError(name, `Please upload a ${name} file`);
      }
      break;

      case "email":
        if (!value.includes("@")) {
          formik.setFieldError(name, "Invalid email: must include @ symbol");
        } else {
          formik.setFieldError(name, "");
        }
        break;

    case "phoneNumber":
    case "emergencyContactNumber":
      if (!/^\d+$/.test(value)) {
        formik.setFieldError(name, "Invalid phone number");
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
    // case "ifsc":
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
