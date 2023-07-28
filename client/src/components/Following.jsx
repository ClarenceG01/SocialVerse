import React from "react";
import { useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Following = () => {
  const location = useLocation();
  const { user } = location.state;
  const { getUserDetails } = location.state;
  console.log(user);
  console.log(getUserDetails);
  const unfollow = async (user_id) => {
    const response = await axios.get(
      `http://localhost:5050/unfollowuser/${user_id}`,
      { withCredentials: true }
    );
    console.log(response.data.message);
    if (response.data.message === "User unfollowed") {
      toast.success("User unfollowed");
    }
  };
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
            <div className="follow-button">
              <Button
                onClick={() => {
                  unfollow(user.user_id);
                }}
              >
                Unfollow
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Following;
