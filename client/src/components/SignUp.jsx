import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  // navigate
  const navigate = useNavigate();
  // states to handle user input
  const [Fullname, setFullname] = useState();
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  // function to handle submit
  const handleSubmit = (e) => {
    // e.preventDefault();
    if (Password !== Confirmpassword) {
      toast.error("Passwords do not match");
    } else {
      const user = {
        fullname: Fullname,
        email: Email,
        password: Password,
      };
      console.log(user);
      navigate("/profile", { state: { user } });
    }
  };
  return (
    <div className="signup-page">
      <ToastContainer />
      <form className="signup-form">
        <div className="logo-container">
          <h3>JOIN SOCIALVERSE</h3>
          <img className="signup-logo" src={logo} alt="" />
        </div>
        <div className="input-container">
          <label>
            Full Name
            <input
              type="text"
              value={Fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="password-input">
            Password
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <AiFillEyeInvisible className="eye-icon" />
          </label>

          <label className="password-input">
            Confirm Password
            <input
              type="password"
              value={Confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <AiFillEyeInvisible className="eye-icon" />
          </label>
        </div>
        <div className="button-link">
          <button onClick={handleSubmit}>Create Account</button>
        </div>
        <div className="signup-link">
          <p>
            Already have an account? <NavLink to="/login">Log In</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
