import React from "react";
import { Routes, Route } from "react-router-dom";
import SideMenu from "./SideMenu";
import Feed from "./Feed";
import Extra from "./Extra";
import Logout from "./Logout";
import Userprofile from "./Userprofile";

const Home = () => {
  return (
    <div className="Home-component">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userprofile" element={<Userprofile />} />
      </Routes>

      <Extra />
    </div>
  );
};

export default Home;
