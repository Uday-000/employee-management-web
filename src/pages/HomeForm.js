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
export const HomeFrom = () => {
  const [data, setData] = useState([]);
  const [name, setname] = useState(null);
  const [password, setpassword] = useState(null);
  const [email, setemail] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [id, setid] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(
    "Marketing Department"
  );
  const [yourImageFile, setYourImageFile] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const nav = useNavigate();

  const handleClose = () => {
    setShowUpdateModal(false);
    setShowDeleteConfirmation(false);
    setShowPassword(false); // Reset password visibility when closing modal
  };
  const handleShow = () => setShowUpdateModal(true);

  useEffect(() => {
    // Fetch department names
    axios
      .get("http://localhost:8080/departments")
      .then((response) => {
        setDepartmentNames(response.data);

        axios
          .get(
            `http://localhost:8080/findUsers?serachTerm=${searchTerm}&departmentName=${selectedDepartment}`
          )
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
    let url = `http://localhost:8080/updateUser/${id}`;
    const formData = new FormData();
    formData.append("updatedUserName", name);
    formData.append("updatedPassword", password);
    formData.append("updatedEmail", email);
    formData.append("file", yourImageFile);

    axios
      .put(url, formData)
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

  return (
    <div className="container">
      <h3 className="text"> {selectedDepartment} Users</h3>

      <DepartmentButtons
        departmentNames={departmentNames}
        handleDepartmentClick={handleDepartmentClick}
      />

      <div className="mainBody">
        <div style={{ marginRight: "-38%" }}>
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

        {selectedDepartment && (
          <UserTable
            data={data}
            handleSortAscending={handleSortAscending}
            deleteUser={deleteUser}
            handleShow={handleShow}
            setid={setid}
            setemail={setemail}
            setname={setname}
            setpassword={setpassword}
            setYourImageFile={setYourImageFile}
            selectedDepartment={selectedDepartment}
          />
        )}
        <center></center>
      </div>

      <UpdateUserModal
        showUpdateModal={showUpdateModal}
        handleClose={handleClose}
        updateUser={updateUser}
        id={id}
        email={email}
        name={name}
        password={password}
        setemail={setemail}
        setname={setname}
        setpassword={setpassword}
        setYourImageFile={setYourImageFile}
        showPassword={showPassword}
      />

      <DeleteConfirmationModal
        showDeleteConfirmation={showDeleteConfirmation}
        handleClose={handleClose}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />
    </div>
  );
};
