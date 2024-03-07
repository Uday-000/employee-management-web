// RegistrationPage.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './../styles/LoginForm.css'
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerActions } from "../actions/registerActions";

function RegistrationForm (departmentNames) {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [department, setDepartment] = useState("");
  const [userdetails, setUserDetails] = useState({
    username:"",
    password:"",
    email:"",
    department:""
  })
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUserDetails({
      ...userdetails,
      [name]:value
    });


  }

  const nav = useNavigate();
  const dispatch=useDispatch();
 
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    dispatch(registerActions(userdetails))
  //   axios
  //     .post(`http://localhost:8080/register?departmentName=${userdetails.department}`, {
  //       userName: userdetails.username,
  //       password: userdetails.password,
  //       email: userdetails.email,
  //     })
      .then((response) => {
        if (response.status === 200) {
          console.log("Registration success");
          alert("register success")
          nav('/Home')
          
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      })

    
  };
  const handleCancelClick=()=>{
    nav('/Home')

  }

 
  return (
    <div className="loginBody" >
      <Form onSubmit={handleRegistrationSubmit} className="login-box">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={userdetails.username}
            placeholder="Enter Username"
            required
            onChange={(e) => setUserDetails(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
           type="password"
            value={userdetails.password}
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
          
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={userdetails.email}
            placeholder="Enter Email"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            value={userdetails.department}
            required
            onChange={handleChange}
          >
            <option value="" disabled>Select Department</option>
            <option value="Marketing Department">Marketing Department</option>
            <option value="IT Department">IT Department</option>
            <option value="Sales Department">Sales Department</option>
            <option value="Finance Department">Finance Department</option>
            <option value="HR Department">HR Department</option>
            
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>
        
        <center className="mt-4 d-flex " style={{justifyContent:'space-evenly'}}  >
          
        <Button style={{width:'30%'}} className="btn-danger" onClick={handleCancelClick}>Cancel</Button>
          <Button style={{width:'30%'}} type="submit">Register</Button>

        </center>
      </Form>
    </div>
  );
}

export default RegistrationForm;
