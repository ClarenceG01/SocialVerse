import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  //   console.log(user);
  //   usestates to handle user input
  const [Password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [Username, setUsername] = useState("");
  const [Bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "hod8t2ky");
    fetch("https://api.cloudinary.com/v1_1/dyc8yplly/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileImage(data.secure_url);
      });
  };
  const registration_data = {
    ...user,
    username: Username,
    password: Password,
    bio: Bio,
    profile_picture: ProfileImage,
  };
  console.log(registration_data);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (Password !== Confirmpassword) {
        toast.error("Passwords do not match");
      } else {
        const response = await axios.post(
          "http://localhost:5000/register",
          registration_data
        );
        console.log(response.data);
        if (typeof response.data == "string") {
          if (response.data.includes("username")) {
            toast.error("Username must be 5-20 characters long");
            console.log(true);
          } else if (response.data.includes("password")) {
            toast.error(
              "Password must include capital letter, small letter, number and special character"
            );
          }
        } else {
          if (response.data?.message.includes("User created successfully")) {
            toast.success("Registration successfull");
            setTimeout(() => {
              navigate("/land/login");
            }, 5000);
          } else if (
            response.data?.originalError.info.message.includes(
              "Email already used"
            )
          ) {
            toast.error("Email already registered");
          } else if (
            response.data.originalError.info.message.includes("Violation")
          ) {
            toast.error("Username already in use, please choose another");
          }
        }
      }
      //   console.log(`Validation: ${validation}`);
      //   //   handle validation with toast
      //   if (typeof validation === "string") {
      //     if (validation.includes("username")) {
      //       toast.error("Username must be 5-20 characters long");
      //       console.log(true);
      //     } else if (validation.includes("password")) {
      //       toast.error(
      //         "Password must include capital letter, small letter, number and special character"
      //       );
      //     } else {
      //       console.log(false);
      //     }
      //   }
      //   else {
      //     const message = validation;
      //     if (message.includes("email")) {
      //       toast.error("Email already registered");
      //     } else if (message.includes("Violation of UNIQUE KEY constraint")) {
      //       toast.error("Username already in use, please choose another");
      //     }
      //   }
      //   navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="profile-page">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>
          Add Username
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
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
            placeholder="Enter Password"
          />
        </label>

        <label className="password-input">
          Confirm Password
          <input
            type="password"
            value={Confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        </label>
        <label>
          Add Bio
          <textarea
            id="bio"
            name="bio"
            rows="5"
            cols="33"
            value={Bio}
            placeholder="Enter Bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <input
          type="file"
          id="myFile"
          name="filename"
          accept="image/png, image/jpeg,image/jpg"
          onChange={(e) => uploadImage(e.target.files)}
          hidden
        />
        <label htmlFor="myFile">
          Upload Profile Picture
          <AddPhotoAlternateOutlinedIcon
            sx={{ color: "rgb(25,118,210)" }}
            className="upload-icon"
          />
        </label>
        <div className="profile-button">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
        {isLoading && <i className="fa-light fa-spinner fa-spin"></i>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
