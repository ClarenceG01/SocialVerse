import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import Feed from "./Feed";
import Extra from "./Extra";
import Logout from "./logout";
import Userprofile from "./Userprofile";
import PostComments from "./PostComments";
import Followers from "./Followers";
import Following from "./Following";
import EditProfile from "./EditProfile";

const Home = () => {
  return (
    <div className="Home-component">
      <SideMenu />

      <Extra />
      <Outlet />
    </div>
  );
};

export default Home;
