import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";
import Extra from "./Extra";

const Home = (props) => {
  console.log(props.theme);
  return (
    <div className="Home-component">
      <SideMenu />
      <Outlet />
      <Extra />
    </div>
  );
};

export default Home;
