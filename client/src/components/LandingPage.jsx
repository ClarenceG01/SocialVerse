import React from "react";
import logo from "../images/logo.png";
import "../App.css";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="main-container">
      <div className="left-container">
        <div className="content">
          <img className="logo" src={logo} alt="" />
          <h4 className="title">SocialVerse</h4>
        </div>
      </div>
      <div className="right-container">
        <p>
          Welcome to Socialverse, <br />
          <p className="subtitle">
            the ultimate social media platform designed to connect, inspire, and
            empower individuals from around the world.
          </p>
        </p>
        <NavLink to="/signup" className="join-link">
          <p>Join SocialVerse</p>
        </NavLink>
      </div>
    </div>
  );
};

export default LandingPage;
