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
import { IoIosLogOut } from "react-icons/io";
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
  // const [yourImageFile, setYourImageFile] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      .get("http://localhost:8080/departments")
      .then((response) => {
        setDepartmentNames(response.data);

        axios
          .get(`http://localhost:8080/findUsers?serachTerm=${searchTerm}`)
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
      })
      .catch((error) => {
        if (error.response.data.errorcode === 700) {
          alert(error.response.data.message);
          console.log(error);
        }
      });
  }, [selectedDepartment, refresh, searchTerm]);

  const deleteUser = (userId) => {
    setUserToDeleteId(userId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    axios
      .delete(`http://localhost:8080/deleteuser/${userToDeleteId}`)
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
    let url = `http://localhost:8080/updateUesrDetails/${id}`;
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
        `http://localhost:8080/sortUsers?sortOrder=${sortOrder}&departmentName=${selectedDepartment}&sortBy=${sortBy}`
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
    nav("/uploadFile");
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
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div className="container">
      <div>
        <p
          style={{
            fontSize: "30px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
            marginLeft: "95%",
          }}
        >
          <IoIosLogOut onClick={handleLogout} />
        </p>
      </div>
      <DepartmentButtons
        departmentNames={departmentNames}
        handleDepartmentClick={handleDepartmentClick}
      />
      

      
      <div className="mainBody">
        <div style={{ marginRight: "-38%" }}>
          {selectedDepartment==="Administrative" && (
          <div>
          <SearchBar
            setSearchTerm={setSearchTerm}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <div>
            <Button onClick={handleButtonClick} id="adduserbutton1">
              Upload Document
            </Button>

            <Button type="button" onClick={handleAddClick} id="adduserbutton">
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
          <div> fghbnj </div>
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
  );
};
