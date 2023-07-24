import React, { useState } from "react";
import logo from "../images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  // navigate
  const navigate = useNavigate();
  // states to handle user input
  const [Fullname, setFullname] = useState();
  const [Email, setEmail] = useState();
  // function to handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      full_name: Fullname,
      email: Email,
    };
    navigate("/profile", { state: { user } });
  };
  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
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
        </div>
        <div className="button-link">
          <button type="submit">Create Account</button>
        </div>
        <div className="signup-link">
          <p>
            Already have an account? <NavLink to="/land/login">Log In</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
