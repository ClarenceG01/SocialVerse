import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
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
      navigate("/land/login");
    }
  };
  const handleCancel = async () => {
    navigate("/home");
  };
  return (
    <div className="logout-component">
      <h1>Logout of SocialVerse</h1>
      <p>
        Are you sure you want to log out of your account? <br />
        You will be able to log back in whenever you want.
      </p>
      <Button className="logout-btn" variant="outlined" onClick={handleLogout}>
        Log out
      </Button>
      <Button className="cancel-btn" variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default Logout;
