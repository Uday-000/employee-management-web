import React, {  } from "react";
import { useSelector } from "react-redux";
import "./../styles/UserHome.css";
import { useNavigate } from "react-router-dom";
import UserDetails from "../componet/UserComponent/UserDetails";
import { IoIosLogOut } from "react-icons/io";

function UserHome() {
  const userDetails = useSelector((state) => state.user.userDetails);

  // const [showUserDetails, setShowUserDetails] = useState(true);

  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <div>
    <div className=" header navBar mt-3 " >
    <p style={{fontSize:"30px",marginTop:"20px",display:"flex",justifyContent:"flex-end",alignItems:"end",marginLeft:"95%"}}><IoIosLogOut onClick={handleLogout}/></p>
    </div>
    <div className="main-content">
     
      <div>
        <UserDetails user={userDetails}></UserDetails>
      </div>
    </div>
    </div>
  );
}

export default UserHome;
