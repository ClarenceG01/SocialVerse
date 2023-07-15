import React from "react";
import logo from "../images/logo.png";
import "../App.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="LandingPage-component">
      <div className="main-container">
        <div className="left-container">
          <div className="content">
            <img className="logo" src={logo} alt="" />
            <h4 className="title">SocialVerse</h4>
          </div>
        </div>
        <div className="right-container">
          <img src={logo} className="rightside-logo" />

          <h2>Welcome to Socialverse</h2>
          <p className="subtitle">
            The ultimate social media platform designed
            <br /> to connect, inspire, and empower individuals from around the
            world.
          </p>
          <NavLink to="/signup" className="join-link">
            <p>Join SocialVerse</p>
          </NavLink>
        </div>
      </div>
      <div className="footer">
        <p>© 2021 SocialVerse</p>
      </div>
    </div>
  );
};

export default LandingPage;
