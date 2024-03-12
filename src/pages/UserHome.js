import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./../styles/UserHome.css";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserDetails from "../componet/UserComponent/UserDetails";

function UserHome() {
  const userDetails = useSelector((state) => state.user.userDetails);

  const [showUserDetails, setShowUserDetails] = useState(false);

  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  const handleProfileClick = () => {
    setShowUserDetails(true);
  };

  return (
    <div className="main">
      <div className=" container-fluid mt-3  profilePic">
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="transparent" id="dropdown-basic">
            <img
              style={{ width: "80px", marginLeft: "60px" }}
              src={`data:image/jpeg;base64,${userDetails.image}`}
              alt=""
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>


      {showUserDetails && (
      <div>
        <UserDetails  user={userDetails} />
      </div>
      )}
    </div>
  );
}

export default UserHome;
