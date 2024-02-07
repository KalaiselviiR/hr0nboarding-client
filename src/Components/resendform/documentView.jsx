import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Image, ProgressBar } from "react-bootstrap";
import "../CandidateForm/CandidateForm.css"
import tick from "../../assets/tick.avif";
import pdf from "../../assets/pdf-image.jpeg";
import png from "../../assets/png-image.png";
//file upload
// import axios from "axios";
// import { pdfjs } from "react-pdf";
// import PdfComp from "./PdfComp";

// FileUpload component for handling file upload
function CandidateFileView({ label, instruction, onFileChange, acceptedFiles, setAcceptedFiles }) {
  // State variables for file, upload progress, and error messages
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  // Reference for file input element
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("Please select a file");
    } else {
      // Check file type for photo
      if (label === "Photo") {
        const allowedPhotoTypes = ["image/jpeg", "image/png"];
        if (!allowedPhotoTypes.includes(selectedFile.type)) {
          setError("Only JPG and PNG files are allowed for photos");
          return;
        }
      } else {
        // For other files (PDF)
        if (selectedFile.type !== "application/pdf") {
          setError("Only PDF files are allowed");
          return;
        }
      }

      setError(null);
      setFile(selectedFile);
      uploadFile(selectedFile);
      onFileChange(selectedFile);
      setAcceptedFiles(selectedFile);
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

  useEffect(() => {
    onFileChange(file);
    setAcceptedFiles(file);
  }, []);

  return (
    <Form.Group className="mb-3">
      <div style={{display:"flex" , flexDirection:"column"}}>
      <Form.Label style={{fontWeight:"500"}}>{label}</Form.Label>
      <Form.Label style={{fontSize:"13px",fontWeight:"480"}}>{instruction}</Form.Label>
      </div>
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
            Reupload
          </Button>
          <input
            type="file"
            accept={label === "Photo" ? ".jpg, .jpeg, .png" : ".pdf"}
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
                <Image src={label === "Photo" ? png : pdf} alt="PDF" width="40px" height="50px" />
              </div>
              <div className="file-info  ">
                <p className="fileName" style={{ margin: "0", marginTop: "10px" }}>{file.name}</p>
                <p style={{ margin: "0", fontSize: "10px", marginTop: "-1px" }}>
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <div className="Bar">
                  <ProgressBar
                    now={progress}
                    label={`${progress}%`}
                    // variant="custom"
                    style={{
                      marginBottom: "10px",
                      height: "10px",
                      width: "250px",
                    }}
                    className="custom-progress-bar "
                  />
                  <img
                    className="TicksImage  "
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                    src={tick}
                  ></img>
                </div>
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
              accept={label === "Photo" ? ".jpg, .jpeg, .png" : ".pdf"}
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

export default CandidateFileView;



































// import React, { useRef, useState } from "react";
// import { Button, Form, Image } from "react-bootstrap";
// import pdf from "../../assets/pdf-image.jpeg"
// import jpg from "../../assets/jpg-image.jpg"

// function CandidateFileView({ label, file,name,size }) {
//   const [reuploadfile, setReUploadFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   // Reference for file input element
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];

//     if (!selectedFile) {
//       setError("Please select a file");
//     } else {
//       // Check file type for photo
//       if (label === "Photo") {
//         const allowedPhotoTypes = ["image/jpeg", "image/png"];
//         if (!allowedPhotoTypes.includes(selectedFile.type)) {
//           setError("Only JPG and PNG files are allowed for photos");
//           return;
//         }
//       } else {
//         // For other files (PDF)
//         if (selectedFile.type !== "application/pdf") {
//           setError("Only PDF files are allowed");
//           return;
//         }
//       }

//       setError(null);
//       setReUploadFile(selectedFile);
//       // uploadFile(selectedFile);
//       // onFileChange(selectedFile);
//       // setAcceptedFiles(selectedFile);
//     }
//   };

//   // Event handler for triggering file input click
//   const handleFileClick = (e) => {
//     e.preventDefault();
//     fileInputRef.current.click();
//   };

//   // Simulates file upload progress
//   const uploadFile = (file) => {
//     const totalSize = file.size;
//     let uploadedSize = 0;
//     // Simulate progress by incrementing uploadedSize
//     const interval = setInterval(() => {
//       uploadedSize += totalSize / 10;
//       const currentProgress = Math.min((uploadedSize / totalSize) * 100, 100);
//       setProgress(currentProgress);
//       // Finish the simulation when progress reaches 100%
//       if (currentProgress >= 100) {
//         clearInterval(interval);
//         setProgress(100);
//       }
//     }, 200);
//   };

//   // useEffect(() => {
//   //   onFileChange(file);
//   //   setAcceptedFiles(file);
//   // }, []);
    
  
//   return (
//     <>
//     <Form.Group className="mb-3">
//       <Form.Label>{label}</Form.Label>
//       {file && (
//          <a href={file} target="pdf-frame" style={{textDecoration:"none",color:"black"}}>
//         <div
//           className="file-container"
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "30px",
//             backgroundColor: "white",
//             boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
//             padding: "10px",
//             borderRadius: "8px",
//             alignItems: "center",
//             height: "70px",
//           }}
//         >
//           <div className="pdf-image" style={{ height: "50px" }}>
           
//             <Image
//               src={name.toLowerCase() === "photo.jpg" ? jpg : pdf}
//               alt="PDF"
//               width="40px"
//               height="50px"
//             />
          
//           </div>
//           <div className="file-info">
         
//             <p style={{ margin: "0" }}>{name}</p>
//             <p style={{ margin: "0", fontSize: "10px" }}>
//               {(size / 1024).toFixed(2)} KB
//             </p>
//           </div>
//         </div>
//         </a>
        
        
//       )}
//     </Form.Group>
//     <div>
//             <Button
//               style={{
//                 height: "35px",
//                 fontSize: "15px",
//                 marginTop: "10px",
//                 backgroundColor: "white",
//                 color: "rgb(147, 48, 233)",
//                 borderColor: "rgb(147, 48, 233)",
//                 fontWeight: "600",
//               }}
//               onClick={handleFileClick}
//             >
//               Reupload
//             </Button>
//             <input
//               type="file"
//               accept={label === "Photo" ? ".jpg, .jpeg, .png" : ".pdf"}
//               ref={fileInputRef}
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />

//             {/* {error && <div className="text-danger">{error}</div>} */}
//           </div>
//     </>
//   );
// }

// export default CandidateFileView;
