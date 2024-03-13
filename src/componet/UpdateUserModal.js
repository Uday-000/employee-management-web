import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateUserModal = ({
  showUpdateModal,
  handleClose,
  updateUser,
  id,
  setYourImageFile,
  userDetails,
  setUserDetails,
  handleChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { userName, password, email, address, phoneNumber } = userDetails;

  return (
    <Modal show={showUpdateModal} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="label">Email :</label>
        <br />
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter email"
          className="input"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        />
        <br />
        <label className="label">Username :</label>
        <input
          type="text"
          name="userName"
          value={userName}
          onChange={handleChange}
          className="input"
          placeholder="Enter Username"
        />
        <br />

        <label className="label">address :</label>
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={address}
          className="input"
          placeholder="Enter address"
        />

        <br />

        <label className="label">phoneNumber :</label>
        <input
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          className="input"
          placeholder="Enter phoneNumber"
        />

        <br />

        <label className="label">Password :</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
            className="input"
          />
          <button
            type="button"
            className="show-password-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️"}
          </button>
        </div>
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="primary" onClick={updateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateUserModal;
