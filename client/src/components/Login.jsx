import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  // usestate
  const [credential, setCredential] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // function to handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const user_data = {
        email: credential,
        username: credential,
        password: Password,
      };
      const response = await axios.post(
        "http://localhost:5000/login",
        user_data,
        { withCredentials: true }
      );
      console.log(`response`, response);
      // console.log(`user_data`, user_data);
      // console.log(response);
      if (response.data.message === "Login successful") {
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else if (error.response.status === 404) {
        toast.error("User not found");
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <h3>LOG IN TO SOCIALVERSE</h3>
          <img className="login-logo" src={logo} alt="" />
        </div>
        <div className="input-container">
          <label>Username or Email</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-button">
          <button>Login</button>
        </div>
        <div className="login-link">
          <p>
            Don't have an account? <NavLink to="/">Sign Up</NavLink>
          </p>
        </div>
        {isLoading && <i className="fa-light fa-spinner fa-spin"></i>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
