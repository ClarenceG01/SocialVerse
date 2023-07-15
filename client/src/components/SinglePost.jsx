import React from "react";
import { Avatar } from "@material-ui/core";

const SinglePost = ({ post }) => {
  console.log(post);
  return (
    <div className="post-container">
      <div className="post-header">
        <Avatar
          className="avatar"
          src={post.profile_picture}
          alt="profile picture"
        />
        <div className="user-details">
          <p className="fullname">{post.full_name}</p>
          <p className="username">@{post.username}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{post.post_text}</p>
        <img className="post-photo" src={post.media_links} alt="post media" />
      </div>
    </div>
  );
};

export default SinglePost;
