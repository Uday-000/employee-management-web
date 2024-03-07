import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./../styles/LoginForm.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "../componet/RegistrationForm";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState("");
  const [isRegistrationMode, setRegistrationMode] = useState(false);
 

  const nav = useNavigate();

  const generateOtp = () => { 
    if (!email) {
      alert("Please enter your email before generating OTP");
      return;
    }
    axios
      .post(`http://localhost:8080/generateotp/${email}`)
      .then((response) => {
        setOtp(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        if(error.response.data.errorcode === 700){
          alert(error.response.data.message)
          console.log(error)
        }
      });
  };


  const validateOtpHandler = () => {
    if (!email || !validateOtp) {
      alert("Please enter both Email and OTP");
      return;
    }

    // Perform OTP validation logic here
    if (validateOtp.toString() === otp.toString()) {
      console.log("OTP is valid");
      nav("/Home");
      // You can perform additional actions after successful OTP validation here
    } else {
      alert("Invalid OTP");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("success");

  // };

  const handleRegistrationClick = () => {
    setRegistrationMode(true);
  };

  const handleBackToLoginClick = () => {
    setRegistrationMode(false);
  };

  const handleRegistrationSuccess = () => {
    // This function will be called when registration is successful
    // You can define actions to be taken after successful registration here
    setRegistrationMode(false); // Switch back to login mode, for example
  };
  return (
    <div>
      <div>
        {isRegistrationMode ? (
          <RegistrationForm
            onRegistrationSuccess={handleRegistrationSuccess}
            onBackToLoginClick={handleBackToLoginClick}
          />
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
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={validateOtp}
                  placeholder="Enter OTP"
                  onChange={(e) => setValidateOtp(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <center>
                <Button  onClick={generateOtp}>Genereate otp</Button>

                <Button className="ms-3" onClick={validateOtpHandler}>Validate OTP</Button>
                <Link>
                  <p
                    onClick={handleRegistrationClick}
                    style={{ marginTop: "10px" }}
                  >
                    Click here for registration
                  </p>
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
