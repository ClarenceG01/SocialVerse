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
              <Avatar src={user.profile_picture} />
              <Button>EDIT PROFILE</Button>
            </div>
            <div>
              <p>{user.fullname}</p>
              <p>{user.username}</p>
              <p>{user.bio}</p>
            </div>
            <div>
              <p onClick={getFollowing}> Following{user.following_count}</p>
              <p onClick={getFollowers}>Followers{user.followers_count}</p>
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
