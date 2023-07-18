import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideMenu from "./SideMenu";
import Extra from "./Extra";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const results = await axios.get("http://localhost:5000/logout", {
      withCredentials: true,
    });
    console.log(results);
    if (results.data.success) {
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };
  const handleCancel = async () => {
    navigate("/home");
  };
  return (
    <div className="Home-component">
      <SideMenu />
      <div className="logout-component">
        <h1>Logout of SocialVerse</h1>
        <p>
          Are you sure you want to log out of your account? <br />
          You will be able to log back in whenever you want.
        </p>
        <button onClick={handleLogout}>Log out</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      <Extra />
    </div>
  );
};

export default Logout;
