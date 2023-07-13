import React from "react";
import SideMenu from "./SideMenu";
import Feed from "./Feed";
import Extra from "./Extra";
import Post from "./Post";

const Home = () => {
  return (
    <div className="Home-component">
      <Post />
      <SideMenu />
      <Feed />
      <Extra />
    </div>
  );
};

export default Home;
