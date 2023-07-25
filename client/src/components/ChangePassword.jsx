import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");

  const handleOldPassword = (e) => {
    setoldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPassword = (e) => {
    setconfirmNewPassword(e.target.value);
  };
  const updatePassword = async (e) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        toast.error("New password does not match");
      } else {
        const response = await axios.post(
          "http://localhost:5050/updatepassword",
          { old_password: oldPassword, new_password: newPassword },
          { withCredentials: true }
        );
        let message = response.data.message;
        console.log(message);
        if (message === "Password Updated") {
          toast.success("Password updated successfully");
        } else {
          toast.error("Password not updated");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="changepassword-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <h1>Change password</h1>
      <form className="changepwd-form">
        <input
          type="password"
          placeholder="Old password"
          value={oldPassword}
          onChange={handleOldPassword}
        />
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={handleNewPassword}
        />
        <input
          type="password"
          placeholder="Confirm New password"
          value={confirmNewPassword}
          onChange={handleConfirmNewPassword}
        />
        <Button variant="contained" type="submit" onClick={updatePassword}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
