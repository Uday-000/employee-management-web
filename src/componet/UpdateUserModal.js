import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const UpdateUserModal = ({
  showUpdateModal,
  handleClose,
  updateUser,
  id,
  email,
  name,
  password,
  setemail,
  setname,
  setpassword,
  setYourImageFile,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setYourImageFile(file);
  };

  return (
    <Modal show={showUpdateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label className="label">Email :</label>
        <br />
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter email"
          className="input"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        />
        <br />
        <label className="label">Username :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="input"
          placeholder="Enter Username"
        />
        <br />

        <label className="label">Profile Picture :</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e)}
        />
        <br />

        <label className="label">Password :</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
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
