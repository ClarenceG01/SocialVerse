import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Settings = () => {
  const navigate = useNavigate();
  const editProfile = () => {
    navigate("/home/editprofile");
  };
  const ChangePassword = () => {
    navigate("/home/changepassword");
  };
  const deleteAccount = () => {
    navigate("/home/deleteaccount");
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="setting-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <ul className="all-settings">
        <li onClick={editProfile}>
          <span>Edit profile</span>
        </li>
        <li onClick={ChangePassword}>
          <span>Update Password</span>
        </li>
        <li onClick={deleteAccount}>
          <span>Delete Account</span>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
