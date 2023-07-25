import React, { useEffect, useState } from "react";
import Extra from "./Extra";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import SideMenu from "./SideMenu";
import Userposts from "./Userposts";
import Button from "@mui/material/Button";

const Userprofile = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const getUserDetails = async () => {
    const response = await axios.get("http://localhost:5050/followcount", {
      withCredentials: true,
    });
    setUser(response.data.results);
    setFollowers(response.data.followers);
    setFollowing(response.data.following);
  };
  const getFollowing = async () => {
    // pass two states to the following page, user and function
    navigate("/home/following", {
      state: { user: following },
    });
  };
  const getFollowers = async () => {
    navigate("/home/followers", { state: { user: followers } });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="Userprofile-component">
      {User.map((user) => {
        return (
          <section className="Userprofile-component">
            <div className="profile-top">
              <div className="profile-edit">
                <div className="right">
                  <Avatar src={user.profile_picture} />
                  <p>{user.full_name}</p>
                  <p>@{user.following_count}</p>
                </div>
              </div>
              <div className="user-details">
                <p>{user.bio}</p>
              </div>
              <div className="analytics">
                <p onClick={getFollowing}>
                  <span className="counts">{user.following_count}</span>
                  <span className="title">Following</span>
                </p>
                <p onClick={getFollowers}>
                  <span className="counts">{user.followers_count}</span>
                  <span className="title">Followers</span>
                </p>
              </div>
            </div>
            <hr />
            <Userposts />
          </section>
        );
      })}
    </div>
  );
};

export default Userprofile;
