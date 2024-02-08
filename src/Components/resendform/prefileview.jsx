import React from "react";
import { Form, Image } from "react-bootstrap";
import pdf from "../../assets/pdf-image.jpeg"
import jpg from "../../assets/jpg-image.jpg"

function PreFileView({  prefile,prename,presize }) {
  
  return (
    <Form.Group className="mb-3">
      {/* <Form.Label>{label}</Form.Label> */}
      {prefile && (
         <a href={prefile} target="pdf-frame" style={{textDecoration:"none",color:"black"}}>
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
              src={prename.toLowerCase() === "photo.jpg" ? jpg : pdf}
              alt="PDF"
              width="40px"
              height="50px"
            />
          
          </div>
          <div className="file-info">
         
            <p style={{ margin: "0" }}>{prename}</p>
            <p style={{ margin: "0", fontSize: "10px" }}>
              {(presize / 1024)} kb
            </p>
          </div>
        </div>
        </a>
      )}
    </Form.Group>
  );
}

export default PreFileView;