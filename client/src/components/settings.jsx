import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const editProfile = () => {
    navigate("/home/editprofile");
  };
  const changePassword = () => {
    navigate("/home/changepassword");
  };
  return (
    <div className="setting-component">
      <ul>
        <li onClick={editProfile}>Edit profile</li>
        <li onClick={changePassword}>Change Password</li>
      </ul>
    </div>
  );
};

export default Settings;
