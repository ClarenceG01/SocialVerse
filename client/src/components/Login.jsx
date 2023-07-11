import React from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <form className="login-form">
        <div className="logo-container">
          <h3>LOG IN TO SOCIALVERSE</h3>
          <img className="login-logo" src={logo} alt="" />
        </div>
        <div className="input-container">
          <label>
            Username or Email
            <input type="text" required />
          </label>

          <label>
            Password
            <input type="password" required />
          </label>
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
        <div className="login-link">
          <p>
            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
