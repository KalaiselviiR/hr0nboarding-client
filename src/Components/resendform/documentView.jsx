import React from "react";
import { Form, Image } from "react-bootstrap";
import pdf from "../../assets/pdf-image.jpeg"
import jpg from "../../assets/jpg-image.jpg"

function CandidateFileView({ label, file,name,size }) {
  
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {file && (
         <a href={file} target="pdf-frame" style={{textDecoration:"none",color:"black"}}>
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
              src={name.toLowerCase() === "photo.jpg" ? jpg : pdf}
              alt="PDF"
              width="40px"
              height="50px"
            />
          
          </div>
          <div className="file-info">
         
            <p style={{ margin: "0" }}>{name}</p>
            <p style={{ margin: "0", fontSize: "10px" }}>
              {(size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
        </a>
      )}
    </Form.Group>
  );
}

export default CandidateFileView;
