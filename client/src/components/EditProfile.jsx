import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import Extra from "./Extra";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [Fullname, setFullname] = useState("");
  const [Bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const goBack = () => {
    window.history.back();
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5050/followcount", {
        withCredentials: true,
      });
      const user = response.data.results[0];
      console.log(user);
      setFullname(user.full_name);
      setBio(user.bio);
      setProfilePicture(user.profile_picture);
      console.log(
        `set to logged in user: ${Fullname} ${Bio} ${profilePicture}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  const uploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "hod8t2ky");
    fetch("https://api.cloudinary.com/v1_1/dyc8yplly/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setProfilePicture(data.secure_url);
      });
    const values = [...formData.entries()];
    console.log(`values`, values);
    return profilePicture;
  };

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleProfilePictureChange = (e) => {
    uploadImage(e.target.files);
  };
  console.log(Fullname, Bio, profilePicture);
  const input_data = {
    fullname: Fullname,
    bio: Bio,
    profile_pic: profilePicture,
  };
  console.log(input_data);
  const handleSubmit = async (event) => {
    console.log(Fullname, Bio, profilePicture);
    event.preventDefault();
    console.log("submit" + Bio);
    try {
      console.log(`Before sending:` + input_data.profile_pic);
      const response = await axios.post(
        "http://localhost:5050/updateprofile",
        input_data,
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Profile Updated") {
        toast.success("Profile Updated");
        // take time before navigation
        setTimeout(() => {
          navigate("/home/userprofile");
        }, 3500);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="EditProfile-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your fullname"
            value={Fullname}
            onChange={handleFullnameChange}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Enter your bio"
            value={Bio}
            onChange={handleBioChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
