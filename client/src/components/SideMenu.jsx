import React, { useState } from "react";
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { ImHome3 } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const logoClick = () => {
    if (location.pathname === "/home") {
      window.location.reload();
    } else {
      navigate("/home");
    }
  };
  const backToTop = () => {
    navigate("/home");
    window.scrollTo(0, 0);
  };
  const isActiveLink = (path) => {
    return location.pathname === path;
  };
  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className={`Sidemenu-component ${theme}`}>
      <div className="sv-logo" onClick={logoClick}>
        <img src={logo} alt="logo" />
      </div>
      <div className={`link-box ${isActiveLink("/home") ? "active" : ""}`}>
        <NavLink to="/home">
          <ImHome3 className="icon" />
          <span className="navlink-word">Home</span>
        </NavLink>
      </div>
      <div
        className={`link-box ${
          isActiveLink("/home/userprofile") ? "active" : ""
        }`}
      >
        <NavLink to="/home/userprofile">
          <CgProfile className="icon" />
          <span className="navlink-word">Profile</span>
        </NavLink>
      </div>
      <div
        id="search"
        className={`link-box ${
          isActiveLink("/home/notifications") ? "active" : ""
        }`}
      >
        <NavLink to="/home/search">
          <IoSearch className="icon" />
          <span className="navlink-word">Search</span>
        </NavLink>
      </div>
      <div
        className={`link-box ${
          isActiveLink("/home/notifications") ? "active" : ""
        }`}
      >
        <NavLink to="/home/notifications">
          <MdOutlineNotificationsNone className="icon" />
          <span className="navlink-word">Notifications</span>
        </NavLink>
      </div>
      <div
        className={`link-box ${isActiveLink("/home/settings") ? "active" : ""}`}
      >
        <NavLink to="/home/settings">
          <IoMdSettings className="icon" />
          <span className="navlink-word">Settings</span>
        </NavLink>
      </div>
      <div
        className={`link-box ${isActiveLink("/home/logout") ? "active" : ""}`}
      >
        <NavLink to="/home/logout">
          <LuLogOut className="icon" />
          <span className="navlink-word">Logout</span>
        </NavLink>
      </div>
      <div className={`link-box ${isActiveLink("/home/") ? "active" : ""}`}>
        <NavLink to="/home/">
          <AiFillPlusCircle
            className="icon"
            id="add-icon"
            onClick={backToTop}
          />
          <span className="navlink-word">Create Post</span>
        </NavLink>
      </div>
      <div className="theme-toggle">
        <button onClick={handleThemeToggle}>
          Toggle Theme ({theme === "light" ? "Dark" : "Light"})
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
