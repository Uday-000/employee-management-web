import React, { } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const DepartmentButtons = ({
  departmentNames,
  handleDepartmentClick,
  selectedDepartment,
  setSelectedDepartment,
  data,
}) => {

  // const [selectedDepartment, setSelectedDepartment] = useState("");
  
  
  
  
  const handleButtonClick = (departmentName) => {
    setSelectedDepartment(departmentName);
    handleDepartmentClick(departmentName);
  };
  

  const userDetails = useSelector((state) => state.user.userDetails);

  const sortedDepartments =
    userDetails.role === "user"
      ? departmentNames.filter((department)=>department !== "Administrative")
      : departmentNames.sort();
  


  return (
    <div
      className="department-row"
      style={{ padding: "1%", backgroundColor: "#bdd1ec" }}
    >
      {sortedDepartments.map((departmentName) => (
        // (data.role === "admin" || departmentName !== "Administrative") && (
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
        // )
      ))}
    </div>
  );
};

export default DepartmentButtons;
