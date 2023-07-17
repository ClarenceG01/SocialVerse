import React, { useEffect, useState } from "react";
import Extra from "./Extra";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@material-ui/core";
import axios from "axios";
import SideMenu from "./SideMenu";
import Userposts from "./Userposts";

const Userprofile = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  const getUserDetails = async () => {
    const response = await axios.get("http://localhost:5050/followcount", {
      withCredentials: true,
    });
    console.log(response.data);
    setUser(response.data.results);
  };
  const getFollowing = async () => {
    navigate("/following");
  };
  const getFollowers = async () => {
    navigate("/followers");
  };
  const editProfile = async () => {
    navigate("/editprofile");
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="Home-component">
      <SideMenu />
      {User.map((user) => {
        return (
          <section className="Userprofile-component">
            <div className="profile-top">
              <div className="profile-edit">
                <div className="right">
                  <Avatar src={user.profile_picture} />
                  <p>{user.full_name}</p>
                  <p>@{user.username}</p>
                </div>
                <button onClick={editProfile}>Edit Profile</button>
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
      <Extra />
    </div>
  );
};

export default Userprofile;
