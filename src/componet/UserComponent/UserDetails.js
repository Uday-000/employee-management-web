import React from "react";
import "./../../styles/UserDetails.css";
function UserDetails({ user }) {
  console.log(user);
  return (
    <div className=" container-fluid main-content  ">
      <div className="contentBorder">
        <h4> UserDetails </h4>
      </div>

      <div className="row mt-3 p-4 details ">
        <div className="col-md-4">
          <p>Name:</p>
          <p>Email:</p>
          <p>Address:</p>
          <p>phoneNumber:</p>
          <p>Department:</p>
        </div>
        <div className="col-md-4">
          <p>{user.userName || "N/A"}</p>
          <p>{user.email || "N/A"}</p>
          <p>{user.address || "N/A"}</p>
          <p>{user.phoneNumber || "N/A"}</p>
          <p>
            {user.departmentDto ? user.departmentDto.departmentName : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
