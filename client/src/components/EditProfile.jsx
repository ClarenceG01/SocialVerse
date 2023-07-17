import React, { useState } from "react";
import SideMenu from "./SideMenu";
import Extra from "./Extra";

const EditProfile = () => {
  const [Fullname, setFullname] = useState("");
  const [Bio, setBio] = useState("");
  const [ProfilePicture, setProfilePicture] = useState();
  return (
    <div className="Home-component">
      <SideMenu />
      <div className="EditProfile-component">
        <form>
          <div>
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              value={Fullname}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              placeholder="Enter your bio"
              value={Bio}
              // onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              value={ProfilePicture}
              // onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
      <Extra />
    </div>
  );
};

export default EditProfile;
