import React from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { ImHome3 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoClick = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };
  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="Sidemenu-component">
      <div className="sv-logo" onClick={logoClick}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`link-box ${isActiveLink("/home") ? "active" : ""}`}>
        <ImHome3 className="icon" />
        <NavLink to="/home">Home</NavLink>
      </div>
      <div
        className={`link-box ${
          isActiveLink("/home/userprofile") ? "active" : ""
        }`}
      >
        <CgProfile className="icon" />
        <NavLink to="/home/userprofile">Profile</NavLink>
      </div>
      <div
        className={`link-box ${isActiveLink("/home/logout") ? "active" : ""}`}
      >
        <LuLogOut className="icon" />
        <NavLink to="/home/logout">Logout</NavLink>
      </div>
      <div
        className={`link-box ${
          isActiveLink("/home/notifications") ? "active" : ""
        }`}
      >
        <MdOutlineNotificationsNone className="icon" />
        <NavLink to="/home/notifications">Notification</NavLink>
      </div>
    </div>
  );
};

export default SideMenu;
