import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './../styles/Header.css'

function Header() {
  const userDetails = useSelector((state) => state.user.userDetails);
  const nav = useNavigate();

  const handleClick = (event) => {
    nav("/userProfile");
  };

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div>
      <div className="main">
        
        <Dropdown className="mainheader">
        <div className="roleHeader" >
          <h3 style={{textAlign:"center" ,marginLeft:"600px",paddingTop:"20px" }} >Employee Management </h3>
        </div>
          <Dropdown.Toggle variant="light" id="" className="">
            <div className="profilepic">
              {userDetails.image ? (
                <img
                  className="image"
                  src={`data:image/jpeg;base64,${userDetails.image}`}
                  alt="📷"
                  onClick={handleClick}
                />
              ) : (
                <div
                  className=""
                  style={{ fontSize: "24px", lineHeight: "50px" }}
                  onClick={handleClick}
                >
                  📷
                </div>
              )}
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu drop="right">
            <Dropdown.Item onClick={() => nav("/userProfile")}>
              User Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div
          style={{
            marginLeft: "10px",
            fontSize: "30px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "end",
          }}
        >
          {/* <IoIosLogOut onClick={handleLogout} /> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
