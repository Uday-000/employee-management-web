import React, { useState } from "react";
import { Button } from "react-bootstrap";

const DepartmentButtons = ({ departmentNames, handleDepartmentClick }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleButtonClick = (departmentName) => {
    setSelectedDepartment(departmentName);
    handleDepartmentClick(departmentName);
  };
  return (
    <div
      className="department-row"
      style={{ padding: "1%", backgroundColor: "#bdd1ec" }}
    >
      {departmentNames.map((departmentName) => (
        <Button
          className="buttonStyle"
          key={departmentName}
          onClick={() => handleButtonClick(departmentName)}
          variant={
            selectedDepartment === departmentName
              ? "secondary"
              : "outline-secondary"
          }
          style={{ border: "none" }}
        >
          <h5> {departmentName}</h5>
        </Button>
      ))}
    </div>
  );
};

export default DepartmentButtons;
