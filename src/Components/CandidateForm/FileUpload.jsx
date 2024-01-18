import React, { useRef, useState } from "react";
import { Button, Form, Image, ProgressBar } from "react-bootstrap";
import './CandidateForm.css'

// FileUpload component for handling file upload
function FileUpload({ label }) {
   // State variables for file, upload progress, and error messages
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
    // Reference for file input element
  const fileInputRef = useRef(null);

   // Event handler for file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

      // Check if a file is selected
    if (!selectedFile) {
      setError("Please select a file");
    } else if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
    } else {
      setError(null);
      setFile(selectedFile);
        // Initiate the file upload process
      uploadFile(selectedFile);
    }
  };

   // Event handler for triggering file input click
  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

    // Simulates file upload progress
  const uploadFile = (file) => {
    const totalSize = file.size;
    let uploadedSize = 0;
  // Simulate progress by incrementing uploadedSize
    const interval = setInterval(() => {
      uploadedSize += totalSize / 10;
      const currentProgress = Math.min((uploadedSize / totalSize) * 100, 100);
      setProgress(currentProgress);
  // Finish the simulation when progress reaches 100%
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
      }
    }, 200);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {!file ? (
        <div>
          <Button
            style={{
              height: "35px",
              fontSize: "15px",
              backgroundColor: "white",
              color: "rgb(147, 48, 233)",
              borderColor: "rgb(147, 48, 233)",
              fontWeight: "600",
            }}
            onClick={handleFileClick}
          >
            Upload
          </Button>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
      ) : (
        <div className="file-details">
          {progress < 100 && (
            <ProgressBar
              animated
              now={progress}
              label={`${progress}%`}
              // variant="custom"
              style={{ marginBottom: "10px" }}
              className="custom-progress-bar"
            />
          )}
          {progress === 100 && (
            <div
              className="file-container"
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "30px",
                backgroundColor: "white",
                boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                borderRadius: "8px",
                alignItems: "center",
                height: "70px",
              }}
            >
            
              <div className="pdf-image" style={{ height: "50px" }}>
                <Image
                  src="https://th.bing.com/th/id/OIP.qyip0gFDasQiIdcBiJSRiwHaJM?w=158&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="PDF"
                  width="40px"
                  height="50px"
                />
              </div>
              <div className="file-info">
                <p style={{ margin: "0" }}>{file.name}        
                  <img style={{width:"25px",height:"25px",borderRadius:"50%"}} 
                  src="https://img.freepik.com/premium-vector/check-mark-icon-circle-isolated-green-background-vector-illustration_230920-1405.jpg?w=740">

                  </img> </p>
                <p style={{ margin: "0", fontSize: "10px" }}>
                  {(file.size / 1024).toFixed(2)} KB 
                </p>
      
                <ProgressBar
                
                now={progress}
                label={`${progress}%`}
                // variant="custom"
                style={{ marginBottom: "10px",height:"10px",width:"250px" }}
                className="custom-progress-bar"
              />
              </div>
              
            </div>
            
          )}
          <div>
            <Button
              style={{
                height: "35px",
                fontSize: "15px",
                marginTop: "10px",
                backgroundColor: "white",
                color: "rgb(147, 48, 233)",
                borderColor: "rgb(147, 48, 233)",
                fontWeight: "600",
              }}
              onClick={handleFileClick}
            >
              Upload
            </Button>
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {error && <div className="text-danger">{error}</div>}
          </div>
        </div>
      )}
    </Form.Group>
  );
}

export default FileUpload;
