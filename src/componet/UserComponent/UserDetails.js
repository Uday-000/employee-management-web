import React, { useState } from "react";
import "./../../styles/UserDetails.css";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import UpdateUserModal from "../UpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../actions/userAction";

function UserDetails() {
  const userDetails = useSelector((state) => state.user.userDetails);
  console.log(userDetails);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userDetails1, setUserDetails1] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();

  const handleUpdateClick = () => {
    
    setUserDetails1({
      userName: userDetails.userName || "",
      email: userDetails.email || "",
      address: userDetails.address || "",
      phoneNumber: userDetails.phoneNumber || "",
      password: userDetails.password || "",
    });

    setShowUpdateModal(true);
  };

  const handleClose = () => {
    setShowUpdateModal(false);
  };

  const updateUser = () => {
    let url = `http://localhost:8080/updateUesrDetails/${userDetails.userId}`;
    axios
      .put(url, userDetails1)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(setUserDetails(res.data));
          alert("Updated successfully");
          handleClose();
        }
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errorcode === 700
        ) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred during the update.");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails1((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  return (
    <div className="p-5">
      <h4 style={{ textAlign: "center" }}>User Info</h4>
      <div className="displayUser">
        <div>
          <Table
            striped
            bordered
            className="table1 mt-3 details"
            style={{ width: "800px", marginLeft: "240px" }}
          >
            <tbody>
              <tr>
                <td className="label">Name:</td>
                <td>{userDetails.userName || "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Email:</td>
                <td>{userDetails.email || "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Address:</td>
                <td>{userDetails.address || "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Phone Number:</td>
                <td>{userDetails.phoneNumber || "N/A"}</td>
              </tr>
              <tr>
                <td className="label">Department:</td>
                <td>
                  {userDetails.departmentDto
                    ? userDetails.departmentDto.departmentName
                    : "N/A"}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="profilePic">
          <img
            style={{
              borderRadius: "50%",
            }}
            src={`data:image/jpeg;base64,${userDetails.image}`}
            alt=""
          />
        </div>
      </div>

      <center>
        <Button className="mt-3" onClick={handleUpdateClick}>
          Update
        </Button>

        <UpdateUserModal
          showUpdateModal={showUpdateModal}
          handleClose={handleClose}
          updateUser={updateUser}
          userDetails={userDetails1}
          setUserDetails={setUserDetails1}
          setShowUpdateModal={setShowUpdateModal}
          handleChange={handleChange}
        />
      </center>
    </div>
  );
}

export default UserDetails;
