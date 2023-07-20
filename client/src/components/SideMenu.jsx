import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { ImHome3 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";

const SideMenu = () => {
  const location = useLocation();

  return (
    <div className="Sidemenu-component">
      <div className="sv-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="link-box">
        <ImHome3 className="icon" />
        <NavLink to="/home">Home</NavLink>
      </div>
      <div className="link-box">
        <CgProfile className="icon" />
        <NavLink to="/home/userprofile">Profile</NavLink>
      </div>
      <div className="link-box">
        <LuLogOut className="icon" />
        <NavLink to="/home/logout">Logout</NavLink>
      </div>
      <div className="link-box">
        <MdOutlineNotificationsNone className="icon" />
        <NavLink to="/home/notifications">Notification</NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
