// RegistrationPage.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../styles/LoginForm.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { registerActions } from "../actions/registerActions";
import axios from "axios";

function RegistrationForm({setRegistrationMode}) {
  const [department, setDepartment] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const nav = useNavigate();
  // const dispatch=useDispatch();

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    let url = `http://localhost:8080/employeeManagement/registerUser/${department}`;
    axios
      .post(url, userDetails)
      .then((response) => {
        if (response.status === 200) {
          alert("register success");
          // setRegistrationMode(false);
          
          nav('/Home')
        }
      })
      .catch((error) => {
        console.log(error)
        
      });
  };
  const handleCancelClick = () => {
    nav("/Home");
  };

  return (
    <div className="loginBody">
      <Form onSubmit={handleRegistrationSubmit} className="login-box">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            placeholder="Enter Username"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter Address"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>phoneNumber</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            placeholder="Enter phoneNumber"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            required
             onChange={(e)=>setDepartment(e.target.value)}
          >
            <option value="" disabled>
              Select Department
            </option>
            <option value="Marketing Department">Marketing Department</option>
            <option value="IT Department">IT Department</option>
            <option value="Sales Department">Sales Department</option>
            <option value="Finance Department">Finance Department</option>
            <option value="HR Department">HR Department</option>

            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        <center
          className="mt-4 d-flex "
          style={{ justifyContent: "space-evenly" }}
        >
          <Button
            style={{ width: "30%" }}
            className="btn-danger"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
          <Button style={{ width: "30%" }} type="submit">
            Register
          </Button>
        </center>
      </Form>
    </div>
  );
}

export default RegistrationForm;
