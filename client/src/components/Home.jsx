import React from "react";
import { Routes, Route } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/postcomments" element={<PostComments />} />
        <Route path="/followers" element={<Followers />} />
        <Route path="/following" element={<Following />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>

      <Extra />
    </div>
  );
};

export default Home;
