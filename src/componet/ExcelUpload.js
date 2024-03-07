import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class ExcelUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
    };
  }

  handleFileUpload = (e) => {
    const file = e.target.files[0];
    this.setState({ selectedFile: file });
  };

  uploadExcelDocument = () => {
    const { selectedFile } = this.state;

    if (!selectedFile) {
      alert("Please select an Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:8080/upload", formData) // Adjust the endpoint based on your backend
      .then((response) => {
        alert("Excel document uploaded successfully");
        // Optionally, you can refresh your data or take any other action.
      })
      .catch((error) => {
        if(error.response.data.errorcode === 700){
          alert(error.response.data.message)
        }
      });
  };
  render() {
    return(

    <div className="uploadComponent">
      <h3 style={{marginTop:"30px"}}>Excel Upload</h3>
      <input
        type="file"
        onChange={this.handleFileUpload}
        accept=".xlsx, .xls" style={{marginTop:"30px",marginLeft:"110px"}}
      />
      <br />
      <Button variant="outline-info" outline onClick={this.uploadExcelDocument} style={{marginTop:"30px"}}>Upload Excel</Button>
    </div>
  )}
}
