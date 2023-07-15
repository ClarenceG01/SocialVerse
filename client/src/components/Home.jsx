import React from "react";
import SideMenu from "./SideMenu";
import Feed from "./Feed";
import Extra from "./Extra";

const Home = () => {
  return (
    <div className="Home-component">
      <SideMenu />
      <Feed />
      <Extra />
    </div>
  );
};

export default Home;
