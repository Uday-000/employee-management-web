import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./../styles/LoginForm.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../actions/userAction";
import RegistrationForm from "../componet/RegistrationForm";
// import RegistrationForm from "../componet/RegistrationForm";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [isRegistrationMode, setRegistrationMode] = useState(false);
  const [password, setPassword] = useState("");

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter both Email and Password");
      return;
    }

    axios
      .post(
        `http://localhost:8080/employeeManagement/userLogin?email=${email}&password=${password}`
      )
      .then((response) => {
        const userDetails = response.data;
        localStorage.setItem("userEmail", email);
        dispatch(setUserDetails(userDetails));

        nav("/Home");
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid email or password");
        console.error(error);
      });
  };



  return (
    <div>
      <div>
        {isRegistrationMode ? (
          <RegistrationForm setRegistrationMode={setRegistrationMode} />
        ) : (
          <div className="loginBody">
            <Form className="login-box">
              <Form.Group className="md=3 inputfielduse">
                <Form.Label> Email </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter Email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="md=3 inputfielduse">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <center>
                <Button onClick={handleLogin}>Login</Button>
                <Link>
                  {/* <p onClick={handleToggleMode} style={{ marginTop: "10px" }}>
                    Click here for registration
                  </p> */}
                </Link>
              </center>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
