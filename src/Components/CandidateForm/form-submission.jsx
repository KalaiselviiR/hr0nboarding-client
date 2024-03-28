import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import "./CandidateForm.css";

function FormSubmissionSuccess() {
  const handleClose = () => {
    if (window.history.length === 1) {
      window.close(); 
    } else {
      window.location.href = 'about:blank'; 
    }
  };

  return (
    <div className="success-container">
      <div className="success-icon">
        <FaCheckCircle />
      </div>
      <h2>Form Submitted Successfully!</h2>
      <p>Thank you for submitting the form. Your data has been successfully received.</p>
      <div className="success-actions">
        <button onClick={handleClose} className="btn btn-success">Close</button>
      </div>
    </div>
  );
}

export default FormSubmissionSuccess;


