import { Button, Form, Image, ProgressBar } from "react-bootstrap";
import React, { useRef, useState } from "react";

function FileUpload({ label }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null); // New state for validation error
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Add your custom validation logic here
    if (!selectedFile) {
      setError("Please select a file");
    } else if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed");
    } else {
      setError(null);
      setFile(selectedFile);
      console.log(selectedFile)
      uploadFile(selectedFile);
    }
  };

  const handleFileClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const uploadFile = (file) => {
    // Simulate file upload
    const totalSize = file.size;
    let uploadedSize = 0;

    const interval = setInterval(() => {
      uploadedSize += totalSize / 10; // Simulating 10% progress increments
      console.log(uploadedSize)
      // The Math.min function is used to find the minimum value between currentProgress and 100.
      const currentProgress = Math.min((uploadedSize / totalSize) * 100, 100); // Ensure progress doesn't exceed 100%
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Ensure progress is exactly 100% to trigger rendering of the bottom container
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
              variant="violet"
              style={{ marginBottom: "10px" }}
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
                <p style={{ margin: "0" }}>{file.name}</p>
                <p style={{ margin: "0", fontSize: "10px" }}>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Form.Group>
  );
}

export default FileUpload;