import React from "react";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

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
        {post.media_links && (
          <img className="post-photo" src={post.media_links} alt="post media" />
        )}
      </div>
      <div className="post-footer">
        <div className="reactions">
          <div className="likes">
            <AiOutlineLike className="like-icon" />
            <p className="likes">{post.like_count}</p>
          </div>
          <div className="comments">
            <FaRegComment className="comment-icon" />
            <p className="comments">{post.comment_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
