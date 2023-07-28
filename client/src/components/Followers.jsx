import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Followers = () => {
  const location = useLocation();
  const { user } = location.state;
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="following-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      {user.map((user) => {
        return (
          <div className="following-user">
            <div className="user-details">
              <div className="profile-picture">
                <Avatar src={user.profile_picture} alt="" />
              </div>
              <div className="user-info">
                <p className="full-name">{user.full_name}</p>
                <p className="username">@{user.username}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Followers;
