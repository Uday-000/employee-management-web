import axios from "axios";
import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./../styles/HomeForm.css";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../componet/SearchBar";
import UpdateUserModal from "../componet/UpdateUserModal";
import DeleteConfirmationModal from "../componet/DeleteConfirmationModal";
import DepartmentButtons from "../componet/DepartmentButtons";
import UserTable from "../componet/UserTable";

import TicketDetails from "../componet/TicketComponent/TicketDetails";

import Header from "./Header";
import { useSelector } from "react-redux";

export const HomeFrom = () => {
  const [data, setData] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setid] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchInput, setSearchInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const userDetails1 = useSelector((state) => state.user.userDetails);
  // const tickets = useSelector((state) => state.ticket.ticketDetails);

 

  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const nav = useNavigate();

  const handleClose = () => {
    setShowUpdateModal(false);
    setShowDeleteConfirmation(false);
    setShowPassword(false);
  };
  const handleShow = (user) => {
    setUserDetails({
      userName: user.userName,
      password: user.password,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
    setid(user.userId);
    setShowUpdateModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/employeeManagement/departments")
      .then((response) => {
        setDepartmentNames(response.data);
      })
      .catch((error) => {
        if (error.response.data.errorcode === 700) {
          alert(error.response.data.message);
          console.log(error);
        }
      });
  }, []);

  useEffect(() => {
    if(userDetails1.role==="admin"){
    axios
      .get(`http://localhost:8080/employeeManagement/findUsers?serachTerm=${searchTerm}`)
      .then((response) => {
        setData(response.data);
        setRefresh(true);
      })
      .catch((error) => {
        if (error.response.data.errorcode === 700) {
          alert(error.response.data.message);
          console.log(error);
        }
      });
    }
  }, [refresh, searchTerm,userDetails1]);

  

  const deleteUser = (userId) => {
    setUserToDeleteId(userId);
    setShowDeleteConfirmation(true);
  };

  useEffect(() => {
    if (userDetails1.role === "admin") {
      setSelectedDepartment("Administrative");
    } else if (userDetails1.role === "user") {
      setSelectedDepartment(userDetails1.departmentDto.departmentName);
    }
  }, [userDetails1]);

  const handleDeleteConfirmation = () => {
    axios
      .delete(`http://localhost:8080/employeeManagement/deleteuser/${userToDeleteId}`)
      .then((res) => {
        if (res.status === 200) {
          //  alert("deleted successfully");
          setRefresh(!refresh);
          setShowDeleteConfirmation(false); // Close the confirmation modal
        }
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const updateUser = () => {
    let url = `http://localhost:8080/employeeManagement/updateUesrDetails/${id}`;
    axios
      .put(url, userDetails)
      .then((res) => {
        if (res.status === 200) {
          alert("Updated successfully");
          handleClose();
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        if (error.response.data.errorcode === 700) {
          alert(error.response.data.message);
        } else {
          alert(error.response.data);
        }
      });
  };

  const handleSortAscending = (sortOrder, sortBy) => {
    axios
      .get(
        `http://localhost:8080/sortUsers?sortOrder=${sortOrder}&sortBy=${sortBy}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleDepartmentClick = (departmentName) => {
    setSelectedDepartment(departmentName);
    setSearchTerm("");
    setSearchInput("");
  };
  const handleButtonClick = () => {
    nav("/upload");
  };

  const handleAddClick = () => {
    nav("/Registration");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (
    <>
      <Header />

      <div className="home-container">
        <div className="bodymain">
          <DepartmentButtons
            departmentNames={departmentNames}
            handleDepartmentClick={handleDepartmentClick}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />

          <div className="mainBody">
            <div style={{ marginRight: "-38%" }}>
              {selectedDepartment === "Administrative" && (
                <div>
                  <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    searchTerm={searchTerm}
                  />
                  <div>
                    <Button onClick={handleButtonClick} id="adduserbutton1">
                      Upload Users
                    </Button>

                    <Button
                      type="button"
                      onClick={handleAddClick}
                      id="adduserbutton"
                    >
                      Add User
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {selectedDepartment === "Administrative" ? (
              <UserTable
                data={data}
                handleSortAscending={handleSortAscending}
                deleteUser={deleteUser}
                handleShow={handleShow}
                setid={setid}
                selectedDepartment={selectedDepartment}
                setRefresh={setRefresh}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            ) : (
              <div>
                <TicketDetails
                  selectedDepartment={selectedDepartment}
                  setSearchTerm={setSearchTerm}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  searchTerm={searchTerm}
                  setRefresh={setRefresh}
                  refresh={refresh}
                 
                />
              </div>
            )}
            <center></center>
          </div>

          <UpdateUserModal
            showUpdateModal={showUpdateModal}
            handleClose={handleClose}
            updateUser={updateUser}
            id={id}

            showPassword={showPassword}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            handleChange={handleChange}
          />

          <DeleteConfirmationModal
            showDeleteConfirmation={showDeleteConfirmation}
            handleClose={handleClose}
            handleDeleteConfirmation={handleDeleteConfirmation}
          />
        </div>
      </div>
    </>
  );
};
