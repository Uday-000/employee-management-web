import React from "react";
import { Button } from "react-bootstrap";

const DepartmentButtons = ({ departmentNames, handleDepartmentClick }) => {
  return (
    <div className="department-row" style={{ padding: "1%", backgroundColor: "#bdd1ec" }}>
      {departmentNames.map((departmentName) => (
        <Button
          variant="outline-secondary"
          className="buttonStyle"
          key={departmentName}
          onClick={() => handleDepartmentClick(departmentName)}
          style={{ border: "none" }}
        >
          <h5> {departmentName}</h5>
        </Button>
      ))}
    </div>
  );
};

export default DepartmentButtons;