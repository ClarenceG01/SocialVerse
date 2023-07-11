import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const user = location.state.user;
  console.log(user);
  return (
    <div className="profile-page">
      <form className="profile-form">
        <div className="add-username">
          <label>
            Add Username
            <input type="text" required />
          </label>
        </div>
        <div className="add-bio">
          <label>
            Add Bio
            <textarea id="bio" name="bio" rows="5" cols="33" />
          </label>
        </div>
        <div className="add-profile-pic"></div>
      </form>
    </div>
  );
};

export default Profile;
