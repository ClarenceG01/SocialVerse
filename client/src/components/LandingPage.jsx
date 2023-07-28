import React from "react";
import logo from "../images/logo.png";
import "../App.css";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  const goBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="LandingPage-component">
      <div className="main-container">
        <div className="left-container">
          <div className="content">
            <img className="logo" src={logo} alt="" />
            <h4 className="app-name">SocialVerse</h4>
          </div>
          <div className="title">
            <h2>Welcome to Socialverse</h2>
            <p className="subtitle">
              The ultimate social media platform designed to connect, inspire,
              and empower individuals from around the world.
            </p>
            <div className="join-socialverse" onClick={goBottom}>
              Join SocialVerse
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default LandingPage;
