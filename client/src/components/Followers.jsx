import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

const Followers = () => {
  const location = useLocation();
  const { user } = location.state;
  const unfollow = () => {
    console.log("unfollow");
  };
  return (
    <div className="followers-component">
      {user.map((user) => {
        return (
          <div className="user">
            <div className="user-details">
              <div className="profile-picture">
                <Avatar src={user.profile_picture} alt="" />
              </div>
              <div className="user-info">
                <p className="full-name">{user.full_name}</p>
                <p className="username">@{user.username}</p>
              </div>
            </div>
            <div className="unfollow-button">
              <button onClick={unfollow}>Follow</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Followers;
