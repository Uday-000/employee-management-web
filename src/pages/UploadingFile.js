import React, { Component } from "react";
import { Button } from "react-bootstrap";

import "./../styles/UploadingFile.css";
import ExcelUpload from "../componet/ExcelUpload";
import XmlUpload from "../componet/XmlUpload";
export default class UploadingFile extends Component {
  state = {
    uploadType: null,
  };

  handleUploadType = (type) => {
    this.setState({ uploadType: type });
  };

  render() {
    const{uploadType}=this.state
    return (
      <div className="uploadDocument" >
       
        
        <div className="uploadFileBorder" style={{border:"1px solid black",height:"50vh",width:"500px"}}>
          <h2>File Upload</h2>
          <div className="header" style={{marginTop:"40px"}}>
          <Button variant="outline-warning" outline onClick={() => this.handleUploadType("excel")} style={{marginRight:"50px"}}>
            Upload Excel
          </Button>
          <Button variant="outline-danger" onClick={() => this.handleUploadType("xml")}>
            Upload XML
          </Button>
          </div>
           {uploadType === "excel" && <ExcelUpload />} 
           {uploadType === "xml" && <XmlUpload />} 
        
        </div>
      </div>
    );
  }
}
