import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import axios from "axios";

const SinglePost = ({ post }) => {
  const [Like, setLike] = useState();
  const checkLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/checklike",
        { post_id: post.post_id },
        { withCredentials: true }
      );
      setLike(response.data.response);
      console.log(Like);
    } catch (error) {}
  };
  const handleLike = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/likepost",
        { post_id: post.post_id },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkLike();
  });
  const handleComment = () => {};
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
            {Like === 1 ? (
              <AiOutlineLike
                className="like-icon filled"
                onClick={handleLike}
              />
            ) : (
              <AiOutlineLike className="like-icon" onClick={handleLike} />
            )}
            <p className="likes">{post.like_count}</p>
          </div>
          <div className="comments">
            <FaRegComment className="comment-icon" onClick={handleComment} />
            <p className="comments">{post.comment_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
