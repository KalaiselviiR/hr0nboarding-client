import React from "react";
import { Form, Image } from "react-bootstrap";

function RecruiterFileView({ label, file,name,size }) {
  
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      {file && (
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
            <a href={file}>
            <Image
              src="https://th.bing.com/th/id/OIP.qyip0gFDasQiIdcBiJSRiwHaJM?w=158&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="PDF"
              width="40px"
              height="50px"
            />
            </a>
          </div>
          <div className="file-info">
            <p style={{ margin: "0" }}>{name}</p>
            <p style={{ margin: "0", fontSize: "10px" }}>
              {(size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}
    </Form.Group>
  );
}

export default RecruiterFileView;
