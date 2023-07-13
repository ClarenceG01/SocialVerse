import React, { useState } from "react";
import "../App.css";
import { Avatar } from "@material-ui/core";
import logo from "../images/logo.png";
import axios from "axios";

function CreatePost() {
  const [Post, setPost] = useState("");
  const [Media, setMedia] = useState("");

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
        setMedia(data.secure_url);
      });
  };
  const sendPost = async (e) => {
    try {
      e.preventDefault();
      setPost("");
      setMedia("");
      const post_inputs = {
        post_text: Post,
        link1: Media,
      };
      const response = await axios.post(
        "http://localhost:5050/createpost",
        post_inputs,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="createpost-component">
      <Avatar src={logo} />
      <form className="createpost-form" onSubmit={sendPost}>
        <div className=".createpost-inputbox">
          <textarea
            className="createpost-textarea"
            cols="33"
            onChange={(e) => setPost(e.target.value)}
            value={Post}
            required
          />
          <input
            className="tweetBox__imageInput"
            placeholder="Attach an image"
            type="file"
            accept="image/png, image/jpeg,image/jpg,image/gif,video/mp4,video/x-m4v,video/*"
            onChange={(e) => uploadImage(e.target.files)}
          />
        </div>
        <button type="submit" className="createpost-btn">
          POST
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
